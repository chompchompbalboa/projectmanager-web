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

        // Root Folder
        $rootFolder = factory(App\Models\Folder::class, 1)->create();
        $rootFolder->each(function($root_folder) use($user) {
          $user->folder_id = $root_folder->id;
          $user->save();
          
          $root_folder->name = explode(" ", $user->name)[0]."'s files";
          $root_folder->save();

          // Folders
          $folderMap = [
            ['folders' => 1, 'files' => 2],
            ['folders' => 2, 'files' => 1],
          ];
          $folders = factory(App\Models\Folder::class, count($folderMap))->create();
          $folders->each(function($folder, $folderKey) use($folderMap, $root_folder) {
            $folder->folder_id = $root_folder->id;
            $folder->save();
            print('Folder: '.$folder->id.PHP_EOL);
            
            // Subfolders
            $subFolders = factory(App\Models\Folder::class, $folderMap[$folderKey]['folders'])->create();
            $subFolders->each(function($subFolder, $subFolderKey) use($folder, $folderKey, $folderMap) {
              $subFolder->folder_id = $folder->id;
              $subFolder->save();
              print('  Subfolder: '.$subFolder->id.PHP_EOL);
  
              // Files
    
              $files = factory(App\Models\File::class, $folderMap[$folderKey]['files'])->create();
              $files->each(function($file) use($subFolder) {
                $file->folder_id = $subFolder->id;
                $file->save();
                
                $fileTypes = ['CALENDAR', 'NOTE', 'TABLE'];
                $fileType = $fileTypes[array_rand($fileTypes, 1)];
    
                switch($fileType) {
                  case 'TABLE': 
                    print('  Table'.PHP_EOL);
                    // Tables
                    $tables = factory(App\Models\Table::class, 1)->create();
                    $tables->each(function($table) use ($file) {
  
                      $file->name = 'Table';
                      $file->type = 'TABLE';
                      $file->type_id = $table->id;
                      $file->save();
  
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
                    $notes->each(function($note) use ($file) {
                      $file->name = 'Note';
                      $file->type = 'NOTE';
                      $file->type_id = $note->id;
                      $file->save();
                    });
                  break;
                    
                  case 'CALENDAR':   
                    print('  Calendar'.PHP_EOL);            
                    // Calendars
                    $calendars = factory(App\Models\Calendar::class, 1)->create();
                    $calendars->each(function($calendar) use ($file) {
                      $file->name = 'Calendar';
                      $file->type = 'CALENDAR';
                      $file->type_id = $calendar->id;
                      $file->save();
                    });
                  break;
                }
              });
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
