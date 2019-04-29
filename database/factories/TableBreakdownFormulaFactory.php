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

$factory->define(App\Models\TableBreakdownFormula::class, function (Faker $faker) {
    return [
      'table_breakdown_id' => 1,
      'table_column_id' => 1,
      'type' => $faker->randomElement(["EQUALS", "GREATER_THAN", "LESS_THAN"]),
      'string' => null,
      'number' => null,
      'boolean' => null,
      'datetime' => null,
    ];
});
