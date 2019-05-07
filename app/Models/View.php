<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class View extends Model
{
  /**
   * Define which attributes will be visible
   */
  protected $visible = ['id', 'name'];

  /**
   * Define which attributes will be mass assignable
   */
  protected $fillable = ['name'];
  
  /**
   * Get the collections the view belongs to
   */
  public function collections() {
    return $this->belongsToMany('App\Models\Collection');
  }
  
  /**
   * Get all the modules that belong to this view
   */
  public function modules() {
    return $this->belongsToMany('App\Models\Module');
  }
}