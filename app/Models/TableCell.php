<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TableCell extends Model
{
  /**
   * Define which attributes will be visible
   */
  protected $visible = ['id', 'tableId', 'columnId', 'rowId', 'string', 'number', 'boolean', 'datetime'];

  /**
   * Rename table columns from snake case to camel case
   */
  protected $appends = [ 'tableId', 'columnId', 'rowId' ];
  public function getTableIdAttribute() {
    return $this->attributes['table_id'];
  }
  public function getColumnIdAttribute() {
    return $this->attributes['table_column_id'];
  }
  public function getRowIdAttribute() {
    return $this->attributes['table_row_id'];
  }
}