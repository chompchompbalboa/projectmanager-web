<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Active extends Model
{  
  /**
   * Define which attributes will be visible
   */
  protected $visible = ['id', 'containerId', 'projectId', 'tableId', 'breakdownId'];

  /**
   * Build custom attributes
   */
  protected $appends = ['containerId', 'projectId', 'tableId', 'breakdownId'];

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
}