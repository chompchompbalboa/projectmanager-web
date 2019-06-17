<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SheetColumn extends Model
{
  use Traits\UsesUuid;

  /**
   * Define which attributes will be visible
   */
  protected $visible = ['id', 'sheetId', 'name', 'position', 'width', 'type'];
  protected $fillable = ['id', 'sheetId', 'name', 'position', 'width', 'type'];
  protected $appends = [ 'sheetId' ];

  public function getSheetIdAttribute() {
    return $this->attributes['sheet_id'];
  }
  public function setSheetIdAttribute($value) {
    $this->attributes['sheet_id'] = $value;
  }
  
  /**
   * Get the sheet this row belongs to
   */
  public function sheet() {
    return $this->belongsTo('App\Models\Sheet');
  }
  
}