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
        print('User : '.$user->id.PHP_EOL);

        // Containers

        $containers = factory(App\Models\Container::class, 1)->create();
        $containers->each(function($container) use($user) {
          print('Container: '.$container->id.PHP_EOL);
          $container->user_id = $user->id;
          $container->name = "Me";
          $container->icon = "ME";
          $container->save();
        
          // Collections
  
          $collections = factory(App\Models\Collection::class, 2)->create();
          $collections->each(function($collection) use ($container) {
            print('  Collection: '.$collection->id.PHP_EOL);

            $container->collections()->attach($collection->id);
            $container->save();

            $views = $modules = factory(App\Models\View::class, 2)->create();
            $views->each(function($view) use($collection) {
              print('    View: '.$view->id.PHP_EOL);

              $collection->views()->attach($view->id);
              $collection->save();

              // Modules
  
              $modules = factory(App\Models\Module::class, 1)->create();
              $modules->each(function($module) use($view) {
  
                $view->modules()->attach($view->id);
                $view->save();

              });
            });
          });
        });
        
        // Active
        $actives = factory(App\Models\Active::class, 1)->create();
        $actives->each(function($active) use($user) {
          $active->user_id = $user->id;
          $active->save();
        });
      });
    }
}
