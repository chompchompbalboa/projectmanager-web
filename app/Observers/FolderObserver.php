<?php

namespace App\Observers;

use App\Models\Folder;

class FolderObserver
{

    /**
     * Handle the folder "deleting" event.
     *
     * @param  \App\Folder  $folder
     * @return void
     */
    public function deleting(Folder $folder)
    {
      $deleteChildren = function($folderToDelete) use(&$deleteChildren) {
        $folderToDelete->modules()->delete();
        foreach($folderToDelete->folders()->get() as $subFolder) {
          $deleteChildren($subFolder);
          $subFolder->delete();
        }
      };
      $deleteChildren($folder);
    }
}
