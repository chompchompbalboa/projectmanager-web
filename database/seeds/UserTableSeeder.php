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
      // Users
      $users = factory(App\Models\User::class, 1)->create();
      $users->each(function($user) {

        // Containers

        $containers = factory(App\Models\Container::class, 1)->create();
        $containers->each(function($container) use($user) {
          $container->user_id = $user->id;
          $container->name = "Me";
          $container->icon = "ME";
          $container->save();
        });
        
        // View
        $views = factory(App\Models\View::class, 1)->create();
        $views->each(function($view) use($user) {
          $view->user_id = $user->id;
          $view->save();
        });
      });
    }
}
