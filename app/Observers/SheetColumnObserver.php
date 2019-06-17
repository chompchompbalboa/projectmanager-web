<?php

namespace App\Observers;

use App\Models\SheetColumn;

class SheetColumnObserver
{

    /**
     * Handle the sheetColumn "deleting" event.
     *
     * @param  \App\SheetColumn  $sheetColumn
     * @return void
     */
    public function deleting(SheetColumn $sheetColumn)
    {
      $sheetColumn->cells()->delete();
    }
}
