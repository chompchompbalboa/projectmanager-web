<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Column extends Model
{
  /**
   * Define which attributes will be visible
   */
  protected $visible = ['id', 'header', 'position', 'width', 'default_sort_order', 'type'];
  
}