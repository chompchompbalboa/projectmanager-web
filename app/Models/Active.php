<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Active extends Model
{  
  public $incrementing = false;
  /**
   * Define which attributes will be visible
   */
  protected $appends = ['openFolders', 'moduleId'];
  protected $visible = ['id', 'openFolders', 'moduleId'];

  /**
   * Define which attributes will be mass assignable
   */
  protected $fillable = ['openFolders', 'moduleId'];
  
  /**
   * Get the user this active belongs to
   */
  public function user() {
    return $this->belongsTo('App\Models\User');
  }
  
  /**
   * Get the open folders
   */
  public function getOpenFoldersAttribute() {
    return $this->attributes['open_folders'];
  }
  public function setOpenFoldersAttribute($value) {
    $this->attributes['open_folders'] = $value;
  }
  
  /**
   * Get the active module id
   */
  public function getModuleIdAttribute() {
    return $this->attributes['module_id'];
  }
  public function setModuleIdAttribute($value) {
    $this->attributes['module_id'] = $value;
  }
}