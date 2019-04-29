<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Collection extends Model
{
  /**
   * Define which attributes will be visible
   */
  protected $visible = ['id', 'name'];
  
  /**
   * Get the container the collection belongs to
   */
  public function container() {
    return $this->belongsToMany('App\Models\Container');
  }
  
  /**
   * Get the organization the collection belongs to
   */
  public function organization() {
    return $this->belongsTo('App\Models\Organization');
  }
  
  /**
   * Get all the views that belong to this collection
   */
  public function views() {
    return $this->belongsToMany('App\Models\View');
  }
}