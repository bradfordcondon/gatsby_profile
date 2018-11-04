---
layout: post
title: "Tripal Country: Chado Feature Annotations"
excerpt_separator: <!--more-->
date: 2018-02-12
tags: 
 - drupal
 - tripal
 - chado
 - web-dev
 - bioinformatics
 - databases
---

Welcome to Tripal Country!

![Tripal Logo](/assets/img/TripalLogo_dark.png)


Tripal feature annotations might be a little unintuitive, especially for non-biologists.  This guide is to solidify my own knowledge of what goes where and why: hopefully it will be helpful to some developers as well.

<!--more-->

## Executive Summary

* KEGG, IPR, GO annotations go in `feature_cvterm`.  The annotations show up in the "Annotation" field
* BLAST annotations go in `blast_hit_data`.  The annotations show in up the "Homology" field


## The `feature` table

The `feature` table is where all sequences live in Chado as dictated by the [sequence](https://laceysanderson.github.io/chado-docs/sequence/index.html) module.  I won't go into detail as there are other guides available for this module.

## The `feature_cvterm` table

The [`feature_cvterm`](https://laceysanderson.github.io/chado-docs/tables/feature_cvterm.html) table is the simplest way to annotate a feature.  You just need a feature_id and a cvterm_id, which will be the KEGG, IPR, or GO cvterm id. Additional info for the annotation goes in [feature_cvtermprop](https://laceysanderson.github.io/chado-docs/tables/feature_cvtermprop.html).


## The `blast_hit_data` table

Blast annotations loaded in from the `analysis_blast` module go somewhere *different*: to the `blast_hit_data` table.  Why?

Tripal sites can use whatever BLAST annotations they would like.  This might mean a custom gene set, even the [genbank nr database](https://www.ncbi.nlm.nih.gov/refseq/about/nonredundantproteins/).  To use the feature_cvterm annotation table, you'd need a cvterm for each entry in your blast database! The `blast_hit_data` table means you dont need to do this.  That's my rationale for it, at least- I didn't write it!

All of the information for the blast result is available in the `blast_hit_data` table.  This includes the name and accession of the hit with its full description and url, the scores, percent identity, e value, and number of hits.
