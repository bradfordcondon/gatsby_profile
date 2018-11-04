---
layout: post
title: "D3 part two: flipping the plot"
excerpt_separator: <!--more-->
date: 2017-12-31
custom_js: d3_graph_2.js
tags: 
 - education
 - web
 - javascript
 - d3
 - data-science
---

![D3 logo](/assets/img/d3/d3_logo.png)

In our [previous lesson](/2017/12/22/plotting_with_d3/), we created this rudimentary plot.

D3 considers the **upper left** corner of the SVG to be 0,0.  This means that the part of our code defining y values needs to be corrected.

To correct our inverted plot, let's introduce [D3 scales](https://github.com/d3/d3-3.x-api-reference/blob/master/Quantitative-Scales.md).  As a quick reminder, we're using the D3-3.x package: the latest version has slightly different scale function calls.

<!--more-->



><div id="starting_plot"></div>
> This is our plot from the previous lesson.  It's upside-down!



## What Are Scales?

Scales are used to define how values will map to the plot.  Your plot might make use of several different scales.  There is mapping the x and y value of your data, for example.  You might also define a scale that **colors** your datapoint based on a category. 

Let's start with the y-axis, where we want to translate a numerical value to a place on the plot.  The simplest type of scale is a **linear** scale, where the input values will be mapped to an output value via a linear function.

For a linear scale, we need to understand the **`domain()`** and the **`range()`**.  Both domain and range take an array of numbers as their input.  The domain corresponds to the **input values** for your plot.  For a continuous plot, you might set the domain to the minimum and maximum value in your dataset for the y-axis.  The range corresponds to the output coordinates in your SVG.

```js
var height = 100
var width = 100
var yScale =  d3.scale.linear() 
yScale.domain([0, 100])
yScale.range([height, 0])//note the range is inverted

```

We need to set two things for each bar: the `y` attribute and the `height`.  The `y` value will simply be the returned yScale value.  The height must compensate for our inverted range: it should be the figure height minus the yScale value. I've also declared a `height` and `width` value to keep track of the size of my plot. Using named constants makes it much easier to reuse code and keep track of things like borders and margins.

The resulting code looks like this:

```js

var height = 100
var width = 100
var yScale =  d3.scale.linear() 
yScale.domain([0, 100])
yScale.range([height, 0])//note the range is inverted
var bars=  svg.selectAll('.bar')
    .data(data)
    .enter()
    .append('g')
   .attr('transform', function (d, i) {
  return 'translate(' + (20 + i* 20) + ',0)'; 
  }).append('rect')
 .attr('y', function(d) {
  return yScale(d.value)
 }
  )
.style("height", function (d, i) {
return height - yScale(d.value)})

```


><div id="plot_mk_1"></div>
>Our y-axis scale accounts for the upside-down nature of D3.

Our plot is now situated at the bottom of the SVG, where it belongs.


### x-axis

The x-axis can be a simple or complex affair.  Our original plot used the transform attribute to shift each `g` element.  We can instead use an X scale. Let's plot out each sample in a different location based on its name.  Again, we'll define a `domain()` and a `range()`, but instead of a linear scale, we'll map each name to a specific place on the map with an **Ordinal** scale.  

```js
var xScale = d3.scale.ordinal()
xScale.domain(["one", "two", "three", "four"])
    .rangeRoundBands([0, width]);

```
As you can see, the domain consists of the discrete values along the x-axis.  Setting the range for an ordinal scale is actually a bit more involved, and we'll discuss options below.  For now, let's also update our `g` elements to use the x-axis to place each bar:

```js
var bars=  svg.selectAll('.bar')
    .data(data)
    .enter()
    .append('g')
   .attr('transform', function (d, i) {
  return 'translate(' + xScale(d.name) + ',0)'; 
  }).append('rect')
 .style('fill', "red")
 .attr('y', function(d) {
  return yScale(d.value)
 }
  )
 .style("height", function (d, i) {
 return height - yScale(d.value)})
 .attr('width', 10)

 ```

> <div id="plot_mk_2"></div>
> Using x & y scales makes our plots easier to develop.  This default plot is a little spread out: let's learn about padding to fix this.

### Understanding Ordinal Scale Ranges

You might [benefit from reading the API here](https://github.com/d3/d3-3.x-api-reference/blob/master/Ordinal-Scales.md).  You can use range, rangePoints, rangeRoundPoints, rangeBands, rangeRoundBands. You should typically use the *rounded* flavor of each range: it will round the location of each group to an integer, preventing anti-aliasing artifacts at the cost of some extra padding. 


As for using points or bands, the difference is in how the spacing is calculated.  RangePoints will simply return evenly spaced points, whereas RangeBands will define a **band** spaced out according to the padding argument.  

#### Range Points

<img src="https://camo.githubusercontent.com/1f2b6fd134f82ce192002ec3944eccb09c748abe/68747470733a2f2f662e636c6f75642e6769746875622e636f6d2f6173736574732f3233303534312f3533383638392f34366438373131382d633139332d313165322d383361622d3230303864663763333661612e706e67">

`rangePoints()` takes two arguments: the range, and the padding with the edge of the axis.  This padding is expressed as a *multiple of the space between points*.  

#### Range Bands

<img src="https://camo.githubusercontent.com/12675eaff20815f41bccd4d1c50643c2b531052e/68747470733a2f2f662e636c6f75642e6769746875622e636f6d2f6173736574732f3233303534312f3533383638382f34366332393863302d633139332d313165322d396137652d3135643961626366616239622e706e67">

Rather than splitting the axis into dispersed points, `rangeRoundBands()` splits the axis into bands, with regular padding between each.  
`rangeRoundBands()` accepts an array to define the range, as well as **two** padding values: the outer padding (which is similar to the padding defined in rangePoints) and the step padding.  The step padding is the spacing between bands.  When no argument was supplied above, we used the defaults, which was equivalent to this:

```js
padding = 0 //default padding values are 0
outerpadding = 0

var xScale = d3.scale.ordinal()
xScale.domain(["one", "two", "three", "four"])
    .rangeRoundBands([0, width], padding, outerPadding);

```

Confusing?  Let's try adding some outer padding.

```js
padding = 0
outerpadding = 2

var xScale = d3.scale.ordinal()
xScale.domain(["one", "two", "three", "four"])
    .rangeRoundBands([0, width], padding, outerPadding);
```
> <div id="plot_mk_3"></div>
> Adding some outer padding pushes our plot together

We'll come back to changing the band padding once we group our data.


### Color scale

Let's say we want to color each of our bars by the category of the sample.  To do this, we'll define an ordinal scale like our x-axis, except rather than setting the range output to an axis, we'll set it to a *discrete set of colors*.  Our output range will now be quite simple: an array of colors.   We can define the output color range manually, or we can use predefined palettes like those provided by the ColorBrewer package.  Keep in mind that *accessibility* is an important consideration here: approximately one in twelve adult males (one in 200 females) is colorblind.  Packages like ColorBrewer are designed to be universally accessible.  


```js
var colorScale = d3.scale.ordinal()
colorScale.domain()
colorScale.range()
```

Alternatively you can use scales with pre-defined color ranges.

```js
var colorScale = d3.scale.category10()
colorScale.domain()

```

Next, simply call the scale when setting the `fill` style.  

```js
 .style('fill', function(d) {
 	return colorScale(d.property)
 	})

```


## Putting it back together

Here is our new code utilizing x, y, and color scales.

```js

<!DOCTYPE html>
<style>
.axis .domain {
  display: none;
}
</style>
<svg width="960" height="500"></svg> 
<script src="https://d3js.org/d3.v3.min.js"></script>
<script>

  var height = 100
  var width = 100

var data = [{name: "one", property: "a", value: 100},
             {name: "two", property: "a", value: 50},
              {name: "three", property: "b", value: 20},
             {name: "four", property: "b", value: 57}, ];
  
  var svg = d3.select("svg") 
  
  var yScale =  d3.scale.linear()
 
yScale.domain([0, 100])
.range([ height, 0])

outerPadding = 2
padding = 0

var xScale = d3.scale.ordinal()
xScale.domain(["one", "two", "three", "four"])
    .rangeRoundBands([0, width], padding, outerPadding);

var colorScale = d3.scale.category10()
colorScale.domain(["a", "b"])
      
 var bars=  svg.selectAll('.bar')
    .data(data)
    .enter()
    .append('g')
   .attr('transform', function (d, i) {
  return 'translate(' + xScale(d.name) + ',0)'; 
  }).append('rect')
 .style('fill', function(d) {
  return colorScale(d.property)
  })
 .attr('y', function(d) {
  return yScale(d.value)
 }
  )
 .style("height", function (d, i) {
 return height - yScale(d.value)})
 .attr('width', 10)
   
  </script>

  ```

> <div id="plot_final"></div>
> The plot with x, y, and color scales.

In the [next segment](/2018/01/17/d3_part3_nesting/), we'll look at using a multi-level x-axis to group our plot by category.
