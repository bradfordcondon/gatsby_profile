---
layout: post
title: "AJAX and widgets in Tripal 3"
excerpt_separator: <!--more-->
date: 2018-09-24
tags: 
 - drupal
 - tripal
 - documentation
 - ajax
---

# Introduction

Link: [original GitHub issue](https://github.com/tripal/tripal/issues/607
)

I found myself in a predicament: I wanted to include a dynamic element in my Tripal field's formatter.  

However, I couldnt for the life of me get the AJAX callback to run in the formatter.

<!--more-->


### The problem: renderable arrays

Drupal has its special way of doing AJAX!  [You should read the documentation carefully!](https://api.drupal.org/api/drupal/includes%21ajax.inc/group/ajax/7.x).  To Drupal, AJAX only makes sense as on forms.


Here's the problem: formatters **are not forms**.  Instead, they are [renderable arrays](https://www.drupal.org/docs/7/api/render-arrays/render-arrays-overview)!  This is obvious in hindsight: rather than accepting `$form` and `&$form_state`, they accept `&$element, $entity_type, $entity, $langcode, $items, $display`, where `$element` is the renderable array.

This means if we want to add an AJAX callback, we actually need a **seperate form file** tahts get added in using `drupal_get_form()`.  If we do this, we can build the AJAX as Drupal expects it.


### the solution: `drupal_get_form`

Here's my form file: as you can see its a standard form following Drupal AJAX conventions.  We provide a `rendered_maps` fieldset with the prefix defining the wrapper.  The selector has specifies that wrapper, and the AJAX callback function `tripalmap_organism_featuremap_callback`.  We then define that function to simply return  the piece of the form that should be rebuilt: the `rendered_maps` fieldset!



```php


function tripal_map_organism_featuremap_selector($form, &$form_state, $select) {

  $selected = 0;

  if (isset($form_state['values']['featuremap_select'])) {
    $selected = isset($form_state['values']['featuremap_select']);
  }


  $form['rendered_maps'] = [
    '#type' => 'fieldset',
    '#collapsible' => FALSE,
    '#prefix' => '<div id="tripalmap-featuremap-organism-selector-wrapper">',
    '#suffix' => '</div>',
  ];


  $form['rendered_maps']['featuremap_select'] = [
    '#type' => 'select',
    '#options' => $select,
    '#title' => 'Please select a map to view',
    '#default_value' => $selected,
    '#ajax' => [
      'callback' => 'tripalmap_organism_featuremap_callback',
      'wrapper' => 'tripalmap-featuremap-organism-selector-wrapper',
      'effect' => 'fade',
    ],
  ];


  $chosen = 0;

  if (isset($form_state['values']['featuremap_select'])) {
    $chosen = $form_state['input']['featuremap_select'];
  }

  if ($chosen != 0) {


    $mini_form = tripal_map_genetic_map_overview_form([], $form_state, $chosen);

    $form['rendered_maps']['map'] = $mini_form;

    return $form;
  }

  return $form;
}

/**
 * @param $form
 * @param $form_state
 *
 * @return mixed
 */
function tripalmap_organism_featuremap_callback($form, &$form_state) {

  return $form['rendered_maps'];
}

```

In the field formatter, we simply add this form and put the markup in the element:

```php

      //multiple maps for this organism, let user select.  Create a special form for that so we can have an AJAX select box
      $select= $select + $select_add;

      $form = drupal_get_form('tripal_map_organism_featuremap_selector', $select);
      $content = drupal_render($form);
        $element[] = [
          '#type' => 'markup',
          '#markup' => $content,
        ];
        return $element;
    }
```


