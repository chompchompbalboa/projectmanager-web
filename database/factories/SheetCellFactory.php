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

$factory->define(App\Models\SheetCell::class, function (Faker $faker) {
    return [
      'sheet_id' => null,
      'sheet_column_id' => null,
      'sheet_row_id' => null,
      'value' => $faker->text($faker->numberBetween(10, 100))
    ];
});
