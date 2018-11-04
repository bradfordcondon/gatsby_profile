---
layout: post
title: Velvet assembly output files
date: 2017-6-13
tags:
  - bioinformatics
  - next-generation-sequencing
---

This post is part 4 of a series on file formats, written for the 2017 UK-KBRIN Essentials of Next 
Generation Sequencing Workshop at the University of Kentucky.

## Introduction 
The velvet manual is hosted online in wiki format.  You can find the section on output files [here](https://github.com/dzerbino/velvet/wiki/Manual#output-files).  I'll be including relevant quotes from the manual.  I also found [this site](http://davetang.org/wiki/tiki-index.php?page=Velvet) helpful, and some of the examples are taken from here.
Ultimately the stats files included with the assembly can be more confusing than helpful.  Don't be too concerned if you don't understand all of the metrics.

Below is a brief guide to the files included in the output.

## contigs.fa

From the manual: 

>This fasta file contains the sequences of the contigs longer than 2k, where k is the word-length used in velveth. If you have specified a min_contig_lgth threshold, then the contigs shorter than that value are omitted.

## stats.txt 

This file describes the nodes in the assembly and will look like the below example.


| ID | lgth | out | in | long_cov | short1_cov | short1_Ocov | short2_cov | short2_Ocov | long_nb | short1_nb | short2_nb |
|----|------|-----|----|----------|------------|-------------|------------|-------------|---------|-----------|-----------|
| 1  | 153  | 0   | 0  | 0.000000 | 118.790850 | 118.790850  | 0.000000   | 0.000000    | 0       | N/A       | N/A       |
| 2  | 55   | 0   | 0  | 0.000000 | 14.581818  | 14.581818   | 0.000000   | 0.000000    | 0       | N/A       | N/A       |

A table describing the headers is below

| Column header | Full name             | Description                                                 |
|---------------|-----------------------|-------------------------------------------------------------|
| ID            | ID                    | Node ID                                                     |
| lgth          | length                | length (in k-mers)                                          |
| out           | 3' arcs               | Number of arcs 3'                                           |
| in            | 5' arcs               | Number of arcs 5'                                           |
| long_cov      | coverage short 1      | coverage in long reads                                      |
| short1_cov    | coverage short 1      | coverage in short reads (including divergent sequences)     |
| short1_Ocov   | coverage short 2      | coverage in short reads (conform to consensus only, strict) |
| short2_cov    | coverage short 2      | coverage in short reads (including divergent sequences)     |
| short2_Ocov   | coverage short 2      | coverage in short reads (conform to consensus only, strict) |
| long_nb       | long reads in node    | number of long reads in node                                |
| short1_nb     | short 1 reads in node | number of short1 reads in node                              |
| short2_nb     | short 2 reads in node | number of short2 reads in node                              |


## velvet_asm.afg
This file is meant to be read by the AMOS assembly package, so we will not be concerned with it.

## LastGraph

This file describes the graph produced by velvet to create the assembly.

There is one header line for the entire graph, which lists the number of nodes, number of sequences, and the total hash length.

Then, each node has a block with the following format:

```
 NODE $NODE_ID $COV_SHORT1 $O_COV_SHORT1 $COV_SHORT2 $O_COV_SHORT2 $ENDS_OF_KMERS_OF_NODE $ENDS_OF_KMERS_OF_TWIN_NODE 
```

These should look familiar to whats in the `stats.txt` file.  The ends of K-mers values are the last nucleotides of the k-mers in that node.

