<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Formula extends Model
{ 
  /**
   * Define which attributes will be visible
   */
  protected $visible = ['id', 'breakdown_id', 'column_id', 'type', 'boolean', 'datetime', 'number', 'string'];
  
  /**
   * Get the project this table belongs to
   */
  public function breakdown() {
    return $this->belongsTo('App\Models\Breakdown');
  }
}