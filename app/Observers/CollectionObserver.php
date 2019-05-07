<?php

namespace App\Observers;

use App\Models\Collection;

class CollectionObserver
{

    /**
     * Handle the collection "deleting" event.
     *
     * @param  \App\Collection  $collection
     * @return void
     */
    public function deleting(Collection $collection)
    {
      $collection->container()->detach();
      $collection->views()->detach();
    }
}
