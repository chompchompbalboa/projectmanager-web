<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use App\Models\Table;
use App\Http\Controllers\TableController;

class Module extends Model
{
  public $incrementing = false;
  /**
   * Define which attributes will be visible
   */
  protected $visible = ['id', 'name', 'type', 'typeId'];

  /**
   * Define which attributes will be mass assignable
   */
  protected $fillable = ['type', 'type_id', 'name'];

  /**
   * Custom attributes
   */
  protected $appends = ['typeId'];

  /**
   * Rename table columns from snake case to camel case
   */
  public function getTypeIdAttribute() {
    return $this->attributes['type_id'];
  }
  public function setTypeIdAttribute($value) {
    $this->attributes['type_id'] = $value;
  }
  
  /**
   * Get all the folder this module belongs to
   */
  public function folder() {
    return $this->belongsTo('App\Models\Folder');
  }
}