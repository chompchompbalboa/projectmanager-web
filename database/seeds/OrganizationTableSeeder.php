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

        // Tables
        
        $tables = factory(App\Models\Table::class, 1)->create();
        $tables->each(function($table) use ($organization, $tables) {
          $table->organization_id = $organization->id;
          $table->name = "Employees";
          $table->save();

          // Columns

          $columns = factory(App\Models\Column::class, 5)->create();
          $columns->each(function($column, $key) use ($table, $tables) {
            $column->table_id = $table->id;
            $column->position = $key;
            $column->save();
          });

          // Rows

          $rows = factory(App\Models\Row::class, 50)->create();
          $rows->each(function($row) use($columns, $table, $tables) {
            $row->table_id = $table->id;
            $row->save();

            // Cells

            $columns->each(function($column) use($row, $table) {
              $cell = factory(App\Models\Cell::class)->create();
              $cell->table_id = $table->id;
              $cell->row_id = $row->id;
              $cell->column_id = $column->id;
              $cell->save();
            });
          });
        });

        // Containers

        $containers = factory(App\Models\Container::class, 1)->create();
        $containers->each(function($container) use($organization) {
          $container->organization_id = $organization->id;
          $container->name = "Projects";
          $container->icon = "PROJECTS";
          $container->save();
          print('Container: '.$container->id.PHP_EOL);
        
          // Collections
  
          $collections = factory(App\Models\Collection::class, 5)->create();
          $collections->each(function($collection) use ($container) {
            $collection->container_id = $container->id;
            $collection->save();
            print('  Collection: '.$collection->id.PHP_EOL);

            // Tables
  
            $tables = factory(App\Models\Table::class, 5)->create();
            $tables->each(function($table) use ($collection) {
              $table->collection_id = $collection->id;
              $table->save();

              // Columns
              
              $columns = factory(App\Models\Column::class, 5)->create();
              $columns->each(function($column, $key) use ($table) {
                $column->table_id = $table->id;
                $column->position = $key;
                $column->save();
              });

              // Rows
  
              $rows = factory(App\Models\Row::class, 50)->create();
              $rows->each(function($row) use($columns, $table) {
                $row->table_id = $table->id;
                $row->save();

                // Cells
                
                $columns->each(function($column) use($row, $table) {
                  $cell = factory(App\Models\Cell::class)->create();
                  $cell->table_id = $table->id;
                  $cell->row_id = $row->id;
                  $cell->column_id = $column->id;
                  $cell->save();
                });
              });

              // Breakdowns
              
              $breakdowns = factory(App\Models\Breakdown::class, rand(1, 3))->create();
              $breakdowns->each(function($breakdown) use($columns, $table) {
                $breakdown->table_id = $table->id;
                $breakdown->save();

                // Formulas
                
                $formulas = factory(App\Models\Formula::class, rand(1, 3))->create();
                $formulas->each(function($formula) use($breakdown, $columns) {
                  $formula->breakdown_id = $breakdown->id;
                  $formula->column_id = $columns->random()->id;
                  $formula->save();
                });
              });
            });
          });
        });

        $organization->save();
      });
    }
}
