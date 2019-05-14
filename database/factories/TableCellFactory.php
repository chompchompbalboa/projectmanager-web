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

$factory->define(App\Models\TableCell::class, function (Faker $faker) {
    return [
      'table_id' => null,
      'table_column_id' => null,
      'table_row_id' => null,
      'value' => $faker->text($faker->numberBetween(10, 100)),
      //'number' => $faker->numberBetween(1, 100),
      //'boolean' => $faker->randomElement([0, 1]),
      //'datetime' => $faker->dateTimeThisYear($max = 'now'),
    ];
});
