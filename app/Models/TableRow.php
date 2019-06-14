<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TableRow extends Model
{
  use Traits\UsesUuid;

  /**
   * Define which attributes will be visible
   */
  protected $visible = ['id', 'tableId', 'cells'];
  protected $with = ['cells'];

  /**
   * Define which attributes will be mass assignable
   */
  protected $fillable = ['id', 'tableId'];

  /**
   * Rename table columns from snake case to camel case
   */
  protected $appends = [ 'tableId' ];
  public function getTableIdAttribute() {
    return $this->attributes['table_id'];
  }
  public function setTableIdAttribute($value) {
    $this->attributes['table_id'] = $value;
  }
  
  /**
   * Get all the cells that belong to this row
   */
  public function cells() {
    return $this->hasMany('App\Models\TableCell');
  }
}