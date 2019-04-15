<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class ViewController extends Controller
{

  /**
   * Update the view parameters
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function updateView(Request $request) 
  {
    $user = Auth::user();
    $user->active_left_column_width = $request->input('nextLeftColumnWidth');
    if($user->save()) {
      return [
        'success' => true
      ];
    }
  }
}
