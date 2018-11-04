---
layout: post
title: Understanding Discovar output
date: 2017-07-15
excerpt_separator: <!--more-->
tags:
  - bioinformatics
  - next-generation-sequencing
---

This post is part 10 of a series on bioinformatics file formats, written for the 2017 UK-KBRIN Essentials of Next 
Generation Sequencing Workshop at the University of Kentucky.

## Discovar


DISCOVAR is a new genome assembler and variant caller developed by the broad institute. As of this writing,it takes as input Illumina reads of length 250 or longer produced on MiSeq or HiSeq 2500.  To learn more, read the entire DISCOVAR manual [here](https://docs.google.com/document/d/1U_o-Z0dJ0QKiJn86AV2o_YHiFzUtW9c57eh3tYjkINc/edit).


### The assembly output

The final output assembly will take the form of `OUT_HEAD.final.*`, where `OUT_HEAD` is set by the user.  Below let's assume we've set `OUT_HEAD` to out.

<!--more-->  

#### Intermediate assemblies

DISCOVAR also generates a number of intermediate assembly files, named `out.n.*`.
 
The final assembly is a graph, the edges of which are contained in two fasta files: `out.final.fasta0` and `out.final.fasta`.  `fasta0` contains the non-overlapping edges, whereas `out.final.fasta` extends the edges to overlap by K-1 bases.
  
Which you choose to use will depend on your specific needs.  In either case, the FASTA header generated takes the form of:

>edge-name	start-node:end-node k-size	edge-size

For example:

```
>edge_10 1:100 K=80 bases=330
```

Note that the `fasta0` file does not have a k parameter and is omitted.

### Visualizing the output graph

The assembly graph can be visualized using GraphViz using the below commands:

```
dot -Tps -o assembly.final.ps assembly.final.dot
gv assembly.final.ps
```

The resulting visualization will show each edge with its edgeID color coded by length.

> ![Edge illustration](/assets/img/discovar/discovar_graph.png)
> 
> Example visualization of a DISCOVAR edge, [from the DISCOVAR manual](https://docs.google.com/document/d/1U_o-Z0dJ0QKiJn86AV2o_YHiFzUtW9c57eh3tYjkINc/edit).

