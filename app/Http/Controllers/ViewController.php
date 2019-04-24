<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

use App\Models\View;

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
    $view = View::find($user->view()->first()->id);
    $view->active_left_column_width = $request->input('nextLeftColumnWidth');
    if($view->save()) {
      return [
        'success' => true
      ];
    }
  }
}
