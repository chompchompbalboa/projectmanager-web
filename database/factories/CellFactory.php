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

$factory->define(App\Models\Cell::class, function (Faker $faker) {
    return [
      'column_id' => 1,
      'row_id' => 1,
      'string' => '',
      'number' => 1,
      'boolean' => true,
      'datetime' => now(),
    ];
});
