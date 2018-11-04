---
id: 557
title: Using the command line and perl to quickly trim files
date: 2016-05-23T18:58:02+00:00
author: bradford.condon@gmail.com
layout: post
guid: http://www.bradfordcondon.com/?p=557
tags:
  - fasta
  - genomics
  - perl
  - productivity
  - science
  - scripts
---
Sometimes, you have a task where the goal is to remove a certain phrase, set of characters, or trailing characters within a file. This happens all the time working with FASTA files. For whatever reason, the header description might be longer than you like. Some phylogenetics programs, for example, have a character limit on headers. Failure to fix this on your own can result in clipped headers, which in turn can result in non-unique headers and failed scripts.

The simple solution is to use find and replace in your text editor. This works, but you need to type in exactly what you&#8217;d like to remove: there is no pattern matching. Furthermore, what if we have 100s of files to edit? Even if there is only one file to edit, the rule of wasted work states that if you do a task once, you&#8217;re going to have to redo it with slightly modified input data.

![manually searching files works, but it can be easier to automate at the command line](/wp-content/uploads/2016/05/Screen-Shot-2016-05-23-at-2.54.18-PM.png)

&nbsp;

The solution: command line perl scripts. Look at the below script:

`for f in *.fasta; do perl -i -pe 's/_(.*)fasta//g' "$f"; done`

What does it do?

`<strong>for f in *.fasta;</strong> do perl -i -pe 's/_(.*)fasta//g' "$f"; done`

This code block says &#8216;for every file ending in .fasta (the asterisk * is a wildcard), we&#8217;re going to do something. Let&#8217;s refer to the file as &#8216;f&#8217;.

`do perl -i -pe 's/_(.*)fasta//g' "$f";`

This code block runs perl on our file f (which is referred to as $f). The key part is `'s/_(.*)fasta//g'<code>. Character by character, here is what happens:`</code>

 `s` &#8211; this lets perl know we&#8217;re going to substitute something.
  
`/_(.*)fasta/` &#8211; this is the first part of perls regexp search. We look for any characters that fall between an underscore (_) and &#8216;fasta&#8217;. The `(.*)` tells perl &#8220;any number of characters can be between the underscore and &#8216;fasta&#8217; &#8220;.

`/g` Finally, this lets perl know we are doing a **global** search. Without the g, perl will stop at the first match. Because my fasta files have lots and lots of headers I want to trim, I search globally.

Notice there are two / characters in a row after the phrase &#8216;fasta&#8217;. This tells perl that we are going to replace the matched phrase with **nothing**. We could just as easily write `'s/_(.*)fasta/lizard/g'` which would replace the characters between the underscore and fasta with the word &#8216;lizard&#8217;

`done`

This is the command that wraps up our shell script. It tells the loop to go back and work on the next file it can find.

My hope is that even if you don&#8217;t fully understand how perl, regular expressions, or even the command line works, this walk through is enough for you to adapt my code above to accomplish what you need.