---
layout: post
title: "Documentation with Read the Docs"
excerpt_separator: <!--more-->
date: 2018-08-26
tags: 
 - drupal
 - tripal
 - documentation
---
This week, we'll be moving the Tripal documentation over to ReadTheDocs.  I've already put the Tripal DevSeed documentation online.

![Tripal Logo](/assets/img/TripalLogo_dark.png)  

This post will talk about the reasons for this decision, and a quick "how to" guide.


<!--more-->


## What is ReadTheDocs?

Documentation is important.  It tells users how to use our product, and developers how to read our code.  In the past, I've written my documentation out in markdown and included it alongside the code.  This approach still makes sense for small projects, and it gets built nicely by GitHub on the repository.

![tripal readme](/assets/img/tripal_github_doc.png)

For larger projects, such as Tripal, the real documentation is hosted on a drupal site at tripal.info.  There is a full content management system for creating new posts, managing privileges, uploading images, linking documents, etc.

[ReadTheDocs](https://readthedocs.org/) uses [Sphinx](http://www.sphinx-doc.org/en/master/) to build a website in a Continuous Integration setup. When new code is pushed to GitHub, the documentation website as defined by sphinx is built, and the "live" documentation website is updated.  

This has several advantages:

* Code changes can include documentation updates **in the same pull request**.
* Changes to the documentation is **subject to review, just like code changes**.
* Documentation changes are under **version control**.

These are all huge points.  It's actually quite hard to remember to update the documentation when its on a separate website.  You also don't have to remember to re-build the website, ReadTheDocs rebuilds it when you push new code and documentation.

## How do I add ReadTheDocs to My Project?

It's very simple: check out the [official guide](https://docs.readthedocs.io/en/latest/getting_started.html).  

The abbreviated version is:

* Set up your ReadeTheDocs account and add your project integration
* Install Sphinx
* Run the quickstart command: `sphinx-quickstart`
* Write your documentation (we're using `RST` format)
* run `make html` in the `docs` folder to build your site for testing purposes
* Push your changes to github


We use `RST` format.  It might seem a little more complicated than markdown (and it is), but its also more powerful, so I feel its worth the work.

Link documents to your `index.rst` and Sphinx will build you a searchable site with nicely formatted navigation.

![devseed read the docs site](/assets/img/devseed_rtd.png)

ReadTheDocs also provides some really awesome **versioning** tools, allowing you to post releases of the documentation so users can go back and find older documentation with almost no effort on your part.


## Tripal Documentation

We currently have ReadTheDocs up for the following projects:

* [Tripal](https://tripal.readthedocs.io/en/latest/)
* [Tripal Test Suite](https://tripaltestsuite.readthedocs.io/en/latest/)
* [Tripal DevSeed](https://tripal-devseed.readthedocs.io/en/latest/)


