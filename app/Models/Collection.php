<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Collection extends Model
{
  /**
   * Define which attributes will be visible
   */
  protected $visible = ['id', 'name', 'tables'];
  
  /**
   * Build custom attributes
   */
  protected $appends = ['tables'];
  
  public function dropdowns() {
    return $this->hasMany('App\Models\Dropdown');
  }
  
  /**
   * Get the container the collection belongs to
   */
  public function container() {
    return $this->belongsTo('App\Models\Container');
  }
  
  /**
   * Get all the tables that belong to this project
   */
  public function tables() {
    return $this->hasMany('App\Models\Table');
  }
  
  public function getTablesAttribute() {
    return $this->tables()->get();
  }
}