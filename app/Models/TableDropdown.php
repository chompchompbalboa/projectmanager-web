<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TableDropdown extends Model
{  
  /**
   * Define which attributes will be visible
   */
  protected $visible = ['id', 'organizationId', 'projectId', 'name', 'columnId'];

  /**
   * Build custom attributes
   */
  protected $appends = ['organizationId', 'projectId', 'columnId'];

  /**
   * Rename table columns from snake case to camel case
   */
  public function getOrganizationIdAttribute() {
    return $this->attributes['organization_id'];
  }
  public function getProjectIdAttribute() {
    return $this->attributes['project_id'];
  }
  public function getColumnIdAttribute() {
    return $this->attributes['column_id'];
  }
}