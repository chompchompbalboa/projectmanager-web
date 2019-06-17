<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SheetCell extends Model
{
  use Traits\UsesUuid;

  /**
   * Define which attributes will be visible
   */
  protected $visible = ['id', 'sheetId', 'columnId', 'rowId', 'value'];
  protected $fillable = ['id', 'sheetId', 'columnId', 'rowId', 'value'];
  protected $appends = [ 'sheetId', 'columnId', 'rowId' ];
  
  /**
   * Get the row this cell belongs to
   */
  public function row() {
    return $this->belongsTo('App\Models\SheetRow', 'sheet_row_id');
  }

  
  public function getSheetIdAttribute() {
    return $this->attributes['sheet_id'];
  }
  public function setSheetIdAttribute($value) {
    $this->attributes['sheet_id'] = $value;
  }

  public function getColumnIdAttribute() {
    return $this->attributes['sheet_column_id'];
  }
  public function setColumnIdAttribute($value) {
    $this->attributes['sheet_column_id'] = $value;
  }

  public function getRowIdAttribute() {
    return $this->attributes['sheet_row_id'];
  }
  public function setRowIdAttribute($value) {
    $this->attributes['sheet_row_id'] = $value;
  }
}