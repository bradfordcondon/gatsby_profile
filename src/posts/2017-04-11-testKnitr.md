---
title: "Knitting to Jekyll"
author: "Bradford Condon"
layout: post
date: 2017-04-11
output: html_document
excerpt_separator: <!--more-->
---



## Knitting R Markdown to Jekyll

This is a test of the Knittr package and Jekyll.

It looks like the original package for using knitr with Jekyll [here](https://github.com/yihui/knitr-jekyll) has fallen out of favor for Hugo, a GO-based static web-site generator.  Pretty cool, but let's see how easy it is to knit into Jekyll without using any packages.


## Load in some libraries and data


```
require(ggplot2)
require(knitr)
attach(mtcars)
```

<!--more-->


## Do some plots


```
head(mtcars)

##                    mpg cyl disp  hp drat    wt  qsec vs am gear carb
## Mazda RX4         21.0   6  160 110 3.90 2.620 16.46  0  1    4    4
## Mazda RX4 Wag     21.0   6  160 110 3.90 2.875 17.02  0  1    4    4
## Datsun 710        22.8   4  108  93 3.85 2.320 18.61  1  1    4    1
## Hornet 4 Drive    21.4   6  258 110 3.08 3.215 19.44  1  0    3    1
## Hornet Sportabout 18.7   8  360 175 3.15 3.440 17.02  0  0    3    2
## Valiant           18.1   6  225 105 2.76 3.460 20.22  1  0    3    1

qplot(mpg, drat, data=mtcars, color=cyl, main="mpg vs drat mtcars")
```

![plot of chunk unnamed-chunk-2](/assets/knitr/unnamed-chunk-2-1.svg)

Behold my beautiul plot!


## Render

Next we need to get our RMD to MD, with the image paths sorted.  To do this I'll stand on the shoulders of [chepec](https://chepec.se/2014/07/16/knitr-jekyll.html) who has implemented a solution.  I created a `_knitr` directory in my Jekyll site, and I included a `knitr` folder in my `assets` folder.  Make sure you update the necessary paths in the `render_post.r` file.

Now its a matter of simply sourcing the file and running `KnitPost`.  Make sure that your post titles match Jekyll requirements (start with `YYYY-MM-DD` format date).  The result is a very rapid R-studio to web post!
