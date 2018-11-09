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

Once we've configured the field settings, how do we get them to the live site?  One option is to open our field configuration admin UI on both sites, and copy the details one at a time.  This method is [time consuming and error prone](https://www.drupal.org/docs/7/modules/features/features-moving-site-configuration-to-code), although it is relatively safe: we arent liable to accidentally break our database this way.

Is there a better way?  By exporting the field configuration as a feature!

(note: drupal 8 has a feature designed ot handle development deployment!  But features remains relevant for sharing field configurations across sites).

## Mapping bundle IDs

The main hurdle to overcome when mapping features is converting the field machine names across site.  This is because each field instance is specific to the bundle it's attached to, and bundle machine-names are from the bundle ID.  We can't assume bundle IDs are consistent across sites!

So what do we do?  Interestingly, roles have a similar problem, and a [guide is available](https://www.drupal.org/docs/7/modules/features/exportables-and-user-role-ids-in-features) for dealing with them.

The general strategy is:

-   remove the exported id value from the `features.inc` file,
-   use hook alter to fetch the ID on the target deployment setup

In our example, we want to export an image field attached to the vanilla Analysis bundle, so, we can use the ontology term associated to lookup the bundle and fetch the ID.

## Version control

Because features get exported as their own module, this means you can treat them as such.  You can initialize a git repo, store them on GitHub, make discrete versions, and in general benefit from version control for something which otherwise would only be done via the UI.

## How many Features?

The features documentation links to a [great article about how to manage multiple features](http://kerasai.com/blog/2014/04/08/organizing-features-configuration-managment).  The suggestion that each bundle be its own feature is particularly helpful for Tripal, since we have so many bundles and its a reasonable, discrete way to manage and deploy configuration.  This means that mRNA and gene should be separate feature modules even though they are both `chado.feature` content types.


## Tutorial

### Configuring the bundle fields

Now, let's quickly configure a bundle.  Navigate to the structure of your site and select Analysis (**Admin ->Structure -> Tripal Content -> Analysis -> Manage Fields**).  Scroll to the bottom and add a new field of type File, with a machine name of `field_fasta_file‎`, and click **Save**. We can use the default field settings on the next page, so click **Save**.

We now have to pick a CV term for our field.  Because we are providing a FASTA file field, we can use a term such as [FASTA (SWO:0000142)](https://www.ebi.ac.uk/ols/ontologies/ero/terms?iri=http%3A%2F%2Fwww.ebi.ac.uk%2Fefo%2Fswo%2FSWO_0000142).  Please see the [Tripal vocabulary  guide](https://tripal.readthedocs.io/en/latest/user_guide/content_types/creating_content.html?highlight=term#manually-adding-a-term) for help loading a term.  Once the term is in our DB, we can assign it to this field.

![assign term to field](/img/features_2018-11-09/assign_term.png)

Now lets configure our field display.  Click the **Manage Display Tab** at the top, and create and enable a "Files" Tripal Pane, placing our new field in the Pane.  

![enable display](/img/features_2018-11-09/config_display.png)

You can verify your new field is enabled and working by creating a new Analysis and inspecting the "FASTA file" field.


![confirm field is set up](/img/features_2018-11-09/fasta_field_input.png)

### Exporting the bundle field displays

Once we are happy with our bundle field configuration, we can export the display settings using the Drupal Features module.

First, we enable the Features module using drush: `drush pm-enable features -y`.  This adds a Features area under **Admin -> Structure**.  Navigate there and choose **Create Feature**.

The field information we're looking for is in **Field Bases**, **Field Group**, and **Field Instances**.  We can search for FASTA to find the field base and instance, and "files" (the name of our group) to find the field group.

I've also specified a custom path to keep all my tripal features together under advanced options.

![image](/img/features_2018-11-09/feature_configuration.png)

If we download and unzip our feature module, we can see it includes all the trappings of a Drupal module.

![image](/img/features_2018-11-09/unzipped_dir.png)

As you can see, however, it makes the assumption that `bio_data_2` is the correct bundle to configure fields for.  However, Tripal makes no guarantee of that.  One solution would be to manually relabel bio_data_x to the correct bundle ID.  On a smaller scale, this is a reasonable solution.  If you aren't sure what your bundle ID is, look in the URL when configuring the fields for it:  my constructed URL for example was `admin/structure/bio_data/manage/bio_data_2/fields`.

In our case, the site we want to import to has the same Analysis bundle ID, so no further action is necessary.

### Importing the feature configuration

Go to our target site, all we need to do is download and unpack the tra file we generated and enable the module (assuming the bundle ID issue is addressed).  I downloaded my file to `/var/www/html/sites/all/modules/custom/analysis_configuration.tar`, decompressed it (`tar -xvf analysis_configuration.tar`), and enabled it (`drush pm-enable tripal_configuration`).

The field should now appear when you go to create a new analysis on your target site.  Unfortunately, the field still gets imported **disabled** due to Tripal preference, os we have to go to the display settings on our target site and enable the tripal pane/field.

![field created disabled](/img/features_2018-11-09/created_disabled.png)

Drag the disabled tripal pane/field group out of the disabled area, click save, and re-visit your newly created Analysis.  The files pane and uploaded FASTA file will now appear.
![final](/img/features_2018-11-09/final_field.png)