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

$factory->define(App\Models\User::class, function (Faker $faker) {
    return [
        'id' => '75e3c4f9-b261-3343-a320-8ee9fb0c931e',
        'organization_id' => '36faa7b2-79d3-11e9-8f9e-2a86e4085a59',
        'name' => 'Rocky Eastman',
        'email' => 'rockye@dillonworks.com',
        'password' => '$2y$10$TKh8H1.PfQx37YgCzwiKb.KjNyWgaHb9cbcoQgdIVFlYg7B77UdFm', // secret
        'remember_token' => str_random(10)
    ];
});
