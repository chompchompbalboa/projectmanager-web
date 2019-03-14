<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Organization extends Model
{
  /**
   * Define which attributes will be visible
   */
  protected $visible = ['id', 'users', 'name', 'projects'];
  
  /**
   * Build custom attributes
   */
  protected $appends = ['users'];
  
  
  public function users() {
    return $this->hasMany('App\Models\User');
  }
  public function getUsersAttribute() {
    return $this->users()->get();
  }
  
  public function projects() {
    return $this->hasMany('App\Models\Project');
  }
  public function getProjectAttribute() {
    return $this->projects()->get();
  }
  
}