<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Row extends Model
{
  /**
   * Define which attributes will be visible
   */
  protected $visible = ['id', 'table', 'cells'];
  
  /**
   * Build custom attributes
   */
  protected $appends = ['cells'];
  
  /**
   * Get the table this row belongs to
   */
  public function table() {
    return $this->belongsTo('App\Models\Table');
  }
  
  /**
   * Get all the cells that belong to this row
   */
  public function cells() {
    return $this->hasMany('App\Models\Cell');
  }
  public function getCellsAttribute() {
    return $this->cells()->get();
}