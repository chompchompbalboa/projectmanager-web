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

$factory->define(App\Models\Table::class, function (Faker $faker) {
    return [
        'organization_id' => null,
        'container_id' => null,
        'collection_id' => null,
        'name' => $faker->jobTitle
    ];
});
