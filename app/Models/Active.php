<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Active extends Model
{  
  public $incrementing = false;
  /**
   * Define which attributes will be visible
   */
  protected $appends = ['openFolders', 'fileId'];
  protected $visible = ['id', 'openFolders', 'fileId'];

  /**
   * Define which attributes will be mass assignable
   */
  protected $fillable = ['openFolders', 'fileId'];
  
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
   * Get the active file id
   */
  public function getFileIdAttribute() {
    return $this->attributes['file_id'];
  }
  public function setFileIdAttribute($value) {
    $this->attributes['file_id'] = $value;
  }
}