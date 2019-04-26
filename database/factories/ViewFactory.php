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

$factory->define(App\Models\View::class, function () {
    return [
      'user_id' => 1,
      'container_id' => null,
      'collection_id' => null,
      'table_id' => null,
      'breakdown_id' => null,
      'left_column_width' => null
    ];
});
