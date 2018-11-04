---
layout: post
title: "Module showcase"
excerpt_separator: <!--more-->
date: 2018-06-08
tags: 
 - drupal
 - tripal
 - jekyll
---

This week I made a [super simple Jekyll-powered site to show off the modules I've developed for Tripal](https://statonlab.github.io/hardwoods_tripal_showcase/)!

<a href="https://statonlab.github.io/hardwoods_tripal_showcase/">
![Showcase Image](/assets/img/tripal_showcase.png)
</a>

<!--more-->


## Overview

We were discussing ways to improve collaboration between groups, and I realized it would be neat to have a simple, expressive site to show off my work.  I went with a bootstrap card layout, with two sentences and an image for each module.  Clicking on the card will bring to a more descriptive page with a featurelist and more screenshots.

I use Jekyll's header system to define a few variables for each post: the showcase image, a DOI, the github URL, and a URL of the module in action on our live site.  These headers get converted into icons and links on the landing page, and on each module's individual page.

The below markdown file (located in `_posts/`) describes a single module: Tripal Alchemist.  

```md
---
layout: post
title:  "Tripal Alchemist"
img: alchemist_card.png
github: https://github.com/statonlab/tripal_alchemist
zenodo_badge: https://zenodo.org/badge/DOI/10.5281/zenodo.1187120.svg
zenodo_url: https://doi.org/10.5281/zenodo.1187120
see_live: https://www.youtube.com/watch?v=BPL6zmVx_RM
---

Convert Tripal Entities from one bundle to another.

* Convert Tripal Entities from one bundle to another.
* Used at HWG to change feature types, or to convert analyses to sub-types with specialized fields.
* Supports **collections** to easily convert entities.

Watch a video of the [module in action on youtube](https://www.youtube.com/watch?v=BPL6zmVx_RM)!

>![manual conversion](../images/alchemist/manual_transmutation.png)
> For small bundles, manually select entities to convert.

>![collections support](../images/alchemist/tripal_alchemist_collections.png)
>Use collections to easily convert a subset of entities.
```

[The code is up on Github](https://github.com/statonlab/hardwoods_tripal_showcase) so feel free to adapt it to your own needs.

