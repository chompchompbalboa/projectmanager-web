<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;
  
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];
  
    /**
     * The attributes that should be hidden for arrays.
     * @var array
     */
    protected $hidden = [
      'created_at', 'password', 'remember_token', 'updated_at'
    ];
  
    /**
     * Get the organization the user belongs to
     */
    public function organization() {
      return $this->belongsTo('App\Models\Organization')->first();
    }
  
    /**
     * Get the view state for this user
     */
    public function view() {
      return $this->hasOne('App\Models\View')->first();
    }
    
}