<?php

namespace App\Models\Traits;

trait DeepReplicates 
{
  public function replicate(?array $except = NULL){
    $copy = parent::replicate();
    $copy->push();

    foreach (parent::getRelations() as $relation => $items){
      foreach($items as $item){
        unset($item->id);
        $copy->{$relation}()->create($item->toArray());
      }
    }

    return $copy;
  }
}