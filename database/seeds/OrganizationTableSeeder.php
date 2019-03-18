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
      $organizations = factory(App\Models\Organization::class, 1)->create();
      $organizations->each(function($organization) {

        $projects = factory(App\Models\Project::class, 5)->create();
        $projects->each(function($project) use ($organization) {
          $project->organization_id = $organization->id;
          $project->save();
          print('Project: '.$project->id.PHP_EOL);

          $tables = factory(App\Models\Table::class, 5)->create();
          $tables->each(function($table) use ($project, $tables) {
            $table->project_id = $project->id;
            $table->save();
            
            $columns = factory(App\Models\Column::class, 5)->create();
            $columns->each(function($column, $key) use ($table, $tables) {
              $column->table_id = $table->id;
              $column->position = $key;
              $column->save();
            });

            $rows = factory(App\Models\Row::class, 50)->create();
            $rows->each(function($row) use($columns, $table, $tables) {
              $row->table_id = $table->id;
              $row->save();
              
              $columns->each(function($column) use($row, $table) {
                $cell = factory(App\Models\Cell::class)->create();
                $cell->table_id = $table->id;
                $cell->row_id = $row->id;
                $cell->column_id = $column->id;
                $cell->save();
              });
            });
          });
        });

        $organization->save();
      });
    }
}
