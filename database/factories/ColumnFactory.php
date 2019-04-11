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
      ],
      [
        'type' => 'NUMBER',
      ],
      [
        'type' => 'BOOLEAN',
      ],
      [
        'type' => 'DATETIME',
      ]
    ]);

    return [
      'table_id' => 1,
      'position' => 1,
      'width' => 0.2,
      'name' => $faker->streetSuffix,
      'type' => $type['type'],
    ];
});