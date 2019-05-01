<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Container extends Model
{
  /**
   * Define which attributes will be visible
   */
  protected $visible = ['id', 'name', 'icon', 'sidebarLocation'];

  /**
   * Custom attributes
   */
  protected $appends = ['sidebarLocation'];

  /**
   * Rename table columns from snake case to camel case
   */
  public function getSidebarLocationAttribute() {
    return $this->attributes['sidebar_location'];
  }
  
  /**
   * Get all the collections that belong to this container
   */
  public function collections() {
    return $this->belongsToMany('App\Models\Collection');
  }
  
  /**
   * Get the organization the container belongs to
   */
  public function organization() {
    return $this->belongsTo('App\Models\Organization'); 
  }
  
  /**
   * Get the user the container belongs to
   */
  public function user() {
    return $this->belongsTo('App\Models\User'); 
  }
}