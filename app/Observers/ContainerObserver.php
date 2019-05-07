<?php

namespace App\Observers;

use App\Models\Container;

class ContainerObserver
{

    /**
     * Handle the container "deleting" event.
     *
     * @param  \App\Container  $container
     * @return void
     */
    public function deleting(Container $container)
    {
      $container->collections()->detach();
    }
}
