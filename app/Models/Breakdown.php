<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Breakdown extends Model
{  
  /**
   * Define which attributes will be visible
   */
  protected $visible = ['id', 'name', 'formulas'];
  
  /**
   * Build custom attributes
   */
  protected $appends = ['formulas'];
  
  /**
   * Get all the formulas that belong to this breakdown
   */
  public function formulas() {
    return $this->hasMany('App\Models\Formula');
  }
  public function getFormulasAttribute() {
    return $this->formulas()->get();
  }
}