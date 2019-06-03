<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Folder extends Model
{
  public $incrementing = false;
  /**
   * Define which attributes will be visible
   */
  protected $appends = ['folderId', 'folders', 'files', 'userId', 'organizationId'];
  protected $visible = ['id', 'name', 'folderId', 'folders', 'files', 'organizationId'];

  /**
   * Define which attributes will be mass assignable
   */
  protected $fillable = ['id', 'name', 'folderId', 'userId', 'organizationId'];

  /**
   * Get the folder this folder belongs to
   */
  public function folder() {
    return $this->belongsTo('App\Models\Folder', 'folder_id');
  }
  public function getFolderIdAttribute() {
    return $this->attributes['folder_id'];
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
   * Get all the files that belong to this folder
   */
  public function files() {
    return $this->hasMany('App\Models\File');
  }
  public function getFilesAttribute() {
    return $this->files()->orderBy('name')->get();
  }
  
  /**
   * Get the organization this folder belongs to
   */
  public function organization() {
    return $this->belongsTo('App\Models\Organization');
  }
  public function getOrganizationIdAttribute() {
    return $this->attributes['organization_id'];
  }
  public function setOrganizationIdAttribute($value) {
    $this->attributes['organization_id'] = $value;
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