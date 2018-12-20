---
layout: post
title: "Flyway"
excerpt_separator: <!--more-->
date: 2018-12-18
tags:
 - drupal
 - tripal
 - testing
---

At our home directory, create a file named flyway.conf


```
flyway.url=jdbc:postgresql://localhost:5432/drupal
flyway.user=drupal
flyway.password=secret
flyway.schemas=chado
```

There are a lot of options one can configure.
See a full example configuration file: https://flywaydb.org/documentation/commandline/migrate#sample-configuration



```

flyway info
Flyway Community Edition 5.2.4 by Boxfuse
Database: jdbc:postgresql://localhost:5432/drupal (PostgreSQL 10.5)
Schema version: << Empty Schema >>

+----------+---------+-------------+------+--------------+-------+
| Category | Version | Description | Type | Installed On | State |
+----------+---------+-------------+------+--------------+-------+
| No migrations found                                            |
+----------+---------+-------------+------+--------------+-------+

```

So what would chado do?

https://flywaydb.org/documentation/existing

First it would use the current release as the baseline.
This owuld be `V1__Base_version.sql` or perhaps `V1.4__Base_version`.


```
flyway.locations=filesystem:/Users/bc/tripal/sites/all/modules/custom/tripal_eutils/db/migrations

```
After adding the locations parameter to our config file, pointing to our migrations directory, we can proceed:


```
flyway info
Flyway Community Edition 5.2.4 by Boxfuse
Database: jdbc:postgresql://localhost:5432/drupal (PostgreSQL 10.5)
Schema version: 1

+-----------+---------+-----------------------+----------+---------------------+----------+
| Category  | Version | Description           | Type     | Installed On        | State    |
+-----------+---------+-----------------------+----------+---------------------+----------+
|           | 1       | << Flyway Baseline >> | BASELINE | 2018-12-20 14:31:32 | Baseline |
| Versioned | 1.1     | try1                  | SQL      |                     | Pending  |
+-----------+---------+-----------------------+----------+---------------------+----------+

________________________________________________________________________________
| bc:~/tripal/sites/all/modules/custom/tripal_eutils/db/migrations (new_chado_tables)$
| => flyway migrate
Flyway Community Edition 5.2.4 by Boxfuse
Database: jdbc:postgresql://localhost:5432/drupal (PostgreSQL 10.5)
Successfully validated 2 migrations (execution time 00:00.596s)
Current version of schema "public": 1
Migrating schema "public" to version 1.1 - try1
Successfully applied 1 migration to schema "public" (execution time 00:00.013s)
________________________________________________________________________________
| bc:~/tripal/sites/all/modules/custom/tripal_eutils/db/migrations (new_chado_tables)$
| => flyway info
Flyway Community Edition 5.2.4 by Boxfuse
Database: jdbc:postgresql://localhost:5432/drupal (PostgreSQL 10.5)
Schema version: 1.1

+-----------+---------+-----------------------+----------+---------------------+----------+
| Category  | Version | Description           | Type     | Installed On        | State    |
+-----------+---------+-----------------------+----------+---------------------+----------+
|           | 1       | << Flyway Baseline >> | BASELINE | 2018-12-20 14:31:32 | Baseline |
| Versioned | 1.1     | try1                  | SQL      | 2018-12-20 14:36:57 | Success  |
+-----------+---------+-----------------------+----------+---------------------+----------+

________________________________________________________________________________
```
