---
layout: post
title: Introduction to BLAST
date: 2017-05-03
excerpt_separator: <!--more-->
tags:
  - bioinformatics
  - ukblast
---


#### UK-BLAST workshop 2016

This tutorial was developed for Dr. Mark Farman at the University of Kentucky for Undergraduate students participating in UK-BLAST.  If you are trying to learn how to run applications from the command line but are feeling lost, this guide is for you.

UK-BLAST is a bioinformatics working group for undergraduate researchers.  In small labs, students often tackle the bioinformatician role in with little to no technical guidance.  The group may not have anyone with a computer science background, or the task may be beyond the skills of current personnel.  In these cases, a working group headed by a technical mentor (myself) allows students to bypass some of the pitfalls and headaches associated with learning computer science all alone.

<!--more-->


## What is BLAST?

BLAST, or Basic Local Alignment Search Tool, is a program compares a protein or nucleotide query sequence against a database of known sequences.  BLAST has many different applications for many fields of biology.  For example, BLAST is commonly used...

* To compare sequences from different genomes.
* To compare similar genes within a genome.
* To create phylogenetic trees.
* To identify species given a DNA sample of unknown origin.
* To infer function of an unknown protein. 
* To map DNA to a reference.
* To identify repeated sequences (self BLAST).
* To find conserved motifs in a protein (PSI-BLAST)


When most users access BLAST, they do so via the [NCBI BLAST web portal](http://blast.ncbi.nlm.nih.gov/Blast.cgi).  Here, one can paste in a sequence and search against GenBank or other comprehensive databases.  As of 2013, Genbank includes sequences from almost 260,000 formally described species.
Note: for an extremely in depth summary of how BLAST works, see [the NCBI course here](http://www.ncbi.nlm.nih.gov/BLAST/tutorial/Altschul-1.html). Be warned: there is a lot of higher math in this link. 

### Using BLAST remotely

Accessing data: let's go to GenBank and access some protein sequences by pointing a browser to http://www.ncbi.nlm.nih.gov/genbank/  

![Blast remote](/assets/img/BLASTremote/rblast1.png)


> *	Search for a protein you are interested in. For starters, let's look for ABC transporters in *Magnaporthe oryzae*, the fungus which causes a variety of blast diseases on different “grass” plants (including wheat and rice).


Here is a top hit.  Note that the Accession number, ELQ65981.1 as well as the gene ID 440486081 both serve to uniquely identify this protein.

![Your first BLAST hit](/assets/img/BLASTremote/rblast2.png)
 
Clicking on the FASTA link for this sequence will display the protein's sequence in FASTA format.

![Your first BLAST hit, in FASTA format](/assets/img/BLASTremote/rblast3.png)
 
>Download a protein sequence and save it to its own FASTA file.  

Be careful copy-pasting and opening sequence files in programs like Microsoft Word - they will introduce hidden characters that will corrupt bioinformatic analyses.   It's best to download files directory, or to use "safe" text editors like Textwrangler or SublimeText.


#### Searching the BLAST database

The National Institute of Health hosts a fantastic BLAST database at their website, available at http://blast.ncbi.nlm.nih.gov/Blast.cgi 
*Note*:  if your websession fails, you can access previous results by clicking on the "Recent Results" link.
> * 	Visit the NCBI blast database.  Explore the different types of BLAST available and make sure you understand the different BLAST “flavors”
 *	Paste or upload your FASTA file into the protein BLAST search form (careful about giving them too many options). For now, we will use the default search parameters. Make sure that the database you are querying is the non-redundant protein database.

 A view of the BLAST results is provided below.
 
![BLAST query interface](/assets/img/BLASTremote/rblast4.png)


The *conserved domains* section gives us an overview of the protein.  You can click on individual regions of the protein to learn more about each domain.  Because we searched with an ABC protein, we see an ATP-binding cassette (ABC) domain, a ABC_membrane domain, and a second ABC domain.

> *	Click on the conserved domains of your protein.  Write down each domain name, and what function you think each domain might perform for the protein. 

We will learn more about predicting protein domains, and understanding conserved domains, in a later lesson.
Navigate back to the blast results page (back on your browser), and scroll down to the colored alignments section.
   
![BLAST query interface close up](/assets/img/BLASTremote/rblast5.png)


BLAST will list results in descending order.  In the example of the first six results above, our query protein is given at the top, and each result is drawn as a series of colored boxes.  The higher the alignment score for a region, the more similar that protein is. 

> *	From which species are the top 10 hits? 
 *	How many hits retrieved have a percent identity greater than 95%?
 *	Are the hits with low % identity still listed as ABC transporters?
 *	Look at the header rows in the Descriptions section.  What does each column mean?  Translate each header below.  If you need help, you can look up the term in the BLAST glossary. 
 ```
	Max score
	Total Score
	Query Cover
	E value
	Ident
	Accession
```
 
 
#### Storing BLAST results
Let's say we wanted to store the sequences of proteins retrieved in our BLAST.  To do this, scroll down to the list of hits, click "select all", then Download, and hit "continue" with the FASTA (complete sequence) option checked.  This will download all of our hit sequences to a single FASTA file.  By selecting Text, on the other hand, we can download the BLAST output itself (the alignments, e values, etc).
 
![batch download BLAST results](/assets/img/BLASTremote/rblast6.png)


> *	Download all sequences matched by BLAST to a single FASTA file.
 * 	In your UNIX terminal, create a working directory for this tutorial.  Move your downloaded sequences to that folder (on OS X, your default download location is /Users/yourname/Downloads/) using the `mv` command.    

There are many things we can do with this dataset. We could look for conserved domain structures in ABC proteins, align the sequences, build a phylogenetic tree, or search new genomes for more ABC transporter sequences.  Storing the data with clear names, typically with a corresponding notebook describing what the data contains and the goal of your project, is essential for keeping track of your work!
In the second part of this walkthrough, we will use a single ABC sequence to identify all candidate ABC transporters in a genome.

### Downloading genomes from Genbank
Alternatively, we may want to download an entire genome to work with later.  Typically, we want either the protein catalogue (a single FASTA file with all of the predicted amino acid sequences for a genome, corresponding to each gene) and/or the assembly (the nucleotide sequence of the entire genome, broken up into contigs or scaffolds [sets of smaller nucleotide sequence "pieces" stitched together and assembled as best as possible.  The best possible assembly will have a single scaffold for each chromosome]).

### Navigating from a BLAST result to a genome

Finding this raw data can sometimes be challenging.  Let's say we're interested in finding our top BLAST hit above in the *Magnaporthe oryzae* (species name) Y34 (strain name) assembly.   If we click on it's name, this brings us to the alignment, where we can click on the sequence ID [ELQ39949.1](http://www.ncbi.nlm.nih.gov/protein/440470910?report=genbank&log$=protalign&blast_rank=1&RID=DWCKYC6P014).

> *	How many amino acids long is this protein?
 * If we wanted to read the article describing this sequence (and likely this genome) what journal and issue would we find it in?
 * What evidence on this page confirms this protein is an ABC transporter?    *Hint: try clicking on the links labeled INTERPRO and CDD.*


If you click on **ORGANISM** [*Magnaporthe oryzae* Y34](http://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?id=1143189) at the top of the page, you will arrive at NCBI's taxonomy browser.  From here we can find many useful resources, but for right now, let's focus on the "Entrez records" on the right hand side of the screen.  We'd like to download the "Assembly" and all of the associated proteins.

 
>Click on the "1" next to "Assembly" to go to the Entrez assembly record.   
 
We're almost there!
The assembly page has even more information about this strain's genome sequence.  Of particular interest is the genome coverage, the sequencing technology, the total sequence length, and the number of scaffolds. 

>Click on the "Download the Genbank assembly" link to access the genome download page.

At this point, you should be pointed at ftp://ftp.ncbi.nlm.nih.gov/genomes/all/GCA_000292585.1_MoY34_2.0.  This is an FTP site, which means we could connect to this site via the terminal to download from the command line!  It may look like a lot of stuff here: if you're confused, check the README.TXT file.  It's common practice for people to include a README file explaining the contents of these repositories.  We want the nucleotide sequences in FASTA format and the protein sequences in FASTA format, which correspond to the files ending in protein.faa and genomic.fna.

> *	Download the nucleotide assembly and the full protein catalogue of this genome. 
 * In UNIX, make a folder for your whole genome assemblies.  You may like to keep one folder for proteins, and another for nucleic acids.
* Create a table (for example in excel) to keep track of your downloaded genomes.  Be sure to have a column for the file name (on your system), species name, strain name, where you downloaded the data from, reference, date downloaded, and version.  If you aren't sure of this information, it should be on the reference page.

### Building a database relevant to your project
Now that you've downloaded a genome, you may want to have a database of genomes relevant to your own project.  To get started on this, go back to your original BLAST search (or perform a new search if you've lost the page).  

> *	Following the above steps, attempt to download another organism's full nucleotide assembly and protein catalogue.    Be sure to add its information to your genome database spreadsheet. 

Genbank is one of many data repositories where datasets are available.  Depending on your project, you may download assemblies from other sources.  Databases and assemblies are updated and change, which is why its important to *keep track of what version you are using, and where you got it from*.

In the next lesson, we'll go over installing and running BLAST locally.
