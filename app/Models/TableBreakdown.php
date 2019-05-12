<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TableBreakdown extends Model
{  
  /**
   * Define which attributes will be visible
   */
  protected $visible = ['id', 'name', 'formulas'];

  /**
   * Build custom attributes
   */
  protected $appends = ['formulas', 'tableId'];

  /**
   * Rename table columns from snake case to camel case
   */
  public function getTableIdAttribute() {
    return $this->attributes['table_id'];
  }
  
  /**
   * Get all the formulas that belong to this breakdown
   */
  public function formulas() {
    return $this->hasMany('App\Models\TableBreakdownFormula');
  }
  public function getFormulasAttribute() {
    return $this->formulas()->get();
  }
}