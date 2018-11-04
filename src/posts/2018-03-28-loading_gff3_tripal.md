---
layout: post
title: "Tripal GFF Loader"
excerpt_separator: <!--more-->
date: 2018-03-28
tags: 
 - tripal
 - chado
 - drupal
---


I was recently tasked with using the Tripal GFF loader to add genomic coordinates to our mRNA features.  The Tripal.info tutorial [covers using the GFF loader](http://tripal.info/tutorials/v3.x/example-genomic-site/genomic-data) to load in features, but at Hardwoods we don't typically follow this paradigm, and only load in features using the FASTA loader.


![Tripal Logo](/assets/img/TripalLogo_dark.png)


<!--more-->

# The GFF3 file

Before we begin, lets look at a GFF3 file.


```
Contig0	FRAEX38873_v2	gene	16315	44054	.	+	.	ID=FRAEX38873_v2_000000010;Name=FRAEX38873_v2_000000010;biotype=protein_coding
Contig0	FRAEX38873_v2	mRNA	16315	44054	.	+	.	ID=FRAEX38873_v2_000000010.1;Parent=FRAEX38873_v2_000000010;Name=FRAEX38873_v2_000000010.1;biotype=protein_coding;AED=0.05
```

Each entry specifies, in order, the contig the feature is located on (The **Landmark**: see below), the assembly version, the feature type, the start, end, and strand information of the feature.  The final column contains annotations.  Most importantly are the **Name** tag which the GFF file will match when looking for your feature (or use as the name when creating the new feature), and the **Parent** tag.  The parent **must** exist for the loader to continue.  

In our case, we need to specify a landmark type in order for the loader to work.  If you get an error like the one specified below, then your contigs or scaffolds are not loaded, or there is a discrepency in the names in your database and in your GFF file.

>The landmark 'Contig0' cannot be found for this organism (Fraxinus excelsior) Please add the landmark and then retry the import of this GFF3 file


# Loading the Contigs FASTA

Whatever sequence is the landmark type must be loaded prior to running the GFF importer.  The contig FASTA files are quite large, and we don't do very much with the data.  We therefore can strip the FASTA sequences from the file using sed or a custom script.  I provide an example script at the end of this file: it would be easier to use sed but I already had this program written.


# Loading the GFF3 file

### Cleaning the input GFF3

If you'd like, you can clean up the GFF3 file to remove feature types you don't want inserted into your database.

```shell
 awk '{if ($3 == "gene"  || $3 == "mrna" ) {print}} ' e_walnut_filter.gff
```

The above command will output rows of the GFF file where the third row (the annotation type) is equal to either gene or mrna.  You can pipe the results to a new file using hte `> output.txt` operator after the command.
 

 **note**: There can be additional problems with the input GFF file: if the loader fails, check the format of the input GFF.  For example, the below line of a GFF file failed for me because it included a `;` within a tag definition (the `protein 1;4`).
 ```
 jcf7180001222097	maker	gene	1838197	1841620	.	-	.	ID=WALNUT_00004175;Name=WALNUT_00004175;Alias=PREDICTED: nucleosome assembly protein 1;4,Interpro:IPR002164,Pfam:PF00956;Note=high_quality_complete_model;
```
In this case I had to manually change these semicolons to commas.


In another case, I got `dbxref` errors due to extra tags in the description: 

`ID=QlobV1.0_scaffold68_0000030-RA;Parent=QlobV1.0_scaffold68_0000030;Name=QlobV1.0_scaffold68_0000030-RA;Alias=maker-scaffold68-augustus-gene-0.26-mRNA-1;Dbxref=InterPro:IPR001650,Pfam:PF00271;Note=Similar to Eukaryotic initiation factor 4A-3 (Nicotiana plumbaginifolia);_
AED=0.08;_QI=0|0|0|1|1|1|2|0|123;_eAED=0.08;`

Since I'm pretty sure we don't need those AED, QI entries, we can remove them with sed:

`sed 's/_AED.*?\(;\)//g' Qlob.v1.0.annV1.0.gff > Qlob_modified.gff`

`sed -i 's/_eAED.*?\(;\)//g' Qlob_modified2.gff >Qlob_modified3.gff `
`sed -i 's/_QI.*?\(;\)//g' Qlob_modified3.gff > Qlob_modified_final.gff`


If you've already loaded the features, don't worry, I give examples below for how to easily delete unintended features.


### Renaming features in the GFF3

You might have to rename some of your features to get them loaded properly in the database.  For example, our English Walnut mRNAs had some information appended/prepended to the name.  We used this command to add it in: `sed ‘s/\(WALNUT_[0-9]*-RA\)/Juglans_regia_01182017_\1_mRNA/g’ Reju_v4.gff`.

### Running the GFF3 loader


# Cleaning up additional features

Tripal will insert features for *everything* in your GFF file.  This means, for example, 5' and 3' untranslated features might now be in your Chado database, even if you have no intention of using that data.  To clean up, first let's look at all the `type_id`s in our Chado database.


```
SELECT DISTINCT CF.type_id, CVT.name FROM chado.feature AS CF
	INNER JOIN chado.cvterm AS CVT ON CVT.cvterm_id = CF.type_id;
```

|   Name         | ID |
|-----------------|-----|
| exxon                |288     |
| contig             |   105  |
| mRNA          |  145   |
| gene             | 215    |
| polypeptide            | 236    |
|  CDS            |  237   |
| exon             |   288  |
| supercontig            |  290   |
| five_prime_UTR             |  354   |
| three_prime_UTR     |  355   |
| mRNA_contig             |  101394   |

In my case, the UTRs, exons, and CDS are all unnecessary: let's remove them.


```
SET search_path TO chado, public;
DELETE FROM chado.feature WHERE type_id IN (355, 354, 237, 288);
```

We need to set the search path to include prior to deleting: otherwise the command will fail.

If you make mistakes in your featureloc table, deleting them can be a bit tricky too.

```
DELETE FROM chado.featureloc FL WHERE FL.feature_id IN (SELECT feature_id FROM chado.feature where organism_id IN (42, 24, 48));
```
Here I delete things from the featureloc table that match my organisms with errors.


# Perl script for removing sequences from FASTA

```perl

#!/usr/bin/env perl
#simple Bioperl script to remove seqs from FASTA file.

use strict;
use warnings;
use Getopt::Long;
use Bio::SeqIO;
use Data::Dumper;
# usage
my $usage = "$0 -i|input fasta_input_files \n";

# global values
my $input_file;

# read user options
GetOptions(
	"i|input=s" => \$input_file,
);

# check for user parameters
if( !$input_file ){
	die $usage;
}

# open input fasta file
unless( -e $input_file ){
	die "error: cannot find fasta input file $input_file\n";
}
my $input = Bio::SeqIO->new (-file => "<$input_file", '-format' => 'Fasta')
	or die "error: failure opening fasta $input_file for reading: $!\n";

# make temporary fasta file and print header line
my $output_file = "$input_file.empty.fasta";
open( OUT, ">$output_file" )
	or die "error: cannot open $output_file for writing: $!\n";
# step through sequences in input fasta file
while( my $seqObject = $input->next_seq ){
	
	# get sequence information
	my $id  = $seqObject->id;
	my $seq = $seqObject->seq;

		print "extracting $id\n";
		print OUT ">$id\n","\n";  	
	
}
```

