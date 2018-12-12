---
layout: post
title: "Code Coverage Reporting with Code Climate"
excerpt_separator: <!--more-->
date: 2018-12-10
tags:
 - drupal
 - tripal
 - documentation
---

This miniature guide will walk us through adding Code Climate coverage reports.  I assume you are using the Tripal Test Suite helper to set up your Travis CI.

The basic steps we will take:

* Enable Code Climate
* Generate coverage reports with Travis
* Configure Code Climate to receive reports


>![File by file coverage](/img/file_by_file_code_coverage.png)
>Code coverage is a very rough metric of which files are well-tested.

### Enable Code Climate

I use [Code Climate](https://codeclimate.com/) because its free for open source and it works with GitHub.  Feel free to use any platform you'd like.  Heres what we get with Code Climate:

* GitHub pull request checks reporting changes in code coverage
* File-by-file % test coverage
* Reports on test coverage over time
* Automated in-line suggestions on pull requests
* Code Sniffer integration ([see the guide I wrote on adding Drupal standard sniffing integration](/2018-12-10-drupal_sniffing/))

Once you've registered for [Code Climate](https://codeclimate.com),visit [your dashboard](https://codeclimate.com/oss/dashboard) and click the "add a new repo" button.

Once your repo is integrated, head to **Repo Settings** and click on **Test coverage**.  Here you'll find your TEST REPORTER ID which needs to be associated with the `CC_TEST_REPORTER_ID` environmental variable in your Travis environment.


### Generate Code Coverage Reports in Travis

PHPUnit actually handles the code coverage report- if you want, you can run `./vendor/bin/phpunit --coverage-clover ./clover.xml` to create a [clover formatted report](https://www.atlassian.com/software/clover), or, `phpunit  --coverage-html build/coverage-report` to build an html-formatted coverage report you can read!

Prior to generating the report, we need to tell PHPUnit which files should be included in the report.  Adding the below `filter` tags to your `phpunit.xml` config file will tell PHPunit to report on all `.inc` and `.php` files in your `/includes` directory.

```xml
<phpunit>
  <testsuites>
    ...
  </testsuites>
<filter>
   <whitelist addUncoveredFilesFromWhitelist="true">
     <directory suffix=".inc">./includes</directory>
     <directory suffix=".php">./includes</directory>
   </whitelist>
 </filter>
</phpunit>
```

Note that the coverage report will only run when we add a `--coverage` flag: this intentional, to keep the unit tests we run on our development environment fest.

Our `.travis.yml` file therefore needs to be updated (ill provide a complete example `.travis.yml` file at the end of this guide):

```yaml

- docker exec -it tripal bash -c "cd /modules/tripal_eutils && composer install && DRUPAL_ROOT=/var/www/html IS_TRAVIS=TRUE ./vendor/bin/phpunit --coverage-clover ./clover.xml"

```
 Please read the [PHPUnit documentation for more details](https://phpunit.readthedocs.io/en/7.4/code-coverage-analysis.html).


#### Adding Xdebug

Before we can generate the report in Travis, we need the Xdebug library installed.  The below line will install the xdebug library in our `tripal` container.

```yaml
- docker exec -it tripal yum install -y php-pecl-xdebug.x86_64
```
### Send Reports to Code Climate

If we push our code to Travis, test should run with no problem, and the `clover.xml` report should be generated.  Its no good to us sitting there, though: next we need to send it to Code Climate.  Code Climate has [extensive documentation](https://docs.codeclimate.com/docs/configuring-test-coverage), but I'll provide specific instructions for Tripal Test Suite users.

#### Add the reporter_id

When we set up Code Climate, we found our `CC_TEST_REPORTER_ID`.  Add it to the `env` section of your `.travis.yml`


#### Run `test-reporter` before and after script
In the `before_script` seciton, we download the `cc-test-report` application and run the `before-build` program (I include teh `debug` flag which can be handy when setting up).

I also map the Travis specific environmental git variables into generic ones that Code Climate expects.

```yaml
- curl -L https://codeclimate.com/downloads/test-reporter/test-reporter-latest-linux-amd64 > ./cc-test-reporter
- chmod +x ./cc-test-reporter
- ./cc-test-reporter before-build --debug
- GIT_BRANCH=$TRAVIS_PULL_REQUEST_BRANCH
- GIT_COMMIT_SHA=$TRAVIS_PULL_REQUEST_SHA
```

#### After Script

Finally we need to do the after script processing.  This means calling  `./cc-test-reporter after-build` and providing the `clover.xml` report.  We additionally specify the `-p` parameter for the root path in the docker container where the tests/analysis took place (which is different from the Travis root).


```yaml
after_script:
  - ./cc-test-reporter after-build clover.xml --debug -t clover -p /var/www/html/sites/all/modules/custom/tripal_eutils --exit-code $TRAVIS_TEST_RESULT
  -
```

### All set!

The finished `.travis.yml` file is below.  Your coverage report should now appear in your code climate dashboard!  In addition, pull request checks will take place based on the criteria you set in **Repo Settings** area of Code Climate.

```yaml

language: php

php:
  - 7.1

services:
  - docker

env:
  - DRUPAL_ROOT=/var/www/html IS_TRAVIS=TRUE CC_TEST_REPORTER_ID=d4d6bcc22c56ae459a80bc9428eb44040b2e7225b45c79ac445343a73d582abf

before_script:
  - docker pull statonlab/tripal3
  - curl -L https://codeclimate.com/downloads/test-reporter/test-reporter-latest-linux-amd64 > ./cc-test-reporter
  - chmod +x ./cc-test-reporter
  - ./cc-test-reporter before-build --debug
  - GIT_BRANCH=$TRAVIS_PULL_REQUEST_BRANCH
  - GIT_COMMIT_SHA=$TRAVIS_PULL_REQUEST_SHA

script:
  - docker run -it -d --rm --name tripal -v "$(pwd)":/modules/tripal_eutils statonlab/tripal3
  - sleep 30 # We pause here while postgres and apache boot
  - docker exec -it tripal bash -c "cd /modules/ && git clone https://github.com/statonlab/tripal_manage_analyses.git && drush pm-enable -y tripal_manage_analyses"
  - docker exec -it tripal drush pm-enable -y tripal_eutils
  - docker exec -it tripal yum install -y php-pecl-xdebug.x86_64
  - docker exec -it tripal bash -c "cd /modules/tripal_eutils && composer install && DRUPAL_ROOT=/var/www/html IS_TRAVIS=TRUE ./vendor/bin/phpunit --coverage-clover ./clover.xml"

after_script:
  - ./cc-test-reporter after-build clover.xml --debug -t clover -p /var/www/html/sites/all/modules/custom/tripal_eutils --exit-code $TRAVIS_TEST_RESULT

```
