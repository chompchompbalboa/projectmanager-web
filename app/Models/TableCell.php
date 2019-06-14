<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TableCell extends Model
{
  use Traits\UsesUuid;

  /**
   * Define which attributes will be visible
   */
  protected $visible = ['id', 'tableId', 'columnId', 'rowId', 'value'];
  protected $fillable = ['id', 'tableId', 'columnId', 'rowId', 'value'];
  protected $appends = [ 'tableId', 'columnId', 'rowId' ];
  
  /**
   * Get the row this cell belongs to
   */
  public function row() {
    return $this->belongsTo('App\Models\TableRow');
  }

  
  public function getTableIdAttribute() {
    return $this->attributes['table_id'];
  }
  public function setTableIdAttribute($value) {
    $this->attributes['table_id'] = $value;
  }

  public function getColumnIdAttribute() {
    return $this->attributes['table_column_id'];
  }
  public function setColumnIdAttribute($value) {
    $this->attributes['table_column_id'] = $value;
  }

  public function getRowIdAttribute() {
    return $this->attributes['table_row_id'];
  }
  public function setRowIdAttribute($value) {
    $this->attributes['table_row_id'] = $value;
  }
}