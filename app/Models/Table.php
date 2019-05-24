<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Table extends Model
{
  use Traits\UsesUuid;

  /**
   * Define which attributes will be visible
   */
  protected $visible = ['id', 'rows', 'columns'];
  protected $appends = ['rows', 'columns'];
  protected $fillable = ['id'];
  
  /**
   * Get all the rows that belong to this table
   */
  public function rows() {
    return $this->hasMany('App\Models\TableRow');
  }
  public function getRowsAttribute() {
    return $this->rows()->get();
  }
  
  /**
   * Get all the columns that belong to this table
   */
  public function columns() {
    return $this->hasMany('App\Models\TableColumn');
  }
  public function getColumnsAttribute() {
    return $this->columns()->get();
  }
}