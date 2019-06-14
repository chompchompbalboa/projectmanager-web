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
  protected $fillable = ['id'];
  protected $with = ['rows', 'columns'];
  
  /**
   * Get all the rows that belong to this table
   */
  public function rows() {
    return $this->hasMany('App\Models\TableRow');
  }
  
  /**
   * Get all the columns that belong to this table
   */
  public function columns() {
    return $this->hasMany('App\Models\TableColumn');
  }
}