<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Table extends Model
{
  /**
   * Define which attributes will be visible
   */
  protected $visible = ['id', 'name', 'breakdowns', 'columns'];

  /**
   * Build custom attributes
   */
  protected $appends = ['breakdowns', 'rows', 'columns'];
  
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
  }
  
  /**
   * Get all the breakdowns that belong to this table
   */
  public function breakdowns() {
    return $this->hasMany('App\Models\Breakdown');
  }
  public function getBreakdownsAttribute() {
    return $this->breakdowns()->get();
  }
  
  /**
   * Get all the columns that belong to this table
   */
  public function columns() {
    return $this->hasMany('App\Models\Column');
  }
  public function getColumnsAttribute() {
    return $this->columns()->get();
  }
}