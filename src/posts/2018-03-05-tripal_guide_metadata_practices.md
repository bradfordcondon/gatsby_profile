---
layout: post
title: "Tripal best practices"
excerpt_separator: <!--more-->
date: 2018-03-05
tags: 
 - drupal
 - tripal
 - databases
---

Welcome to Tripal Country!

![Tripal Logo](/assets/img/TripalLogo_dark.png)

Today I'm sharing my suggestions on how to set up your module.

<!--more-->


# For your database

### Organizational Groups

* Add your site to Tripal.info
* Add your site to the [FAIRsharing Tripal](https://fairsharing.org/collection/Tripal) collection.


# For your Tripal Modules

If you create custom Tripal Modules, here are some best practices and suggestions.

### Add your module to Tripal.info


### Host your code on GitHub

We recommend making your code open source and hosting it on GitHub.  It's free, it let's people easily find, use, and contribute to your source code.


#### Associate the GitHub repository with Tripal

Once your module is on GitHub, consider [**joining the Tripal organization**](https://github.com/tripal/).  Your lab group can exist as a team and maintain control over your code, but your projects will be listed in the main Tripal group.

If you'd rather not, you can still tag your project as *Tripal* by clicking on the *Manage Topics* Link at the top of your repository. 

### DOI

When your module is release ready, why not create a Digital Object Identifier (DOI) for it with [Zenodo](https://zenodo.org/)?  It's free!  Sync your github account and create a *new* release (Zenodo won't find old releases).  You can then display your DOI badge on your module's page.

Additionally, there is a [Tripal Community group](https://zenodo.org/communities/tripal/) on Zenodo.  You can edit your record to associate your DOI with the Tripal community. 


### Testing and Continuous Integration

A [Tripal Test module](https://github.com/statonlab/TripalTestSuite) is coming soon, which will automatically set up a PHPUnit and Travis testing environment for you.

* Test with PHP Unit.
* Set up Travis continuous integration.


### Documentation

Every repository can include a README file that will be displayed on the repository page.  A README file should at a minimum include:

* An overview of the module
* Instructions on how to install & use the module


Consider documenting your Code itself.  Tripal documents in the [Doxygen style](http://www.stack.nl/~dimitri/doxygen/) which allows documentation webpages to be automatically generated.  Even if you don't build HTML documentation, the in-line code documentation will be very helpful to contributors.  


### Coding Standards

Drupal has [defined coding standards](https://www.drupal.org/docs/develop/standards/coding-standards) that Tripal modules should meet. 
