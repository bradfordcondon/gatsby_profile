---
layout: post
title: "Migrating from Chado 1.2 to 1.3"
date: 2019-03-19
tags:
 - tripal
 - chado
 - schema
---

This post is a simple guide for navigating some of the problems one might encounter using the [Tripal](tripal.info) Chado 1.2 to 1.3 migration script.

# executive summary


* preparation of database by dropping views (see shell script below)
  - Create drop script
  - run drop script
* Submit upgrade job at `/admin/tripal/storage/chado/install`
* If size error: resize disk if possible
* If still size error: uncomment transaction in install file

```bash
touch generate_drop_file.sql
# copy the drop script in the "dropping views section" into said file
drush sql-query --file=generate_drop_file.sql --result-file=drop_script.sql
drush sql-query --file=drop_script.sql
drush sql-query "DROP TABLE IF EXISTS chado.all_feature_names CASCADE;"

```

# details


Tripal has a GUI to run the Chado 1.2 to 1.3 migration.  However, it doesn't run smoothly on many sites.  There are three main reasons for this:

* Your site has views Tripal didn't expect
* Your site has some views as tables instead
* The database transaction requires more disk space than your site has free


### dropping views

The first thing to do is create a drop script.  The below SQL will output an SQL script that will drop all the chado and so (sequence ontology) views from your site (something the migration script attempts to do at the start.)


```sql
set search_path=public,so,frange,genetic_code;
select 'drop view "' || viewname || '" cascade;'
from pg_views where schemaname = 'so';

select 'drop view "' || viewname || '" cascade;'
from pg_views where schemaname = 'chado';
```

We can use drush to generate the drop query like so: `drush sql-query  --file generate_drop_file.sql result-file drop_script.sql` where `generate_drop_file` is our input drop script above.


Once you've generated the drop script, you should run it.  All together it will look like this:

```bash

drush sql-query --file=generate_drop_file.sql --result-file=drop_script.sql
drush sql-query --file=drop_script.sql

```

## dropping tables that SHOULD be views

Oddly enough the `chado.all_feature_names` table is SUPPOSED to be a view according to the Chado documentation.  We therefore need to drop it, otherwise the script will complain when it tries to drop the view!

```SQL
set search_path=chado;
 DROP TABLE IF EXISTS all_feature_names CASCADE;
```

## Disabling the transaction

You are now ready to try running the migration!  It's located at`/admin/tripal/storage/chado/install`.  You should see 1.2 as the currently installed version- select "upgrade existing Chado v1.2 to v1.3 (no data is lost)".  You will see lots of warnings/notices informing you about what this ugpgrade will.  Notably, you should plan on **redefining any custom materialized views** after running the migration to hold big integers instead of integers.

If you run the migration and get the bellow error, you have run out of space!

```
Disk full: 7 ERROR:  could not extend file "base/40960/269560.3": No space left on deviceHINT:  Check free disk space.:ALTER TABLE feature     ALTER feature_id TYPE  bigint,    ALTER dbxref_id TYPE bigint,    ALTER organism_id TYPE bigint,    ALTER seqlen TYPE bigint,    ALTER type_id TYPE bigint;

```

You have two strategies to overcome this:

1) Increase your disk space
2) Disable the transaction in the code


If 1) doesnt work or isn't possible, just comment out the transaction in the `tripal_chado.install.inc` file (`tripal/tripal_chado/includes/tripal_chado.install.inc`), which is currently on lines 221/244.

Before
```php

$transaction = db_transaction();
try {
  if ($action == 'Install Chado v1.3') {
    tripal_chado_install_chado_1_3();
    chado_query($vsql, [':version' => '1.3']);
  }
  elseif ($action == 'Upgrade Chado v1.2 to v1.3') {
    tripal_chado_upgrade_chado_1_2_to_1_3();
    chado_query($vusql, [':version' => '1.3']);
  }
  elseif ($action == 'Install Chado v1.2') {
    tripal_chado_install_chado_1_2();
    chado_query($vsql, [':version' => '1.2']);
  }
  elseif ($action == 'Upgrade Chado v1.11 to v1.2') {
    tripal_chado_upgrade_chado_1_11_to_1_2();
    chado_query($vsql, [':version' => '1.2']);
  }
  elseif ($action == 'Install Chado v1.11') {
    tripal_chado_install_chado_1_11();
  }
} catch (Exception $e) {
  $transaction->rollback();
  tripal_chado_install_done();
  tripal_report_error('tripal_chado', TRIPAL_ERROR, $e->getMessage(), ['print' => TRUE]);
  return FALSE;
}

```

After

```php

//$transaction = db_transaction();
try {
  if ($action == 'Install Chado v1.3') {
    tripal_chado_install_chado_1_3();
    chado_query($vsql, [':version' => '1.3']);
  }
  elseif ($action == 'Upgrade Chado v1.2 to v1.3') {
    tripal_chado_upgrade_chado_1_2_to_1_3();
    chado_query($vusql, [':version' => '1.3']);
  }
  elseif ($action == 'Install Chado v1.2') {
    tripal_chado_install_chado_1_2();
    chado_query($vsql, [':version' => '1.2']);
  }
  elseif ($action == 'Upgrade Chado v1.11 to v1.2') {
    tripal_chado_upgrade_chado_1_11_to_1_2();
    chado_query($vsql, [':version' => '1.2']);
  }
  elseif ($action == 'Install Chado v1.11') {
    tripal_chado_install_chado_1_11();
  }
} catch (Exception $e) {
//  $transaction->rollback();
  tripal_chado_install_done();
  tripal_report_error('tripal_chado', TRIPAL_ERROR, $e->getMessage(), ['print' => TRUE]);
  return FALSE;
}
```
