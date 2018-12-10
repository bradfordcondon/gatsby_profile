---
layout: post
title: "PHPstorm and Drupal styling"
excerpt_separator: <!--more-->
date: 2018-09-24
tags:
 - drupal
 - tripal
 - documentation
 - phpstorm
---

# Introduction

Every programming language and subcommunity has rules regarding [code styling](https://en.wikipedia.org/wiki/Programming_style). Drupal [provides a set of style standards](https://www.drupal.org/docs/develop/standards), but how do you know that your code is meeting them?  If a collaborator contributes to your project, how do you know that they followed the guidelines?


This miniature guide will walk us through installing a Drupal style sniffer, automatic beautifier, and a continuous integration check for our code styling.  The guide is specific for PHPStorm.

### Adding the code sniffer

The official [Drupal Code Sniffer guide](https://www.drupal.org/node/1419988) should be sufficient for adding and configuring the code sniffer via composer.  This guide will walk you through

* installing Composer
* installing the PHP Code Sniffer (PHPCS)
* installing the coder module
* registering the Drupal code standard with PHPCS
* Adding the Drupal standard to PhpStorm.


### Adding the code formatter

Unfortunately, the sniffer won't automatically fix the styling for you, it will only alert you to the problem.  To automate fixing simple code "smells", we can configure PHPCBF (PHP code beautifier) to run as an external tool in PHPStorm.

I [followed this guide by @hamrant](https://hamrant.com/post/code-beautifier-and-fixer) to add the tool.

for the program path, use the output of `which phpcbf`.

Argument would be set to: `--standard=Drupal $fileDir$/$FileName$`
working directory: `$ProjectFileDir$`


![phpcbf script configuration](/assets/img/phpcbf_script_config.png)

(Note:  If you get a weird error about your working directory, double check your working directory argument!  I had whitespace in mine).

Once the tool is configured, you can map it to a shortcut to make it easier to use.  I mapped my tool to run on apple -alt - ; , which is right next to my general beautifier (apple - alt - l).

### setting up CI

Finally we want a continuous integration check so that when PRs are made, it runs the code sniffer and gives us feedback on style. I used Code Climate because its free for open source projects, but any service that lets you specify what files to check and what standards to use will work.  https://docs.codeclimate.com/docs/configuring-your-analysis

The configuration file to ensure that our Drupal codes are read against Drupal standards is simple: place this `.code_coverage.yml` file in your project root.

```yaml
version: "2"
plugins:
  phpcodesniffer:
    enabled: true
    config:
      file_extensions: "php,inc,module"
      standard: "Drupal"

```
