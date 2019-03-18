<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Organization extends Model
{
  /**
   * Define which attributes will be visible
   */
  protected $visible = ['id', 'name'];
  
  
  public function users() {
    return $this->hasMany('App\Models\User');
  }
  
  public function projects() {
    return $this->hasMany('App\Models\Project');
  }
}