---
layout: post
title: "Using Flyway for Chado Schema Management"
date: 2019-01-10
tags:
 - drupal
 - tripal
 - testing
 - chado
---

Changes are coming to Chado!  We're moving to the popular schema management system [Flyway](https://flywaydb.org/getstarted/)!  

I'm providing two guides here: one for running flyway yourself (on your live or development instance), and one describing what the Travis CI setup is doing.


### Developer and Deployment

I strongly recommend reading the [Flyway getting started guide](https://flywaydb.org/getstarted/) to understand the basics of migrations before getting started.

#### Installing and configuring flyway

There are multiple ways to install Flyway: this guide will cover the command line tool, and we'll use the Gradle method for Travis below.

First, follow the (instructions)[https://flywaydb.org/getstarted/firststeps/commandline] for downloading the appropriate command line tool for your system.  We'll also want a local copy of the Chado github repo: run `git clone https://github.com/GMOD/Chado.git` in an appropriate location.

Once the tool is installed, we need a `flyway.conf` file in our home directory which describes our postgresql database and the location of our Chado migrations.

My developer configuration file is below:

```
flyway.url=jdbc:postgresql://localhost:5432/drupal
flyway.user=drupal
flyway.password=secret
flyway.schemas=chado
flyway.locations=filesystem:/Users/bc/general_work/Chado_SQL/chado/migrations
flyway.validateOnMigrate=false
```

The url, user, password, and schema parameters all define our PostgreSQL server.  Note you might have to the url to point to whatever your db name and url is (my db name is Drupal. for example).  The locations parameter points to the `migrations` folder in the Chado repository, so update that path to wherever you cloned the repo.  The `validateOnMigrate` option allows Flyway to run migrations even if previously run migrations aren't present- I wouldn't recommend this option for live sites.  For development sites, I found myself writing multiple pull requests with different migrations: when i switch branches and the previously run migrations go away, it would cause errors without this option.

There are a lot of other options one can configure: [look at the migration documentation online](https://flywaydb.org/documentation/command/migrate).

#### Running flyway migrations

Once flyway is configured, running `flyway info` should tell us we have an empty schema with pending migrations. If we are running this on an [existing](https://flywaydb.org/documentation/existing) Chado schema, we just need to run `flyway baseline` to tell Chado that this is our "starting point".  Then we run `flyway migrate`, and all migrations in the SQL folder will be run in order.

If installing Chado on a new Postgres instance, you'll just want to run the latest SQL script in `chado/schemas/` and set that as baseline.


Below are the results of running flyway info and migrate on a correctly configured site.

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

As new minor and major versions of Chado are released, all existing sites will need to do is `git pull` to update the Chado repository, and run `flyway migrate`.  That's it.

Developers, meanwhile, only need to create a single new migration per issue they fix.  That's it.  No diff files etc needed.

### Travis integration with Flyway

We use [Travis CI](https://travis-ci.org/) to run all migrations on each new pull request.  This ensures that no syntax errors or naming problems are present in newly proposed migrations.  The Travis environment uses Gradle to deal with installing Flyway.

This is the `build.gradle` file included in the repository for Travis purpose.  You could adapt it for your own use instead of using the command line application by updating the URL and schema locations as appropriate.

```
buildscript {
 dependencies {
 classpath 'org.postgresql:postgresql:42.2.5'
 }
}
plugins {
  id "org.flywaydb.flyway" version "5.2.4"
}
task assemble{}

flyway {
  url = "jdbc:postgresql://127.0.0.1:5432/postgres"
  user = 'postgres'
  locations = ['filesystem:chado/migrations/']
}
```

The Travis script itself is quite simple: it just runs `flyway info`, `flyway migrate`, and `flyway info` on the empty Chado 1.3 release.  This will demonstrate what scripts were found, and if any issues arose during migration.
