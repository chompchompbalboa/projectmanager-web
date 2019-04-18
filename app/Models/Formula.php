<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Formula extends Model
{ 
  /**
   * Define which attributes will be visible
   */
  protected $visible = ['id', 'breakdownId', 'columnId', 'type', 'boolean', 'datetime', 'number', 'string'];

  /**
   * Rename table columns from snake case to camel case
   */
  protected $appends = [ 'breakdownId', 'columnId' ];
  public function getColumnIdAttribute() {
    return $this->attributes['column_id'];
  }
  public function getBreakdownIdAttribute() {
    return $this->attributes['breakdown_id'];
  }
  
  /**
   * Get the project this table belongs to
   */
  public function breakdown() {
    return $this->belongsTo('App\Models\Breakdown');
  }
}