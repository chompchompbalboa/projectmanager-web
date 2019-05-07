<?php

namespace App\Observers;

use App\Models\View;

class ViewObserver
{

    /**
     * Handle the view "deleted" event.
     *
     * @param  \App\View  $view
     * @return void
     */
    public function deleting(View $view)
    {
      $view->collections()->detach();
      $view->modules()->detach();
    }
}
