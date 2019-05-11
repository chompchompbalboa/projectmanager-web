<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Module extends Model
{
  /**
   * Define which attributes will be visible
   */
  protected $visible = ['id', 'type', 'typeId', 'name'];

  /**
   * Define which attributes will be mass assignable
   */
  protected $fillable = ['type', 'type_id', 'name'];

  /**
   * Custom attributes
   */
  protected $appends = ['typeId'];

  /**
   * Rename table columns from snake case to camel case
   */
  public function getTypeIdAttribute() {
    return $this->attributes['type_id'];
  }
  
  /**
   * Get all the views this module belongs to
   */
  public function views() {
    return $this->belongsToMany('App\Models\View');
  }
}