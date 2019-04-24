<?php

use Illuminate\Database\Seeder;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      $users = factory(App\Models\User::class, 1)->create();
      $users->each(function($user) {
        $views = factory(App\Models\View::class, 1)->create();
        $views->each(function($view) use($user) {
          $view->user_id = $user->id;
          $view->save();
        });
      });
    }
}
