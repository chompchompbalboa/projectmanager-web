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

        // Folders
        $folderMap = [
          ['folders' => 1, 'modules' => 2],
          ['folders' => 2, 'modules' => 1],
        ];
        $folders = factory(App\Models\Folder::class, count($folderMap))->create();
        $folders->each(function($folder, $folderKey) use($folderMap, $user) {
          $folder->user_id = $user->id;
          $folder->save();
          print('Folder: '.$folder->id.PHP_EOL);
          
          // Subfolders
          $subFolders = factory(App\Models\Folder::class, $folderMap[$folderKey]['folders'])->create();
          $subFolders->each(function($subFolder, $subFolderKey) use($folder, $folderKey, $folderMap) {
            $subFolder->folder_id = $folder->id;
            $subFolder->save();
            print('  Subfolder: '.$subFolder->id.PHP_EOL);

            // Modules
  
            $modules = factory(App\Models\Module::class, $folderMap[$folderKey]['modules'])->create();
            $modules->each(function($module) use($subFolder) {
              $module->folder_id = $subFolder->id;
              $module->save();
              
              $moduleTypes = ['CALENDAR', 'NOTE', 'TABLE'];
              $moduleType = $moduleTypes[array_rand($moduleTypes, 1)];
  
              switch($moduleType) {
                case 'TABLE': 
                  print('  Table'.PHP_EOL);
                  // Tables
                  $tables = factory(App\Models\Table::class, 1)->create();
                  $tables->each(function($table) use ($module) {

                    $module->name = 'Table';
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
                break;
                  
                case 'NOTE':   
                  print('  Note'.PHP_EOL);            
                  // Notes
                  $notes = factory(App\Models\Note::class, 1)->create();
                  $notes->each(function($note) use ($module) {
                    $module->name = 'Note';
                    $module->type = 'NOTE';
                    $module->type_id = $note->id;
                    $module->save();
                  });
                break;
                  
                case 'CALENDAR':   
                  print('  Calendar'.PHP_EOL);            
                  // Calendars
                  $calendars = factory(App\Models\Calendar::class, 1)->create();
                  $calendars->each(function($calendar) use ($module) {
                    $module->name = 'Calendar';
                    $module->type = 'CALENDAR';
                    $module->type_id = $calendar->id;
                    $module->save();
                  });
                break;
              }
            });
          });
        });
        
        // Active
        $actives = factory(App\Models\Active::class, 1)->create();
        $actives->each(function($active) use($user) {
        });
      });
    }
}
