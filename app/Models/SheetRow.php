<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SheetRow extends Model
{
  use Traits\UsesUuid;

  /**
   * Define which attributes will be visible
   */
  protected $visible = ['id', 'sheetId', 'cells'];
  protected $with = ['cells'];

  /**
   * Define which attributes will be mass assignable
   */
  protected $fillable = ['id', 'sheetId'];

  /**
   * Rename sheet columns from snake case to camel case
   */
  protected $appends = [ 'sheetId' ];
  public function getSheetIdAttribute() {
    return $this->attributes['sheet_id'];
  }
  public function setSheetIdAttribute($value) {
    $this->attributes['sheet_id'] = $value;
  }
  
  /**
   * Get all the cells that belong to this row
   */
  public function cells() {
    return $this->hasMany('App\Models\SheetCell');
  }
}