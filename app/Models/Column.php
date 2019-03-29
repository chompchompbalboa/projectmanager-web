<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Column extends Model
{
  /**
   * Define which attributes will be visible
   */
  protected $visible = ['id', 'tableId', 'header', 'position', 'width', 'defaultSortOrder', 'type'];

  /**
   * Rename table columns from snake case to camel case
   */
  protected $appends = [ 'defaultSortOrder', 'tableId' ];

  public function getDefaultSortOrderAttribute() {
    return $this->attributes['default_sort_order'];
  }

  public function getTableIdAttribute() {
    return $this->attributes['table_id'];
  }
  
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
  
}