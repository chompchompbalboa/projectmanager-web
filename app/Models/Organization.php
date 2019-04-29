<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Organization extends Model
{
  /**
   * Define which attributes will be visible
   */
  protected $visible = ['id', 'name'];
  
  public function dropdowns() {
    return $this->hasMany('App\Models\Dropdown')->where('project_id', null);
  }
  
  public function users() {
    return $this->hasMany('App\Models\User');
  }
  
  public function containers() {
    return $this->hasMany('App\Models\Container');
  }
}