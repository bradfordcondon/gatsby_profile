---
layout: post
title: BLAST output
date: 2017-06-14
tags:
  - bioinformatics
  - next-generation-sequencing
---

This post is part 5 of a series on file formats, written for the 2017 UK-KBRIN Essentials of Next Generation Sequencing Workshop at the University of Kentucky.

## BLAST

The full BLAST manual is avialable here: [https://www.ncbi.nlm.nih.gov/books/NBK279675/](https://www.ncbi.nlm.nih.gov/books/NBK279675/)

### BLAST output formats

BLAST output options are chosen with the `--outfmt` flag.  For example, `blastn --outfmt 0`.
The out format options are:

```
0 = pairwise,
1 = query-anchored showing identities,
2 = query-anchored no identities,
3 = flat query-anchored, show identities,
4 = flat query-anchored, no identities,
5 = XML Blast output,
6 = tabular,
7 = tabular with comment lines,
8 = Text ASN.1,
9 = Binary ASN.1
10 = Comma-separated values
11 = BLAST archive format (ASN.1)
```

The "long-form" formats, 0-4, can be good for looking at individual alignments, but they quickly become overwhelming when performing large BLAST queries.  

Other formats are more machine-readable, but are harder for humans to look at.  XML and ASN.1 fall in this category.  You can read more about ASN.1 format at [http://www.itu.int/en/ITU-T/asn1/Pages/introduction.aspx](http://www.itu.int/en/ITU-T/asn1/Pages/introduction.aspx).

The best compromise between human readability and machine parsing is probably *tabular* or *Comma-seperated* format, which produces a table that can be imported into excel for manual sorting or easily parsed with a scripting langauge such as python or perl.  Let's look at the tabular format below.



## outfmt 6


Out format 6 outputs a single line per entry, where each column is seperated by a tab character `/t`.  The columns are as follows: 

| label   | description               |
|----------|----------------------------------------------|
| qseqid   | query sequence id               |
| sseqid   | subject (e.g., reference genome/hit) sequence id |
| pident   | percentage of identical matches              |
| length   | alignment length                             |
| mismatch | number of mismatches                         |
| gapopen  | number of gap openings                       |
| qstart   | start of alignment in query                  |
| qend     | end of alignment in query                    |
| sstart   | start of alignment in subject                |
| send     | end of alignment in subject                  |
| evalue   | expect value                                 |
| bitscore | bit score                                    |

Remember that the query and subject ID depend on the annotations in your query and target FASTA files.  Also remember that everything after the first space in the FASTA header is considered a description.  In the below example, gene1 and gene2 would have a `qseqid` of genomeA in both cases.  A simple fix would be to replace spaces with underscores.

```
>genomeA gene1
AAAATTTGAAAATATATATACCATTACAG
>genomeA gene2
GGGATATAGAGGCCCCCAACCACACCCCT
```


