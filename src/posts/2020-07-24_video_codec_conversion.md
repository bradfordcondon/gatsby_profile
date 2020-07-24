---
layout: post
title: "Converting Video Files"
date: 2020-07-24
tags:
 - notes
 - tips
---

A simple tale of automating a simple task.

### The Problem

One of the greatest joys of programming is saving time and sanity automating tasks.  I recently ran into a problem where quicktime movies exported as `.mov` from osx Catalina were not opening on a osx Yosemite.  I found that exporting as `.mp4` in quicktime wasn't sufficient, but doing so in iMovie worked.

While the 100 or so clips could have been [manually converted and exported in iMovie](https://www.addictivetips.com/mac-os/convert-mov-file-to-mp4-on-macos/), the process would have been tedious.  This is the spark of books like [Automate the Boring Stuff](https://automatetheboringstuff.com/): if you face a task that boils down to "do something over and over", you can probably automate it!

### The Solution

I went with [FFmpeg](http://ffmpeg.org/download.html) to convert the files using the command line.  On OSX I would recommend installing with [homebrew](https://brew.sh/) (`brew install ffmpeg`).

I copied all movie files to a separate folder and toyed with different conversion codecs.  You can inspect the file and view the audio and video codecs in play, so its simply a matter of determining what codecs will work on both systems.  In my case, the videos wouldnt play with `HEVC` encoding, and I needed to specify `libx264` for the output video Codec.

I wrote the following bash script to convert all files in the folder with a `.MOV` extension.

```bash
for i in *.MOV; do
    [ -f "$i" ] || break
    ffmpeg -i $i  -c:v libx264 -c:a aac "${i%.*}.mp4"
done
```
I hope this information can help you!
