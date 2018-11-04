---
layout: post
title: "Plotting with D3 part 1"
excerpt_separator: <!--more-->
date: 2017-12-22
custom_js: d3_graph_1.js
tags: 
 - education
 - web
 - javascript
 - d3
 - data-science
---

![D3 logo](/assets/img/d3/d3_logo.png)


[D3js (Data-Driven Documents)](https://d3js.org/) is a Javascript library that manipulates the DOM and is often used to build SVG plots.  I recently created an interactive plot for differential expression data as part of the [Tripal Analysis Expression module](https://github.com/tripal/tripal_analysis_expression/). Because other Tripal modules use D3 v3.x, I was required to do the same (as opposed to v4, the latest version).  While the [API is available](https://github.com/d3/d3-3.x-api-reference/blob/master/API-Reference.md), I'm the sort of person who learns best from tutorials and examples, and I struggled to find enough v3 examples.

<!--more-->


> ![Tripal Analysis Expression plot](/assets/img/d3/taexp_plot.png)
>
> The Tripal Analysis Expression module groups and colors data based on user selection. Each group can be dragged and rearranged.  By the end of this series, you'll be able to create higher order plots like this in D3.

With that in mind, I am writing this basic D3js v3 tutorial. This is installment one, where we create a very basic and unimpressive plot using just `data()` and `enter()`.  I recommend some starting resources below, but this tutorial is aimed at beginners.

The code for this lesson is available as a [GitHub gist](https://gist.github.com/bradfordcondon/317fe6b4edd66ba3904ed2248f8b6134), or visualized with [Bl.ocks](https://bl.ocks.org/bradfordcondon/317fe6b4edd66ba3904ed2248f8b6134).

### Background reading

Before we get started, you should understand the basics of 
* [Javascript](https://www.javascript.com/)
* [jQuery](https://jquery.com/)
* The [DOM model](https://www.w3schools.com/js/js_htmldom.asp)
* [SVG](https://www.w3schools.com/graphics/svg_intro.asp)
* A browser developer console such as [Google Chrome](https://developer.chrome.com/devtools)

I'd also recommend looking over the [D3 website](https://d3js.org/) and reading the introduction/gaining inspiration from the plots.

### Why D3?

There are other plotting solutions for javascript.  I like D3 because it strikes a nice balance between ease of use and flexibility.  It might be easier to get results plotting something with, for example, [plot.ly](https://plot.ly/javascript/) (which is built on top of D3), but the higher layer of abstraction leaves you with fewer options.

## D3: the basics

I recommended reading about jQuery in the introduction because they share the same fundamental goal: select objects in the DOM and manipulate them.  jQuery is much broader in scope: it's a general purpose javascript library.  D3's twist is revealed in it's name: Data-Driven Documents.  The assumption is that you've got data (represented in an array) and you want to *apply* that data to the DOM.  Typically, that means visualize it in some way!     


### Show me the data

How does D3 communicate your data to the DOM?  Using the `data()`, `enter()` methods!


Let's make a simple example.  You can follow along by pasting the code into text editor and opening the file in a web browser.

```javascript

<!DOCTYPE html>
<style>
.axis .domain {
  display: none;
}
</style>
<svg width="960" height="500"></svg> 
<script src="https://d3js.org/d3.v3.min.js"></script>
<script>
  
var data = [{name: "one", property: "a", value: 100},
             {name: "two", property: "a", value: 50},
              {name: "two", property: "b", value: 20},
             {name: "four", property: "b", value: 57}, ];
  
  var svg = d3.select("svg") 
    
 var bars=  svg.selectAll('.bar')
    .data(data)
    .enter()
    .append('g')
   .attr('transform', function (d, i) {
  return 'translate(' + i* 20 + ',0)'; 
  }).append('rect')
 .style('fill', "red")
 .style("height", function (d, i) {
 return d.value})
 .attr('width', 10)
  
  </script>
  
 ```
Below is the resulting plot.

<div id="output_plot"></div>


There's a couple of problems here, but let's see what we are trying to do.

* We define a data array consisting of objects with some simple key => value pairs.  For now we just use the `name` and `value` property.
* We define and select the `svg` element which holds our graphics.
* We enter our data into the `svg` using the `data()` and `enter()` calls.
* We append `g` elements to each `.bar` object. 
* We transform each `g` object by translating it, shifting it along the x-axis.
* We append a `rect` element.
* We transform the  `rect` element based on the data.

Pay special attention to `function (d, i) {//code}`.  Because we've entered our data, we can define a function that takes the *`i`th* element of the `data` array as `d` as an input, and outputs what we want. 


### Chaining
D3 allows for *chaining* method calls together, much like jQuery.  In the above example, we took advantage of chaining several times.  For example...

```js
 var bars=  svg.selectAll('.bar')
	.data(data)
    .enter()
    .append('g')
```

What's important to understand is that the chain is executed in order, and each link in the chain passes down its selection to the next member.  This means that subsequent calls after `.append('g')` will *affect that g element*.  On the other hand, setting the `style` or `attr` of an element will pass on the reference element, meaning you can execute several `style` calls in a row on the same element (as we do above)

If chaining confuses you, the above code could be written without chaining, as 

```js
 var bars=  svg.selectAll('.bar')
 bars.data(data)
 bars.enter()
 bars.append('g')
```

### Entering data with  `.selectAll().data().enter().append()`

This chain will look very familiar to you the more you use D3.  The `data` method requires a selection to bind data to.  It might be confusing that we select all `.bar` elements in the above example: what `.bar`?  They **dont exist yet!**

That's where `.enter()` comes in.  It compares the data in `data()` and the selection, and creates new placeholder elements for the entered data.


### Looping through data 

You may be confused how each element gets "told" what its height and x-position should be.  The answer lies in how D3 has created an element for each element in our data array.

Consider how we style the height in the above code:


```js
.style("height", function (d, i) {
 return d.value})
 ```  

Rather than returning a fixed height, we use a **function** to dynamically return the height based on `d` and `i`.  `d` is the individual data entry, and `i` is its key.  In our example code, when `i = 2`, `d = {name: "two", property: "a", value: 50}`.

Because our data structure has a `value` key, simply returning `d.value` will set the height of the bar based on the value of that element!  If you are getting confused, I recommend including a `console.log(d)` in your function.  You'll see in your console that each data object in the array is returned one by one.

## Building a better plot

This is clearly not an award winning plot.  We have no axes, scaling, grouping, labels, legends, or titles.  The colors are uniform.  Oh, and it's upside down (a surprisingly persistent problem with D3!)

We'll cover the rest in later lessons.  But for now, try to define your own dataset and bind it to the DOM using `data()` and `enter()`.

Continue reading with [part two: implementing scales](/2017/12/31/d3_part2_flipping/).


Did you enjoy this article?  Looking for more information?  Please feel free to contact me on twitter @bradfordcondon

