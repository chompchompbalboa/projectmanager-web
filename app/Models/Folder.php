<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Folder extends Model
{
  public $incrementing = false;
  /**
   * Define which attributes will be visible
   */
  protected $appends = ['folderId', 'folders', 'files'];
  protected $visible = ['id', 'name', 'folderId', 'folders', 'files'];

  /**
   * Define which attributes will be mass assignable
   */
  protected $fillable = ['id', 'name', 'folderId'];

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
}