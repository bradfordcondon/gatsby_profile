---
layout: post
title: "Testing Tripal Fields in Tripal Test Suite"
excerpt_separator: <!--more-->
date: 2018-12-18
tags:
 - drupal
 - tripal
 - testing
---


We've created a field named



The below helper methods can be easily reused in teach test.  We create known features of each sub-type and link them together with the `associate_features` helper function.



```php


  /**
   *
   */
  private function create_test_features() {

    $gene_term = chado_get_cvterm(['id' => 'SO:0000704']);

    $organism_id = factory('chado.organism')->create()->organism_id;
    $gene = factory('chado.feature')->create([
      'type_id' => $gene_term->cvterm_id,
      'organism_id' => $organism_id,
      'residues' => 'AAAAAAAA',
    ]);
    $mrna = factory('chado.feature')->create([
      'type_id' => chado_get_cvterm(['id' => 'SO:0000234'])->cvterm_id,
      'organism_id' => $organism_id,
      'residues' => 'MRNAMRNAMRNA',

    ]);
    $cds = factory('chado.feature')->create([
      'type_id' => chado_get_cvterm(['id' => 'SO:0000316'])->cvterm_id,
      'organism_id' => $organism_id,
      'residues' => 'CDSCDSCDS',

    ]);
    $protein = factory('chado.feature')->create([
      'type_id' => chado_get_cvterm(['id' => 'SO:0000104'])->cvterm_id,
      'organism_id' => $organism_id,
      'residues' => 'PROTPROT'
    ]);

    $this->associate_features($gene, $mrna);
    $this->associate_features($mrna, $cds);
    $this->associate_features($mrna, $protein);

    factory('chado.featureprop')->create(['feature_id' => $mrna->feature_id]);
    factory('chado.featureprop')->create(['feature_id' => $mrna->feature_id]);

    factory('chado.feature_cvterm')->create(['feature_id' => $mrna->feature_id]);
    factory('chado.feature_cvterm')->create(['feature_id' => $mrna->feature_id]);



    // Publish the gene feature.
    $this->publish('feature');

    // Find this entity.
    $entity_id = chado_get_record_entity_by_table('feature', $gene->feature_id);

    $entity = entity_load('TripalEntity', [$entity_id]);

    $bundle_details = db_query("
         SELECT bundle_id, type_column, type_id
         FROM chado_bundle b
         WHERE data_table=:table AND type_id=:type_id
         ORDER BY bundle_id ASC LIMIT 1",
      [
        ':table' => 'feature',
        ':type_id' => $gene_term->cvterm_id,
      ])->fetchObject();
    $bundle_id = $bundle_details->bundle_id;

    $bundle_name = 'bio_data_' . $bundle_id;

    $records = [
      'entity' => $entity,
      'entity_id' => $entity_id,
      'gene' => $gene,
      'mrna' => $mrna,
      'cds' => $cds,
      'protein' => $protein,
      'bundle_name' => $bundle_name,
    ];

    $this->records = $records;

    return $records;
  }



  /**
   *
   */
  private function associate_features($object, $subject) {
    $values = [
      'object_id' => $object->feature_id,
      'subject_id' => $subject->feature_id,
      'type_id' => [
        'cv_id' => [
          'name' => 'sequence',
        ],
        'name' => 'derives_from',
      ],
      'rank' => 0,
    ];
    $success = chado_insert_record('feature_relationship', $values);
    return $success;
  }

```
