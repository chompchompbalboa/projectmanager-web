<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Table extends Model
{
  /**
   * Build custom attributes
   */
  protected $appends = ['rows', 'structure'];
  
  /**
   * Get the project this table belongs to
   */
  public function project() {
    return $this->belongsTo('App\Models\Project');
  }
  
  /**
   * Get all the rows that belong to this table
   */
  public function rows() {
    return $this->hasMany('App\Models\Row');
  }
  public function getRowsAttribute() {
    return $this->rows()->get();
  
  /**
   * Get all the structures that belong to this table
   */
  public function structures() {
    return $this->hasMany('App\Models\Structure');
  }
  public function getStructuresAttribute() {
    return $this->structures()->get();
  }
}