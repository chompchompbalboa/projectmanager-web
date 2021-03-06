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

$factory->define(App\Models\SheetColumn::class, function (Faker $faker) {

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
      'sheet_id' => null,
      'position' => 1,
      'width' => 250,
      'name' => $faker->streetSuffix,
      'type' => 'STRING',
    ];
});