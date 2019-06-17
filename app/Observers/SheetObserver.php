<?php

namespace App\Observers;

use App\Models\Sheet;

class SheetObserver
{

    /**
     * Handle the sheet "replicating" event.
     *
     * @param  \App\Sheet  $sheet
     * @return void
     */
    public function replicating(Sheet $sheet)
    {
    }
}
