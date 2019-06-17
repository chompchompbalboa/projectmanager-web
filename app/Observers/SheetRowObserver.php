<?php

namespace App\Observers;

use App\Models\SheetRow;

class SheetRowObserver
{

    /**
     * Handle the sheetRow "deleting" event.
     *
     * @param  \App\SheetRow  $sheetRow
     * @return void
     */
    public function deleting(SheetRow $sheetRow)
    {
      $sheetRow->cells()->delete();
    }

    /**
     * Handle the sheet "replicating" event.
     *
     * @param  \App\Sheet  $sheet
     * @return void
     */
    public function replicating(Sheet $sheet)
    {
      // Replicate cells
    }
}
