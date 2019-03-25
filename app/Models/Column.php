<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Column extends Model
{
  /**
   * Define which attributes will be visible
   */
  protected $visible = ['id', 'header', 'position', 'width', 'defaultSortOrder', 'type'];

  /**
   * Rename table columns from snake case to camel case
   */
  protected $appends = [ 'defaultSortOrder' ];
  public function getDefaultSortOrderAttribute() {
    return $this->attributes['default_sort_order'];
  }
  
}