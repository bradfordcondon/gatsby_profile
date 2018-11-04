---
layout: post
title: PATH, a guide to finding one's way
date: 2017-04-23
excerpt_separator: <!--more-->
tags:
  - bioinformatics
  - ukblast
---


#### UK-BLAST workshop 2016

These exercises were developed for Dr. Mark Farman at the University of Kentucky for Undergraduate students participating in UK-BLAST.  If you are trying to learn how to run applications from the command line but are feeling lost, this guide is for you.

UK-BLAST is a bioinformatics working group for undergraduate researchers.  In small labs, students often tackle the bioinformatician role in with little to no technical guidance.  The group may not have anyone with a computer science background, or the task may be beyond the skills of current personnel.  In these cases, a working group headed by a technical mentor (myself) allows students to bypass some of the pitfalls and headaches associated with learning computer science all alone.

<!--more-->

# PATH: A guide to finding one's way


Written by Bradford Condon, PhD.  Farman Labratory, University of Kentucky, 2016


## Background: What is a PATH?

In computing, [a PATH](https://en.wikipedia.org/wiki/Path_(computing)) is the absolute name of a file or directory, specifiying its unique location within a file system.  When you navigate to a file on your computer, locate a song in your music library, or navigate to a website, you do so using this absolute file structure.

## Getting started

To begin, you must first access the command line.  On Mac, this is through the Terminal: on Windows, you need to use a program like [PuTTY](http://kb.site5.com/shell-access-ssh/putty/putty-how-to-start-a-ssh-session-from-the-command-line/).  

Open up your Terminal (press CMD-SPACE top open spotlight and type terminal) and you should be greeted by a command prompt like this:
![Welcome to the command line](assets/img/PATH/path2.png)

Where are we?  What files and folders are located where we are?  The word immediately preceeding the $ symbol is the name of my current working directory.  The next section will explain some simple commands to look around your file structure.

### *PWD*: print working directory

Our first essential command is PWD.  PWD stands for print working directory.

* Type in `pwd` and make note of where you are located.

```bash
Bradfords-MacBook-Pro:Documents chet$ pwd
/Users/chet/Desktop/Documents
Bradfords-MacBook-Pro:Documents chet$ 
```
This is called our starting directory or HOME directory, and is where we will begin every time we open a new terminal.  
This is an **essential**  command to learn!
The dollar sign $ is called the prompt.  It lets you know that your computer is ready to receive input commands.  Notice how in the first line I typed 'pwd' and hit enter.  The computer processed the command and gave me an output on the second line.  The third line shows, again, my current working directory and the prompt, letting me know it is ready receive another command.

	

The value returned by PWD on my computer was `/Users/chet/Desktop/Documents`.

This is where my terminal is currently located, and is referred to as my working directory.  **Yours will look different** but it will mean the same thing: There are a series of folders within folders telling you how to find your current working directory.  on OSX, the /Users/ directory contains the home directory for all the users of that computer.

* Write the full PATH pwd returns for you below.

>PATH to my home directory:
> 
>/  
>    

Let's go over a few quick commands so we can practice navigating our file structure.

* **LS** - lists files and folders in your current directory
* **CD** - Changes directory. 
* **MKDIR**-  Creates a directory.


* Try each of the above commands yourself and see what happens.  Write what happens for each in the box below.

```
ls
cd
mkdir
```
> 
> 
> 


What did `mkdir` do?  It gave us a *usage* message, which means we didn't use the program properly.  We tried to create a directory without specifying the name of the directory. 

*  Let's create a directory called test:

```
mkdir test
```

* Try the excercises below.

> Which of the above commands will let us check if our newly made directory exists? Execute this command.
<br>

> What is the full path of this new folder?  
<br>

> Create another folder called test.  What happens?
<br>



`mkdir` failed because we cannot have two files with the same name in the same location.  

If you ever need guidance figuring out how to run a program, type the program name with the help option/flag for documentation (`-h` after the command: see the code box below).  As you use more and more elaborate programs, this will become very useful!

```
cd -h
ls -h
mkdir -h
```
	


### *CD*: change directories

`cd` changes the directory we are in.  If we only type in

> `cd`
	
It will automatically move us to our *home directory*.

* To navigate into our new test folder, type  issue the following two commands.

```
cd test
ls
```

this will move us into the test folder, and list the files in this folder.  We just made it, so it's empty.

 * Next, make a new folder in this directory and use ls to see if the command was successful.

```
mkdir test
ls
```

We can have two folders named test in separate locations, but we cannot have two folders named test in the same location.  This is because each folder has its own ABSOLUTE PATH.

* Use pwd and cd to answer the question below.

> What is the full PATH of the first test directory we made?  The second?
><br>

*  While located in the this second test folder, issue these three commands:

```
pwd
cd
pwd
```

As you can see, the `cd` command returns us to our home directory when we dont supply an argument (write something after the command name).

If we want to navigate back , we could type

```
cd test
cd test
pwd
```

Alternatively: we can navigate there in one jump by typing 

```
cd test/test
```

This command changes directory from our current directory to a folder called test, and then to the next folder inside of that.  What's important to understand is that we can do this from *anywhere on the computer* by specifying the full path.

Even more importantly, we can issue a command on files in other directories by giving their full PATH!  The below command would list the contents of my test folder no matter what my current working directory is.

```
ls /Users/chet/Desktop/Documents/test/test
```

* Try listing the contents of a folder *that is not your current working directory*.

#### Relative and absolute paths

* Try the following example below (on a mac).  

```
cd /usr
pwd 
ls
cd /Users/_yourNameHere_/Desktop/Documents/test/test
pwd
```

Notice that by typing `cd /FOLDER`, we are telling `cd` the *absolute* path of a file.  before, we typed `cd FOLDER` (without the backslash first).  This specified the *relative* path.  The absolute path of a file never changes.  The relative path is really the path *from our current working directory*.  

##### Comprehension questions

* What is the absolute path of our second test folder?
* What is the relative path of our test folder from the home directory?

#### Shortcuts
Below are two very useful shortcuts.

```{bash}
cd ..   ##One directory up.  Very useful for quickly navigating directories.
cd ../anotherfolder  ##navigates one folder backwards, and then into another folder 
cd ~   #~ is a shortcut to the home directory.  It's not useful here because cd also returns us to our home directory but....
cd ~/Desktop/Documents	## Very useful when specifying the ABSOLUTE PATH of a file or folder.

	## The hash symbol indicates a comment. 
	# Most programming langauge ignore everything appearing in a line after a # 
	#(or a different character used for this purpose): it is for human eyes to "annotate" code.

```

* From Your home directory, where does `cd ..` take you?

## Command line completion/autofill

The final essential tip of this lesson is command line completion or autofill.

```
Bradfords-MacBook-Pro:Desktop chet$ pwd
/Users/chet/Desktop
Bradfords-MacBook-Pro:Desktop chet$ ls
$RECYCLE.BIN
Documents
Screen Shot 2016-02-05 at 10.44.47 AM.png
Solved Tests
images_for_PATH
Bradfords-MacBook-Pro:Desktop chet$ 

```

As you can see, I'm currently located in `/Users/chet/Desktop`.  If I'd like to move into my test folders located in documents I could type `cd Documents/test/test`  However, this is a confusing file path.  It's very easy to make mistakes typing out something like this.  Command line autofill is an extremely powerful tool to get around this.  To access it, start typing your command and press tab *after writing a few characters*. It will automatically fill in the rest of the file name if it is unambiguous.

* From your home directory, navigate back to your test folder by using autocomplete.

Sometimes, we'll have two files with similar names.  Suppose we have two folders, test1 and test2.  How can we quickly navigate into test2?

* Make two similarly named directories in current folder.  Begin using autocomplete to cd into one.  What happens?

* Try pressing pressing tab **twice** after typing in a few letters.  What happens?

We can use autocomplete not only to change directories quickly, but correctly navigate confusing directories.

## Final exercise

**Note: do not experiment deleting, moving, or modifying files in your root directory.**

* Navigate to the root of your file structure by typing `cd /`
 - What files are located here?
 - What is the easiest way to return to your home directory?

* Try navigating from your root directory to your test directory created earlier using a single command!  You can make use of the shortcuts listed above, especially tab autocomplete.  

Keep in mind that being familiar with the absolute PATH of files is useful for more than just navigating around your computer.  **We can issue commands in folders where we are not currently located using the PATH**.  This works with both relative, and absolute, paths.

for example, to list the files in a new folder, we can type

```
cd /Users/chet/Desktop
mkdir test_folder
ls test_folder
```

##### Comprehension questions


* Make a new test folder and navigate into it.
 - From here, how can you list the contents of your home directory using...
  + Absolute path
  + Relative path
* How can you make a new folder in your home directory from this remote location?

