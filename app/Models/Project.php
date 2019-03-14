<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
  /**
   * Define which attributes will be visible
   */
  protected $visible = ['id', 'unique_code', 'name', 'tables'];
  
  /**
   * Build custom attributes
   */
  protected $appends = ['tables'];
  
  /**
   * Get the organization the user belongs to
   */
  public function organization() {
    return $this->belongsTo('App\Models\Organization');
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