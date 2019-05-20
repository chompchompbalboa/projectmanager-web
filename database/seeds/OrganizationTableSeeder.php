<?php

use Illuminate\Database\Seeder;

use Faker\Generator as Faker;

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

        // Folders
        $folderMap = [
          ['folders' => 3, 'modules' => 3],
          ['folders' => 2, 'modules' => 1],
        ];
        $folders = factory(App\Models\Folder::class, count($folderMap))->create();
        $folders->each(function($folder, $folderKey) use($folderMap, $organization) {
          $folder->organization_id = $organization->id;
          $folder->save();
          print('Folder: '.$folder->id.PHP_EOL);
          
          // Subfolders
          $subFolders = factory(App\Models\Folder::class, $folderMap[$folderKey]['folders'])->create();
          $subFolders->each(function($subFolder, $subFolderKey) use($folder, $folderKey, $folderMap, $organization) {
            $subFolder->folder_id = $folder->id;
            $subFolder->save();
            print('  Subfolder: '.$subFolder->id.PHP_EOL);

            // Modules
  
            $modules = factory(App\Models\Module::class, $folderMap[$folderKey]['modules'])->create();
            $modules->each(function($module) use($subFolder) {
              $module->folder_id = $subFolder->id;
              $module->save();
  
              // Tables
    
              $tables = factory(App\Models\Table::class, 1)->create();
              $tables->each(function($table) use ($module) {
  
                $module->type = 'TABLE';
                $module->type_id = $table->id;
                $module->save();
  
                // Columns
                
                $columns = factory(App\Models\TableColumn::class, 3)->create();
                $columns->each(function($column, $key) use ($table) {
                  $column->table_id = $table->id;
                  $column->position = $key;
                  $column->save();
                });
                
                // Rows
                
                $rows = factory(App\Models\TableRow::class, 10)->create();
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
              });
            });
          });
        });

        $organization->save();
      });
    }
}
