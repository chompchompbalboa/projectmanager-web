<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cell extends Model
{
  /**
   * Define which attributes will be visible
   */
  protected $visible = ['id', 'table_id', 'column_id', 'row_id', 'string', 'number', 'boolean', 'datetime'];
}