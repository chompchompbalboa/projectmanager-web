<?php
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

$factory->define(App\Models\Active::class, function () {
    return [
      'user_id' => 1,
      'container_id' => null,
      'collection_id' => null,
      'view_id' =>  null
    ];
});
