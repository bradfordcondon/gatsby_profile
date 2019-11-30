---
layout: post
title: "Sublime Text developer plugins"
date: 2019-11-30
tags:
 - sublime
 - notes
 - tips
---

Sublime text is a great editor.  Unlike PHPStorm, my editor of choice, it can work well in a virtually mounted file system (such as SSHFS).  However it requires a few plugins to include all the features I know and love from PHPStorm. This post shares some simple configuration files and recommended packages.

 These are the packages I recommend:

- [Package Control](https://packagecontrol.io/)
- [Package Control Resource Viewer](https://packagecontrol.io/packages/PackageResourceViewer)
- [Babel](https://github.com/babel/babel-sublime)
- [Naomi](https://packagecontrol.io/packages/Naomi)
- [dockBlockr](https://packagecontrol.io/packages/PackageResourceViewer)
- [JSPrettier](https://packagecontrol.io/packages/JsPrettier)
- [phpmd](https://github.com/SublimeLinter/SublimeLinter-phpmd)
- [CodeFormatter](https://packagecontrol.io/packages/CodeFormatter)


Ideally, all members of the team will have the same automatic styling, reducing whitespace changes and churn in the codebase.  If I'm working in a legacy codebase, or on a team where we can't standardize code formatting, I'll turn off automatic styling. For my own files I'll run the formatter, but for minor changes to other people's code, I wont restyle their work.

If you find lots of white space changes being committed, I recommend separating out the whitespace changes into their own commit by running the formatter first as your first commit.  This keeps the style changes separate from code changes.

## Javascript

[JSPrettier](https://github.com/jonlabelle/SublimeJsPrettier)

Because React code can be very heavily indented, I found myself increasing the line width.


```js
{
	"prettier_options": {

		"printWidth": 120
	}
}
```


## PHP

### Mess detector

I love mess detector for its unused code warnings- it can catch typos in variable names.

```
{

 "linters": {

        "phpmd": {
         "rulesets": "codesize,controversial,design,naming,unusedcode" }
        }

}
```
### Code formatter
Below is my code formatter ruleset.

```js

{
    "codeformatter_php_options":
    {
        "syntaxes": "php", // Syntax names which must process PHP formatter
        "php_path": "/usr/bin/php", // Path for PHP executable, e.g. "/usr/lib/php" or "C:/Program Files/PHP/php.exe". If empty, uses command "php" from system environments
        "format_on_save": false, // Format on save
        "php55_compat": false, // PHP 5.5 compatible mode
        "psr1": false, // Activate PSR1 style
        "psr1_naming": false, // Activate PSR1 style - Section 3 and 4.3 - Class and method names case
        "psr2": false, // Activate PSR2 style
        "indent_with_space": false, // Use spaces instead of tabs for indentation
        "enable_auto_align": false, // Enable auto align of = and =>
        "visibility_order": false, // Fixes visibility order for method in classes - PSR-2 4.2
        "smart_linebreak_after_curly": false, // Convert multistatement blocks into multiline blocks

        // Enable specific transformations. Example: ["ConvertOpenTagWithEcho", "PrettyPrintDocBlocks"]
        // You can list all available transformations from command palette: CodeFormatter: Show PHP Transformations
        "passes": [
          "OnlyOrderUseClauses",
          "AllmanStyleBraces",
         "ClassToSelf",
         "AutoSemicolon",
          "JoinToImplode",
          "ShortArray", // [] vs array()
          "SplitElseIf",
          "RemoveSemicolonAfterCurly",
           "ReplaceIsNull",
          // "SpaceAroundExclamationMark",
           "SpaceBetweenMethods",
            //"StrictComparison",
             "StripNewlineAfterCurlyOpen",
            "StripNewlineAfterClassOpen",
             "StripSpaceWithinControlStructures",
             "UpgradeToPreg",
              "WrongConstructorName",
               "TightConcat"],

        // Disable specific transformations
        "exclude": ["PSR2IndentWithSpace",
         "OrderAndRemoveUseClauses",
         "YodaComparisons"]
    }
}
```
