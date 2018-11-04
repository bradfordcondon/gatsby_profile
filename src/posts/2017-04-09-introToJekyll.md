---
layout: post
title: "Moving to Jekyll"
date: 2017-04-09
excerpt_separator: <!--more-->
---

## Switching to Jekyll

This weekend I switched my site from a Wordpress site hosted by bluehost to a Jekyll site hosted on githubpages.  I'm excited about this for plenty of reasons.

* Free hostings on GithubPages
* Manage all aspects of the site, including layout and posts, on github
* Write in Markdown
* Use R plugins to script in R Markdown (I'll share my experience with this later!)
* An excuse to practice CSS and Ruby

It's pretty win-win.

If you're looking to try this out for yourself, you'll want Ruby/RVM, Jekyll, and github set up.

<!--more-->

## Migrating my old Wordpress posts

[Ben Balter](http://ben.balter.com/) has created a Wordpress plugin that exports existing posts to Jekyll Markdown.

It's simple: download and enable the plugin, then use the `export to Jekyll` command on the toolbar. 
 
All of my Wordpress posts are now neatly in my `_posts` folder, and all associated assets are in `wp-content/uploads/[date]/`.  I need to cull some of the images to cut down on space, and I have to redo the formatting of my old Wordpress posts.  For example, the MD headers have more info than we would possibly care about (such as review requests) and there are some wonky tags in the pages.  All in all, though, this works extremely well.

## Working with drafts

I suggest reading through the Jekyll docs, but the simple gist is that we'll write our posts directly in Markdown as drafts in `_drafts`.  Executing `jekyll serve --drafts` 

[This post on Hongkiat's blog](http://www.hongkiat.com/blog/jekyll-plugin/) pointed me to a plugin created by [Jeffrey Sambells](http://jeffreysambells.com/). 

We write posts in the `_drafts` folder, and mark them as `date: unpublished` in the header (note that having `unpublished` posts in _`drafts` folder will mess with running the --draft server.  I recommend just commenting the line out until moving to `_publish`)
 

 So,

 ```
---
layout: post
title: "Moving to Jekyll"
  <!-- date: unpublished -->
---

# Introduction

This is my post that I get to write in *Markdown*!  

 ```

When we're ready to publish the post, we move it to the `_publish` folder (and uncomment the date).  Our plugin will fix the date and move it to the `_posts` folder.

## Configuring the site layout

Hooboy.  As someone who has almost zero experience doing this, I'd recommend starting with an existing Jekyll theme if you feel overwhelmed.  If not, pick a CSS framework and mess around, there's no better way to learn.  You can always use [this site as a starting point](https://github.com/bradfordcondon/bradfordcondon.github.io) if you're totally lost.

## Start posting!

I'm really hopeful that The joy of writing in Markdown (and R Markdown) will get me back in the blogging game.

