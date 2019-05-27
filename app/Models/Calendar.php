<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Calendar extends Model
{
  use Traits\UsesUuid;

  /**
   * Define which attributes will be visible
   */
  protected $visible = ['id'];
  protected $fillable = ['id'];
}