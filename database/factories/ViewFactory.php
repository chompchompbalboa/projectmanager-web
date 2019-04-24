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
      'active_content' => null,
      'active_project_id' => null,
      'active_table_id' => null,
      'active_breakdown_id' => null,
      'active_left_column_width' => null
    ];
});
