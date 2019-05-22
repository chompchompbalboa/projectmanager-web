<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    public $incrementing = false;
  
    protected $appends = ['active'];
    protected $fillable = ['name', 'email', 'password'];
    protected $visible = ['id', 'name', 'email', 'active'];
  
    /**
     * Get the active state for this user
     */
    public function active() {
      return $this->hasOne('App\Models\Active');
    }
    public function getActiveAttribute() {
      return $this->active()->first();
    }
  
    /**
     * Get the folders for this user
     */
    public function folders() {
      return $this->hasMany('App\Models\Folder');
    }
  
    /**
     * Get the organization the user belongs to
     */
    public function organization() {
      return $this->belongsTo('App\Models\Organization');
    }
    
}