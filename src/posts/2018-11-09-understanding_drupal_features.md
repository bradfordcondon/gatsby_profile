---
layout: post
title: "Understanding Drupal Features"
excerpt_separator:
date: 2018-11-09
tags:
 - drupal
 - tripal
---


Note that I'm going to talk about features a lot in this post.  In the context of the Feature module, features are exported configurations within your site.  It's important that we don't confuse this with Chado features, which are genes, mRNAs, polypeptides, etc.


[Features module guide](https://www.drupal.org/docs/7/modules/features)

It appears that some of the allure of Features is diminished in Drupal 8. Drupal 8 offers a configuration management system that focuses on the use case of going from a staging site to a production site.  Still, Features is more concerned with sharing configurations among multiple sites, so it will remain relevant for Drupal 8.


## A simple use case

Consider a case where we have a development site where we configure a bundle (let's say the vanilla Analysis bundle) to have a custom set of Tripal Panes, with fields carefully reorganized into the panes.  In particular, we attach a Drupal File field to it, so we can host FASTA files easily.

Once we've configured the field settings, how do we get them to the live site?  One option is to open our field configuration admin UI on both sites, and copy the details one at a time.  This method is [time consuming and error prone]( https://www.drupal.org/docs/7/modules/features/features-moving-site-configuration-to-code), although it is relatively safe: we arent liable to accidentally break our database this way.

Is there a better way?  By exporting the field configuration as a feature!


(note: drupal 8 has a feature designed ot handle development deployment!  But features remains relevant for sharing field configurations across sites).

## Mapping bundle IDs

The main hurdle to overcome when mapping features is converting the field machine names across site.  This is because each field instance is specific to the bundle it's attached to, and bundle machine-names are from the bundle ID.  We can't assume bundle IDs are consistent across sites!

So what do we do?  Interestingly, roles have a similar problem, and a [guide is available](https://www.drupal.org/docs/7/modules/features/exportables-and-user-role-ids-in-features) for dealing with them.


The general strategy is:


* remove the exported id value from the `features.inc` file,
* use hook alter to fetch the ID on the target deployment setup

In our example, we want to export an image field attached to the vanilla Analysis bundle, so, we can use the ontology term associated to lookup the bundle and fetch the ID.


## Version control

Because features get exported as their own module, this means you can treat them as such.  You can initialize a git repo, store them on GitHub, make discrete versions, and in general benefit from version control for something which otherwise would only be done via the UI.
