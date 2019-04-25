<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Container extends Model
{
  /**
   * Define which attributes will be visible
   */
  protected $visible = ['id', 'name', 'icon', 'collections'];
  
  /**
   * Build custom attributes
   */
  protected $appends = ['collections'];
  
  /**
   * Get the organization the container belongs to
   */
  public function container() {
    return $this->belongsTo('App\Models\Organization');
  }
  
  /**
   * Get all the collections that belong to this container
   */
  public function collections() {
    return $this->hasMany('App\Models\Collection');
  }
  
  public function getCollectionsAttribute() {
    return $this->collections()->get();
  }
}