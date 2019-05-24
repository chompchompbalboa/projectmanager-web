<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Module extends Model
{
  public $incrementing = false;
  /**
   * Define which attributes will be visible
   */
  protected $visible = ['id', 'name', 'folderId', 'type', 'typeId'];

  /**
   * Define which attributes will be mass assignable
   */
  protected $fillable = ['id', 'name', 'folderId', 'type', 'typeId'];

  /**
   * Custom attributes
   */
  protected $appends = ['folderId', 'typeId'];

  /**
   * Rename table columns from snake case to camel case
   */
  public function getTypeIdAttribute() {
    return $this->attributes['type_id'];
  }
  public function setTypeIdAttribute($value) {
    $this->attributes['type_id'] = $value;
  }
  
  /**
   * Get all the folder this module belongs to
   */
  public function folder() {
    return $this->belongsTo('App\Models\Folder');
  }
  public function getFolderIdAttribute() {
    return $this->attributes['folder_id'];
  }
  public function setFolderIdAttribute($value) {
    $this->attributes['folder_id'] = $value;
  }
}