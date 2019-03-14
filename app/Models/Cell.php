<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cell extends Model
{
  /**
   * Define which attributes will be visible
   */
  protected $visible = ['id', 'structure', 'payload'];
  
  /**
   * Build custom attributes
   */
  protected $appends = ['structure', 'payload'];
  
  /**
   * Get the row this cell belongs to
   */
  public function row() {
    return $this->belongsTo('App\Models\Row');
  }
  
  /**
   * Get all the cells that belong to this row
   */
  public function structure() {
    return $this->hasOne('App\Models\Structure');
  }
  public function getStructureAttribute() {
    return $this->cells()->first();
}