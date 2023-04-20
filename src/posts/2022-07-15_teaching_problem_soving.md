---
layout: post
title: "Problem Solving"
date: 2022-07-15
tags:
 - education
 - web-development
---

Two skills I value highly in junior developers are independent problem-solving and resourcefulness.  

How can we interview effectively for these skills (or an inclination to develop them)?  How can we train and strengthen them?  I'd like to think outloud on some of these issues in a blog post series, starting with training.


### Training Problem-Solving

When I get on the phone with a junior developer, I ask the below questions to set the stage.  Before I do that, I like to ask the developer to message me the question with relevant errors/traces.  I do this not only because that way I can point the dev in the right direction without stopping my own flow, but to ensure that the dev has engaged with the problem sufficiently.  If the dev cant ask for help the right way, we have some communication issues we need to address before I'll worry about teaching troubleshooting. Provided we reach the call stage, I'll ask:


- What are you expecting to happen?  What is happening and why is that wrong?
- What do you hypothesize is wrong?
- What makes you think that?
- If we're stuck, I love to ask: what could disprove our hypothesis?

A scientific approach to troubleshooting isnt always the best, fastest, or right way.  I reach for it when people are well and truly stuck.  If we are at this stage of troubleshooting, we have to recognize that its likely our core assumptions about the problem are wrong.  We need to stop, look, and truly think about the evidence.  That evidence might be an error trace (and being able to look at an error trace and discern meaning is **not** an easy skill), a behavior (or lack of a behavior: im looking at you cache busting).

I try very hard not to tell a developer what is wrong, or where to look, early on in training.  Web development can be a fairly involved tech stack, so knowing how to isolate your thinking "rule out" each piece can be a really helpful goal.  Instead, I try to demonstrate patterns and the appropriate diagnostic tool.  White screen of death?  Make sure you are checking your build output and devtool console for messages.  If that all looks good, do we have a sane back-end response?  We essentially bisect the process, trying to rule out blocks of the stack until we've confirmed that the issue resides in **our** code, because we're confident our code has what it needs to do what it needs to do.   From there, teh crudest way forward is simply logging data throughout the system.  Far more sophisticated tools and approaches exist, but the base goal is the same: I'm testing my assumptions, bisecting the code between where I'm confident and the faulty output.

Is the **OHEC** (Observation, Hypothesis, Experiment, Conclusion) paradigm appropriate for web development?  Probably not.  In reality it's not the mantra every scientist brings to troubleshooting small-scale problems either.  However, the toolkit of testing base assumptions with positive/negative controls and isolating independent/dependent variables (even if we dont use that language explicitly) is helpful in both places.  In fact, I'll devote a future post entirely to thinking about the parallels between good experiments and well-tested code.
