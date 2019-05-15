<?php

namespace App\Observers;

use App\Models\TableRow;

class TableRowObserver
{

    /**
     * Handle the tableRow "deleting" event.
     *
     * @param  \App\TableRow  $tableRow
     * @return void
     */
    public function deleting(TableRow $tableRow)
    {
      $tableRow->cells()->delete();
    }
}
