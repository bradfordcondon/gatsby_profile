---
layout: post
title: "D3 part three: Nesting"
excerpt_separator: <!--more-->
custom_js: d3_graph_3.js
date: 2018-01-17
tags: 
 - education
 - web
 - javascript
 - d3
 - data-science
---

![D3 logo](/assets/img/d3/d3_logo.png)

In the [previous post](/2017/12/31/d3_part2_flipping/), we learned about using scales to format our x and y axes, s well as our bar coloring.

In this post I want to address how to **nest** data with D3.  We will use the nest method to automatically sort our samples by property, and we'll use multiple x-scales to group them along the x-axis.

<!--more-->

><div id="plot_previous"></div>
>Our graph at the end of the previous section.



><div id="plot_previous_new_data"></div>
>This is the same plot-generating code, but we've added some more data to demonstrate grouping by property.

## Nesting

A common desire when laying out a plot is to have data grouped along the x-axis by some property.  We can accomplish this by **nesting** our data according to the property we would like to group by.

```js
var data = [{name: "one", property: "a", value: 100},
             {name: "two", property: "a", value: 50},
             {name: "two", property: "b", value: 20},
             {name: "four", property: "b", value: 57},
             {name: "five", property: "b", value: 17},
             {name: "six", property: "a", value: 5},
             {name: "seven", property: "a", value: 52},
             {name: "eight", property: "a", value: 11},
             {name: "nine", property: "b", value: 81},
             {name: "ten", property: "b", value: 62},     
              ];
```
What does our nested output look like?  We can `console.log` the nested data to take a look.

```js
[  { "key": "a",
     "values": [
      { "name": "one",
        "property": "a",
        "value": 100
      },
    //...
    // additional values removed for readability      
      ]

  },
  { "key": "b",
    "values": [
      { "name": "three",
        "property": "b",
        "value": 20
      },
      { "name": "four",
        "property": "b",
        "value": 57
      },
      //...
      // additional values removed for readability
     ]
  }]
```
As you can see, we now have an array of objects, where each object has two keys: a `key` that corresponds to the property name we nested by, and a `values` that holds an array of all the data matching that property.

Now that our data is nested, how do we place it appropriately on our graph?  This is where **Ordinal Scale Bands** comes in.  Each property group will correspond to a single band, with individual samples distributed within it. 

```js
var xScale = d3.scale.ordinal()
  xScale.domain(data.map(function (entry) {
    return entry.key
  }))
    .rangeRoundBands([0, width], padding, outerPadding)
```


Our X-scale has two locations now: one for each of our two properties ("a" or "b").  Our next scale needs to map to **within one of these domains** based on the **sample name**.  Most of the examples I could find online use a uniform set of samples within each band: ([see here for an example](https://bl.ocks.org/mbostock/3887051)).  For some data this will be the case: each property group is made of male/female, or the same set of time points.  In our case, we don't know that the each sample won't appear in each group.  In fact, we don't even know if we have even property groups.  How can we deal with this?

The solution I came up with is to build a scale index.  Each property group gets its **own scale** in addition to the main scale.  

```js
  x2Scales = {}//create a scale tracker

  //go through the data and generated an individual scale for each group.
  data.map(function (propertyGroup) {
    entriesInProperty = []
    key               = propertyGroup.key
    propertyGroup.values.map(function (entry) {
      entriesInProperty.push(entry.name)
    })
    newScale      = d3.scale.ordinal()
      .domain(entriesInProperty)
      .rangeRoundPoints([0, xScale.rangeBand()])
    x2Scales[key] = newScale
  })
  ```
  Now our `x2Scales` object holds all the scales we need, index by the property group name.
  
  
### Inputing nested data

Something you may find confusing is how to access our nested data.  We input our nested data the same way we do our unnested data: using the `selectAll('.newGroupClass').data(data).enter().append()` chain.  
  
```js
  var barGroups = svg.selectAll('.barGroup')
    .data(data)
    .enter()
    .append('g')
    .attr('transform', function (d) {
      return 'translate(' + xScale(d.key) + ',0)'
    })  
```
Where before the `d` object was the individual entry, now it's actually an object with a `key` and `values` index, with the entries we want to loop through under `values`.  How do we access them?  By performing **another** `selectAll().data().enter().append()` chain!  Rather than passing in a data object into the `.data()` call, we pass in a function that retrieves the entry!

Once the data is entered, it's a matter of styling each bar in the bargroup: setting the height and fill, as before, but also transforming the x-value **again** to compensate for its locatio

Notice that we use the `barGroups` variable we defined earlier, and then append `.bar` elements.
    
    
    
```js
var bars = barGroups.selectAll('.bar')
      .data(function (d) {
        return d.values
      }).enter()
    .append('rect')
    .style('fill', function (d) {
      return colorScale(d.property)
    })
      .attr('transform', function(d){
        var scale = x2Scales[d.property]//fetch the scale
        //shift this bar by its location in the scale
        return 'translate(' +  scale(d.name) + ',0)'
      })
    .attr('y', function (d) {
        return yScale(d.value)
      }
    )
    .style('height', function (d, i) {
      return height - yScale(d.value)
    })
    .attr('width', 10)
```

><div id="plot_three"></div>
> Our plot now separates samples into groups.


An interesting challenge is dealing with uneven groups.  With this approach, every group has the same bandwidth, and the spacing within groups are calculated for each one individually.  This can be result in tightly packed groups and dispersed groups in the same plot.  We can adjust the padding for each group based on the number of samples, but we're still left with unused space in our plot for smaller groups.  


