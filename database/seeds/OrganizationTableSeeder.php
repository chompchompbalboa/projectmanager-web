<?php

use Illuminate\Database\Seeder;

class OrganizationTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        
      // Organization

      $organizations = factory(App\Models\Organization::class, 1)->create();
      $organizations->each(function($organization) {

        // Containers
        $containerMap = [
          ['name' => "Projects", 'icon' => "PROJECTS", 'collections' => 5, 'views' => 5, 'modules' => 1],
          ['name' => "Organization", 'icon' => "ORGANIZATION", 'collections' => 2, 'views' => 2, 'modules' => 1]
        ];
        $containers = factory(App\Models\Container::class, count($containerMap))->create();
        $containers->each(function($container, $containerKey) use($containerMap, $organization) {
          $container->organization_id = $organization->id;
          $container->name = $containerMap[$containerKey]['name'];
          $container->icon = $containerMap[$containerKey]['icon'];
          $container->save();
          print('Container: '.$container->id.PHP_EOL);
        
          // Collections
  
          $collections = factory(App\Models\Collection::class, $containerMap[$containerKey]['collections'])->create();
          $collections->each(function($collection) use ($container, $containerKey, $containerMap) {
            print('  Collection: '.$collection->id.PHP_EOL);

            $container->collections()->attach($collection->id);
            $container->save();

            $views = $modules = factory(App\Models\View::class, $containerMap[$containerKey]['views'])->create();
            $views->each(function($view) use($collection, $containerKey, $containerMap) {
              print('    View: '.$view->id.PHP_EOL);

              $collection->views()->attach($view->id);
              $collection->save();

              // Modules
  
              $modules = factory(App\Models\Module::class, $containerMap[$containerKey]['modules'])->create();
              $modules->each(function($module) use($view) {
  
                $view->modules()->attach($view->id);
                $view->save();
  
                // Tables
      
                $tables = factory(App\Models\Table::class, 1)->create();
                $tables->each(function($table) use ($module) {
  
                  $module->type = 'TABLE';
                  $module->type_id = $table->id;
                  $module->save();
    
                  // Columns
                  
                  $columns = factory(App\Models\TableColumn::class, 5)->create();
                  $columns->each(function($column, $key) use ($table) {
                    $column->table_id = $table->id;
                    $column->position = $key;
                    $column->save();
                  });
    
                  // Rows
      
                  $rows = factory(App\Models\TableRow::class, 50)->create();
                  $rows->each(function($row) use($columns, $table) {
                    $row->table_id = $table->id;
                    $row->save();
    
                    // Cells
                    
                    $columns->each(function($column) use($row, $table) {
                      $cell = factory(App\Models\TableCell::class)->create();
                      $cell->table_id = $table->id;
                      $cell->table_row_id = $row->id;
                      $cell->table_column_id = $column->id;
                      $cell->save();
                    });
                  });
    
                  // Breakdowns
                  
                  $breakdowns = factory(App\Models\TableBreakdown::class, rand(1, 3))->create();
                  $breakdowns->each(function($breakdown) use($columns, $table) {
                    $breakdown->table_id = $table->id;
                    $breakdown->save();
    
                    // Formulas
                    
                    $formulas = factory(App\Models\TableBreakdownFormula::class, rand(1, 3))->create();
                    $formulas->each(function($formula) use($breakdown, $columns) {
                      $formula->table_breakdown_id = $breakdown->id;
                      $formula->table_column_id = $columns->random()->id;
                      $formula->save();
                    });
                  });
                });
              });
            });
          });
        });

        $organization->save();
      });
    }
}
