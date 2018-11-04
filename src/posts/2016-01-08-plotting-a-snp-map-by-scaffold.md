---
id: 541
title: Plotting a SNP map by scaffold
date: 2016-01-08T21:29:37+00:00
author: bradford.condon@gmail.com
layout: post
guid: http://www.bradfordcondon.com/?p=541
tags:
  - biology
  - coding
  - genomics
  - r
  - snps
---
&nbsp;

I wanted to plot out SNPs along a chromosome. I was starting with SNP tables that were roughly equivalent to a .bed file:

    scaffold00001   97859   97859
    scaffold00001   176752  176752
    

Where the first column is the scaffold # in the reference, and the second and third columns are SNP locations. I adapted the R code below to print out SNP densities for select scaffolds. Because we&#8217;re working with hundreds, if not thousands, of scaffolds, it&#8217;s necessary to filter out the scaffolds of interest in some way, either by number of SNPs or the specific scaffolds of interest.

&nbsp;

We do two quick things to help us out.  The first is use count() and match() to generate a column which essentially counts the number of SNPs for each scaffold.  Then we use order() to sort by this new SNP count column.

```

    library(plyr)
    library(ggplot2)
    
    setwd("/your path")
    snps<-read.table("out.txt",sep="\t",header=F)
    
    colnames(snps)<-c("chr","start","end")
    
    #Column of # SNPs
    counts= count(snps[1])
    snps$Count <- counts[[2]][ match( snps$chr, counts[[1]] ) ]
    
    snpsorder= snps[order(-snps[,4]),] 
    
    subset= subset(snpsorder, Count > 40000)
    
    # Plot SNP density
    toprint<-ggplot(subset) + 
      geom_histogram(aes(x=start), binwidth=1000) + # binwidth will effectively set the printing window size.
      facet_wrap(~ chr,ncol=2) + # fiddle with number of columns depending on how many scaffolds you print
      ggtitle("SNPs") +
        xlab("nucleotide number") +   ylab("SNP density") +   theme_bw() 
    
    
    # save to .png
    png("snps.png",750,750)
    print(toprint)
    dev.off()
```


The above R code will plot the only scaffold with over 40k SNP counts. I chose this number because it prints the below plot.

<img class="alignnone" src="https://i1.wp.com/i.imgur.com/x6qbUuU.png?resize=500%2C750" alt="" data-recalc-dims="1" />

If I reduce the minimum to 20,000, I print a few more scaffolds

<a href="https://i1.wp.com/www.bradfordcondon.com/wp-content/uploads/2016/01/snpsall.png" rel="attachment wp-att-542"><img class="alignnone size-full wp-image-542" src="https://i1.wp.com/www.bradfordcondon.com/wp-content/uploads/2016/01/snpsall.png?fit=500%2C750" alt="multiple SNP plots" srcset="https://i1.wp.com/www.bradfordcondon.com/wp-content/uploads/2016/01/snpsall.png?w=500 500w, https://i1.wp.com/www.bradfordcondon.com/wp-content/uploads/2016/01/snpsall.png?resize=200%2C300 200w" sizes="(max-width: 500px) 100vw, 500px" data-recalc-dims="1" /></a>

Hope this code is helpful to you!

&nbsp;