<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TableColumn extends Model
{
  use Traits\UsesUuid;

  /**
   * Define which attributes will be visible
   */
  protected $visible = ['id', 'tableId', 'name', 'position', 'width', 'type'];
  protected $fillable = ['id', 'tableId', 'name', 'position', 'width', 'type'];
  protected $appends = [ 'tableId' ];

  public function getTableIdAttribute() {
    return $this->attributes['table_id'];
  }
  public function setTableIdAttribute($value) {
    $this->attributes['table_id'] = $value;
  }
  
  /**
   * Get the table this row belongs to
   */
  public function table() {
    return $this->belongsTo('App\Models\Table');
  }
  
}