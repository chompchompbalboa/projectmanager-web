<?php

namespace App\Observers;

use App\Models\Table;

class TableObserver
{

    /**
     * Handle the table "replicating" event.
     *
     * @param  \App\Table  $table
     * @return void
     */
    public function replicating(Table $table)
    {
    }
}
