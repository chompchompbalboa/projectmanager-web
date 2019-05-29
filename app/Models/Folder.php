<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Folder extends Model
{
  public $incrementing = false;
  /**
   * Define which attributes will be visible
   */
  protected $appends = ['folderId', 'folders', 'modules', 'userId'];
  protected $visible = ['id', 'name', 'folders', 'modules'];

  /**
   * Define which attributes will be mass assignable
   */
  protected $fillable = ['id', 'name', 'folderId', 'userId'];

  /**
   * Get the folder this folder belongs to
   */
  public function folder() {
    return $this->belongsTo('App\Models\Folder', 'folder_id');
  }
  public function setFolderIdAttribute($value) {
    $this->attributes['folder_id'] = $value;
  }
  
  /**
   * Get all the folders that belong to this folder
   */
  public function folders() {
    return $this->hasMany('App\Models\Folder', 'folder_id');
  }
  public function getFoldersAttribute() {
    return $this->folders()->orderBy('name')->get();
  }
  
  /**
   * Get all the modules that belong to this folder
   */
  public function modules() {
    return $this->hasMany('App\Models\Module');
  }
  public function getModulesAttribute() {
    return $this->modules()->orderBy('name')->get();
  }
  
  /**
   * Get the organization this folder belongs to
   */
  public function organization() {
    return $this->belongsTo('App\Models\Organization');
  }
  
  /**
   * Get the user this folder belongs to
   */
  public function user() {
    return $this->belongsTo('App\Models\User');
  }
  public function setUserIdAttribute($value) {
    $this->attributes['user_id'] = $value;
  }
}