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
      'table_id' => 1,
      'column_id' => 1,
      'row_id' => 1,
      'string' => $faker->text($faker->numberBetween(10, 100)),
      'number' => $faker->numberBetween(1, 100),
      'boolean' => $faker->randomElement([0, 1]),
      'datetime' => $faker->dateTimeThisYear($max = 'now'),
    ];
});
