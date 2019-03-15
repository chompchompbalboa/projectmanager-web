<?php

use Faker\Generator as Faker;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(App\Models\Column::class, function (Faker $faker) {
  
    $type = $faker->randomElement([
      [
        'type' => 'STRING',
        'default_sort_order' => 'ASC',
      ],
      [
        'type' => 'NUMBER',
        'default_sort_order' => 'ASC',
      ],
      [
        'type' => 'BOOLEAN',
        'default_sort_order' => 'ASC',
      ],
      [
        'type' => 'DATETIME',
        'default_sort_order' => 'DESC',
      ]
    ]);
    return [
      'table_id' => 1,
      'position' => 1,
      'width' => 0.2,
      'header' => $faker->streetSuffix,
      'type' => $type['type'],
      'default_sort_order' => $type['default_sort_order'],
    ];
});