---
layout: post
title: qual format
date: 2017-07-09
tags:
  - bioinformatics
  - next-generation-sequencing
---

This post is part 7 of a series on file formats, written for the 2017 UK-KBRIN Essentials of Next Generation Sequencing Workshop at the University of Kentucky.

### qual format

A `.qual` file provides Phred-based quality scores for a set of sequences (often a corresponding FASTA file).  It looks something like this:

```
>my_sequence1
4 39 8 4 50 1 100 5 0
>my_sequence2 
3 3 40 42 35
```

Similar to FASTA format, each sequence is defined with a header starting with the `>` character, and all subsequente characters after the line break describe the sequence.  Unlike FASTA, the individual nucleotides are not included in this file, only the corresponding quality Phred-format scores. 
At this point, all we need to understand is what are [Phred quality scores](https://en.wikipedia.org/wiki/Phred_quality_score).  Every nucleotide in a sequence will have a quality score associated with it.  The score `Q` describes the probability `P` that the base is called in correctly:

```
Q = –10 log(P)
```
Let's look at some example Phred scores below:


|Phred score	 |	 Probability incorrect			  |		% likelihood correct call	 |
|----|----------------|----------|
|3   |	1 in 2   	  |		50%	 |
| 10 | 1 in 10        | 90%      |
| 20 | 1 in 100       | 99%      |
| 30 | 1 in 1000      | 99.9%    |
| 40 | 1 in 10,000    | 99.99%   |
| 50 | 1 in 100,000   | 99.999%  |
| 60 | 1 in 1,000,000 | 99.9999% |


Phred scores typically range from 2-40 with current sequencing technology.  As you can see, setting a cutoff somewhere around `30` or higher results in fairly strict confidence in invidual base calls.
