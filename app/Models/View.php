<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class View extends Model
{  
  /**
   * Define which attributes will be visible
   */
  protected $visible = ['id', 'activeContent', 'activeProjectId', 'activeTableId', 'activeBreakdownId', 'activeLeftColumnWidth'];

  /**
   * Build custom attributes
   */
  protected $appends = ['activeContent', 'activeProjectId', 'activeTableId', 'activeBreakdownId', 'activeLeftColumnWidth'];

  /**
   * Rename table columns from snake case to camel case
   */
  public function getActiveContentAttribute() {
    return $this->attributes['active_content'];
  }
  public function getActiveProjectIdAttribute() {
    return $this->attributes['active_project_id'];
  }
  public function getActiveTableIdAttribute() {
    return $this->attributes['active_table_id'];
  }
  public function getActiveBreakdownIdAttribute() {
    return $this->attributes['active_breakdown_id'];
  }
  public function getActiveLeftColumnWidthAttribute() {
    return $this->attributes['active_left_column_width'];
  }
}