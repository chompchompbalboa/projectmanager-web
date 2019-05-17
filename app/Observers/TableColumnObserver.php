<?php

namespace App\Observers;

use App\Models\TableColumn;

class TableColumnObserver
{

    /**
     * Handle the tableColumn "deleting" event.
     *
     * @param  \App\TableColumn  $tableColumn
     * @return void
     */
    public function deleting(TableColumn $tableColumn)
    {
      $tableColumn->cells()->delete();
    }
}
