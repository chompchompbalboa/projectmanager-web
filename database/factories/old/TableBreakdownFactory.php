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

$factory->define(App\Models\TableBreakdown::class, function (Faker $faker) {
    return [
      'table_id' => null,
      'name' => $faker->text($faker->numberBetween(5, 15)),
    ];
});
