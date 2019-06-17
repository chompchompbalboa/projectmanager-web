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

        // Root Folder
        $rootFolder = factory(App\Models\Folder::class, 1)->create();
        $rootFolder->each(function($root_folder) use($organization) {
          $organization->folder_id = $root_folder->id;
          $organization->save();

          $root_folder->name = $organization->name."'s files";
          $root_folder->save();

          // Folders
          $folderMap = [
            ['folders' => 3, 'files' => 3],
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
                
                $fileTypes = ['CALENDAR', 'NOTE', 'SHEET'];
                $fileType = $fileTypes[array_rand($fileTypes, 1)];
    
                switch($fileType) {
                  case 'SHEET': 
                    print('  Sheet'.PHP_EOL);
                    // Sheets
                    $sheets = factory(App\Models\Sheet::class, 1)->create();
                    $sheets->each(function($sheet) use ($file) {
  
                      $file->name = 'Sheet';
                      $file->type = 'SHEET';
                      $file->type_id = $sheet->id;
                      $file->save();
  
                      // Columns
  
                      $columns = factory(App\Models\SheetColumn::class, 3)->create();
                      $columns->each(function($column, $key) use ($sheet) {
                        $column->sheet_id = $sheet->id;
                        $column->position = $key;
                        $column->save();
                      });
  
                      // Rows
  
                      $rows = factory(App\Models\SheetRow::class, 10)->create();
                      $rows->each(function($row) use($columns, $sheet) {
                        $row->sheet_id = $sheet->id;
                        $row->save();
  
                        // Cells
  
                        $columns->each(function($column) use($row, $sheet) {
                          $cell = factory(App\Models\SheetCell::class)->create();
                          $cell->sheet_id = $sheet->id;
                          $cell->sheet_row_id = $row->id;
                          $cell->sheet_column_id = $column->id;
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
      });
    }
}
