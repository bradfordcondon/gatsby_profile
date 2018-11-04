---
layout: post
title: fixing tabs
date: 2017-04-19
excerpt_separator: <!--more-->
tags: 
  - jekyll
  - web-dev
---

As you can see below, the navigation tabs I'm using at the top of my page didn't properly update depending on what page the user is at.  While on the CV page, the CV tab should be selected, not home.


>![tabs not working!](/assets/img/tabsFix2017/tabIssue.png)

So how do we fix it?

<!--more-->


The header is defined in the `/_includes` folder in a hero-footer element.

```html
<div class="hero-foot">
  <nav class="tabs is-boxed nav-menu has-shadow">
    <div class="nav-center">
        <ul>
          <li  class="is-active"><a href="{{ site.baseurl }}/">Home</a></li>
          <li><a href="{{site.baseurl}}/about/">About</a></li>
          <li><a href="{{site.baseurl}}/cv.html">CV</a></li>
        </ul>
      </div>
    </nav>
  </div>
```

The list element `class="is-active"` is what tells the styling to make a particular tab active.  

We can test if we are on a particular page using this snippet: `{% if page.url == "{{my_site_navigation_here}}" %} do something {% endif %}`.  So, let's replace `<li class="is-active">` with `<li {% if page.url == "{{my_site_navigation_here}}" %} class="is-active" {% endif %}>`
 

```html
<div class="hero-foot">
  <nav class="tabs is-boxed nav-menu has-shadow">
    <div class="nav-center">
        <ul>
          <li {%if site.url == "/" %} class="is-active" {% endif %}><a href="{{ site.baseurl }}/">Home</a></li>
          <li {%if site.url == "/about/" %} class="is-active" {% endif %}><a href="{{site.baseurl}}/about/">About</a></li>
          <li {%if site.url == "/cv.html" %} class="is-active" {% endif %}><a href="{{site.baseurl}}/cv.html">CV</a></li>
        </ul>
      </div>
    </nav>
  </div>
```

Reload the site and voila, our header now updates based on our page.

>![tabs working!](/assets/img/tabsFix2017/tabsFixed.png)<br>Liquid tags make it easy to conditionally change the class of our header tab element to active or not.

If you'd like to learn more we have been working with [Liquid](https://shopify.github.io/liquid/) tags.  There are a variety of handy tags to make your static page more dynamic.
