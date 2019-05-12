<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TableRow extends Model
{
  /**
   * Define which attributes will be visible
   */
  protected $visible = ['id', 'tableId', 'cells'];
  protected $with = ['cells'];

  /**
   * Rename table columns from snake case to camel case
   */
  protected $appends = [ 'tableId' ];
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
    return $this->hasMany('App\Models\TableCell');
  }
}