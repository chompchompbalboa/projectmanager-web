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

$factory->define(App\Models\Active::class, function (Faker $faker) {
    return [
      'id' => $faker->uuid,
      'user_id' => '75e3c4f9-b261-3343-a320-8ee9fb0c931e',
      'file_id' => null,
      'open_folders' => null
    ];
});
