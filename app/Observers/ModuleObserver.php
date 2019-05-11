<?php

namespace App\Observers;

use App\Models\Module;

class ModuleObserver
{

    /**
     * Handle the module "deleted" event.
     *
     * @param  \App\Module  $module
     * @return void
     */
    public function deleting(Module $module)
    {
      $module->views()->detach();
    }
}
