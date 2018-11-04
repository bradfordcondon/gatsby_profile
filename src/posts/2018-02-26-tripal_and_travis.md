---
layout: post
title: "Tripal Country: Tripal and Travis"
excerpt_separator: <!--more-->
date: 2018-02-26
tags: 
 - drupal
 - tripal
 - chado
 - web-dev
 - bioinformatics
 - databases
 - travis-ci
---

Welcome to Tripal Country!

![Tripal Logo](/assets/img/TripalLogo_dark.png)

This week I'm excited to announce we've set up Travis Continuous Integration with Tripal!  This means every time code is committed, we test three things:

* Upgrade a Tripal 2 site to Tripal 3
* Install Tripal 3 on a clean site
* Run PHPUnit tests

<!--more-->

>![tripal passing!](/assets/img/tripal/tripal_passing.png)
>Is there anything more fulfilling than seeing a *Build:Passing* tag on your repo?


## The General Idea

Even small changes to the code base can have unintended consequences.  Continuous Integration running on a pull request means you know, before you merge the pull request, whether or not the new code will pass all your tests.  

In the case of Tripal, we wanted to clear the way for PHPUnit testing.  Testing is interesting when you work in Drupal 6 and 7: Drupal switched to PHPUnit support in Drupal 8.  Especially as a novice developer, you ask yourself, should I bother learning the old framework (simpletest) when I know that PHPunit is just around the corner?

Turns out with a little bit of work, PHPUnit works just fine with Drupal 7.  This means we can add test coverage to our code and be aware when new changes break old functionality.  Plus, because we build new sites from scratch, we can rest assured that new users trying out Tripal won't be faced with a broken build.


## The Build Script

The full build script (`.travis.yml`) we went with is below.  We're grateful to [Grayson Koonce for the branch vs PR workaround.](https://graysonkoonce.com/getting-the-current-branch-name-during-a-pull-request-in-travis-ci/)





```
language: php

services:
  - docker

sudo: required

before_script:
  - docker pull statonlab/drupal7

script:
  # Set branch name
  - export REPO=$(if [ "$TRAVIS_PULL_REQUEST" == "false" ]; then echo $TRAVIS_REPO_SLUG; else echo $TRAVIS_PULL_REQUEST_SLUG; fi)
  - export BRANCH=$(if [ "$TRAVIS_PULL_REQUEST" == "false" ]; then echo $TRAVIS_BRANCH; else echo $TRAVIS_PULL_REQUEST_BRANCH; fi)
  #  Travis does a shallow clone and we need a full clone to test Tripal v2 to v3 upgrade
  - cd .. && rm -rf tripal && git clone https://github.com/$REPO.git tripal && cd tripal
  - git checkout $BRANCH
  # Test tripal 3 installation
  - docker run -it -d --rm --name tripal3 -v "$(pwd)":/modules/tripal statonlab/drupal7
  - sleep 15
  - docker exec -it tripal3 drush en -y tripal tripal_chado tripal_chado_views tripal_ds tripal_ws
  # Prepare Chado
  - docker exec -it tripal3 drush eval "module_load_include('inc', 'tripal_chado', 'includes/tripal_chado.install'); tripal_chado_load_drush_submit('Install Chado v1.3');"
  - docker exec -it tripal3 drush trp-run-jobs --username=admin
  # Prepare Drupal
  - docker exec -it tripal3 drush eval "module_load_include('inc', 'tripal_chado', 'includes/setup/tripal_chado.setup'); tripal_chado_prepare_drush_submit();"
  - docker exec -it tripal3 drush trp-run-jobs --username=admin
  # Run PHPUnit tests
  - docker exec -it tripal3 bash -c "cd /modules/tripal && composer install && DRUPAL_ROOT=/var/www/html ./vendor/bin/phpunit"
  # Test Tripal v2 to v3 upgrade steps
  - git checkout 7.x-2.x
  - docker run -it -d --rm --name tripal2 -v "$(pwd)":/modules/tripal statonlab/drupal7
  - sleep 15
  - docker exec -it tripal2 drush en -y tripal_core
  - docker exec -it tripal2 drush pm-disable tripal_core -y
  - git checkout $BRANCH
  - docker exec -it tripal2 drush en -y tripal
```