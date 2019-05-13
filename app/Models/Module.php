<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use App\Models\Table;
use App\Http\Controllers\TableController;

class Module extends Model
{
  /**
   * Define which attributes will be visible
   */
  protected $visible = ['id', 'name', 'type', 'typeId', 'payload'];

  /**
   * Define which attributes will be mass assignable
   */
  protected $fillable = ['type', 'type_id', 'name'];

  /**
   * Custom attributes
   */
  protected $appends = ['payload', 'typeId'];

  /**
   * Rename table columns from snake case to camel case
   */
  public function getTypeIdAttribute() {
    return $this->attributes['type_id'];
  }

  /**
   * Get the module's payload
   */
  public function getPayloadAttribute() {
    switch($this->attributes['type']) {
      case 'TABLE':
        return TableController::show(Table::find($this->attributes['type_id']));
      break;
    }
  }
  
  /**
   * Get all the views this module belongs to
   */
  public function views() {
    return $this->belongsToMany('App\Models\View');
  }
}