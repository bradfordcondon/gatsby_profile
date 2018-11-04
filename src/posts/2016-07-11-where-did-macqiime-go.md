---
id: 573
title: Where did MaCQIIME go?
date: 2016-07-11T18:29:34+00:00
author: bradford.condon@gmail.com
excerpt_separator: <!--more-->
layout: post
tags:
  - bioinformatics
  - ecology
  - metagenomics
  - qiime
---
For those of you running MacQIIME on OSX El Capitan or higher, you may (like me) find that the MacQIIME executable is no longer in your path.

I was a little confused:I couldn&#8217;t find it on my system, although I still had my MacQIIME installation in the default location.  What gives?

<!--more-->

After reinstalling MacQIIME with no luck, I finally looked at the documentation (serves me right for being lazy).  [Turns out that the developers are aware of this issue, and plan to fix it soon.](http://www.wernerlab.org/software/macqiime/macqiime-installation)  For now, they offer the below line of code to execute the MacQIIME shell:

<pre class="prettyprint hljs-dark"><code class="hljs gradle">&lt;span class="hljs-keyword">source&lt;/span> &lt;span class="hljs-regexp">/macqiime/&lt;/span>configs&lt;span class="hljs-regexp">/bash_profile.txt &lt;/span>
</code></pre>

More permanent solutions are also posted on their install page.  Thanks to the Werner lab for maintaining MacQIIME.