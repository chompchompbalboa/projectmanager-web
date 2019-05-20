<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Folder extends Model
{
  public $incrementing = false;
  /**
   * Define which attributes will be visible
   */
  protected $appends = ['folders', 'modules'];
  protected $visible = ['id', 'name', 'folders', 'modules'];

  /**
   * Define which attributes will be mass assignable
   */
  protected $fillable = ['id', 'name'];

  /**
   * Get the folder this folder belongs to
   */
  public function folder() {
    return $this->belongsTo('App\Models\Folder', 'folder_id');
  }
  
  /**
   * Get all the folders that belong to this folder
   */
  public function folders() {
    return $this->hasMany('App\Models\Folder', 'folder_id');
  }
  public function getFoldersAttribute() {
    return $this->folders()->get();
  }
  
  /**
   * Get all the modules that belong to this folder
   */
  public function modules() {
    return $this->hasMany('App\Models\Module');
  }
  public function getModulesAttribute() {
    return $this->modules()->get();
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
}