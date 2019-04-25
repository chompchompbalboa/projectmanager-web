<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class View extends Model
{  
  /**
   * Define which attributes will be visible
   */
  protected $visible = ['id', 'containerId', 'projectId', 'tableId', 'breakdownId', 'leftColumnWidth'];

  /**
   * Build custom attributes
   */
  protected $appends = ['containerId', 'projectId', 'tableId', 'breakdownId', 'leftColumnWidth'];

  /**
   * Rename table columns from snake case to camel case
   */
  public function getContainerIdAttribute() {
    return $this->attributes['container_id'];
  }
  public function getProjectIdAttribute() {
    return $this->attributes['project_id'];
  }
  public function getTableIdAttribute() {
    return $this->attributes['table_id'];
  }
  public function getBreakdownIdAttribute() {
    return $this->attributes['breakdown_id'];
  }
  public function getLeftColumnWidthAttribute() {
    return $this->attributes['left_column_width'];
  }
}