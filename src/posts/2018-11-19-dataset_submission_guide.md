---
layout: post
title: "Configuring Analysis for User Submission with Tripal HQ"
excerpt_separator:
date: 2018-11-09
tags:
 - drupal
 - tripal
---


This guide will demonstrate using the [Tripal HeadQuarters (HQ) module](https://github.com/statonlab/tripal_hq).

## The datasets module inspired Tripal HQ

The [Tripal Chado Dataset](https://github.com/NAL-i5K/tripal_chado_datasets) module is a standalone module that allows users to submit Chado analysis record requests to a Tripal site. It provides a submission form, admin interface, and email notifications.

Working to genericize this module for use on other sites, I realized we could leverage Tripal 3 entities to handle the submission form.  Doing so would allow us to support any and all Tripal content, regardless of its configuration.  This would prevent a lot of duplication of effort, as the datasets module manually creates the user submission form and all of its fields.  What if another site wants to require different information for submissions?  They would have to use `hook_form_alter`, but the data was stored in a custom table expecting each field as a column: the schema would have to change too!  We needed a better way.

Tripal HQ provides a user-contributed content control center and administrative toolbox for your Tripal site. This means that users are able to create whatever Chado content you'd like them, but withhold inserting it into the database until someone has approved it.


## Approach

Tripal HQ will handle the emails, as well as the user and admin dashboards.  All that we need to do is configure our Analysis bundle to be suitable for user input.  

### Simple case: Organism

The default organism bundle is quite simple.

![vanilla organism](/img/datasets_to_hq_2018/vanilla_organism.png)

Let's compare this to the datasets organism form:

![datasets organism](/img/datasets_to_hq_2018/datasets_organism.png)

Here's what we are going to do:

* Remove excess fields
* Add in new fields as properties


### Remove unfriendly fields

Understand that the organism bundle on your site had fields added based on Chado's layout for an analysis(https://laceysanderson.github.io/chado-docs/tables/organism.html).  The organism base table has an abbreviation, genus, species, common_name, infraspecific_name, type_id, and comment field.

We can see that there is indeed a field for each of these, found at **Structure -> Tripal Content Types -> Organism -> Manage Fields**.

Additional fields, such as publication and annotation, get attached automatically due to **linker tables** such as [analysis pub](https://laceysanderson.github.io/chado-docs/tables/organism_pub.html) and [analysis cvterm](https://laceysanderson.github.io/chado-docs/tables/organism_cvterm.html).

The first step is deciding which of these fields we can safely hide from users.  Note that the Organism table has a [constraint](https://laceysanderson.github.io/chado-docs/tables/organism.html#Indexes): the genus, species, type_id, and infraspecific name columns **must be unique** in the database.  It's therefore a good idea to not hide these widgets from our users, unless we don't plan to make use of the type and infraspecific name at all.

#### Removing cross reference fields

Some of the default Tripal fields can be tough for visitors on a site, who don't necessarily know anything about Tripal.  The Annotations field, for example, is pretty open-ended: how would a user know what types of annotations to add?  The publication and cross reference widgets (Drupal's word for the field's input box) are more straight forward, but require the records to **already exist in the database**: this is likely to be confusing for someone trying to tag their submission with a publication!

Fortunately, we can use the **Drupal Field Permission** module to hide these fields from our users.  I've already written a [guide for how to use field-specific permissions](https://tripal.readthedocs.io/en/latest/user_guide/content_types/field_permissions.html) on the Tripal documentation: follow that guide to configure permissions os these widgets only appear for admins.

#### Adding in new property fields

Now that we've greatly simplified our organism form, let's add in the questions we want end users to be answering.

**NCBI Taxonomy ID**  This field is a special case.  Because it refers to this organism in another database, it is supposed to go in `dbxref`.  However, asking users to fill out the cross reference field is too much.  For now, we'll add it as a property, but look for a custom field in the future that **only associates an organism with the NCBI taxonomy ID**.

First, we need an ontology term. The [EBI Ontology Lookup Service](https://www.ebi.ac.uk/ols/index) is a fantastic resource for finding terms.

Luckily we have a great term from the EDAM, which Tripal makes extensive use of: [data:1179](https://www.ebi.ac.uk/ols/ontologies/edam/terms?iri=http%3A%2F%2Fedamontology.org%2Fdata_1179).  If EDAM isn't fully loaded on your site, insert the term manually (go to `admin/tripal/loaders/chado_vocabs/chado_cvterms`).

Once we have a term, create a new field of type Chado Property (Note: Chado properties create their own fields!  So if you already have an `organismprop` in the database, you shouldn't have to perform this step.).

For this field settings, be sure to select the CVterm we chose above.  Set the number of values to 1, or, unlimited, depending on your usage.  Be sure to fill out the Help Text box as desired.  We'd also like to make this field required: check the **Required Field** box.

##### Fields that shouldn't go in the database

This field really shouldn't go in Chado, but we might still want to ask users:
>Briefly describe your plans for this genome project (e.g. are you interested in community curation?). *

We'll therefore attach it as a **regular Drupal Field**.


* Insert a term for the field (I'm using local:submitter_plans)
* Create a new field of type long text
* Set the term to our submitter_plans term
* Be sure to set up the help text with the message you want users to see.
* After saving the field, leave the display disabled: we don't want this showing up on the organism page!

![Adding the plain text field](/img/datasets_to_hq_2018/long_text.png)


We don't want to display this field, so leave the formatter disabled.


The same is true for some of the other questions: for example, "Were you involved in the generation of this genome assembly?".  In this case, however, a textfield isn't appropriate: instead, let's use a boolean.  I use the term `local:user_assembled_organism_genome` for this field.  For the widget, a single on /off checkbox is appropriate.

![Adding the plain text field](/img/datasets_to_hq_2018/user_submit_genome.png)

### Configure display

Now we just have some final touches.  Be sure to drag and reorder the fields in a manner which makes the most sense for your users.

I changed the boolean checkbox to use the label for the display and reordered my fields.  This is the end result:

![Final organism widget](/img/datasets_to_hq_2018/final_org_widget_display.png)


This field configuration can be exported with the Drupal Feature module: see my guide on doing so [here](https://www.bradfordcondon.com/2018-11-09-understanding_drupal_features/).


## Managing user submissions with HQ

Next, we need to set up HQ.  This means:

* giving permission to a user role for submitting HQ content for Organism
* (optional) giving permission to a user role for approving HQ content

Once HQ is set up, user submissions will appear in the admin dashboard.

![admin dash](/img/datasets_to_hq_2018/admin_dash.png)

 The admin can click on the title to edit and view the submission, or click on approve to create the record.  Once the submission is approved, it will be entered into Chado, and a Tripal entity will be created associated with it.
