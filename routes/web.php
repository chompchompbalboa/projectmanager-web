<?php
//-----------------------------------------------------------------------------
// Use
//-----------------------------------------------------------------------------

use Illuminate\Support\Facades\Auth;

use App\Models\View;

//-----------------------------------------------------------------------------
// App
//-----------------------------------------------------------------------------
Route::prefix('app')->group(function () {

  Route::get('/', function () {
    $user = Auth::loginUsingId(1, true);
    $view = View::find($user->view()->first()->id);
    return view('app')->with([
      'activeContent' => $view->activeContent,
      'organizationId' => $user->organization()->first()->id,
      'userId' => $user->id
    ]);
  });

  Route::get('organizations/{organization}/projects', 'OrganizationController@projects');
  Route::get('organizations/{organization}/tables', 'OrganizationController@tables');
  
  Route::patch('/view', 'ViewController@updateView');

  Route::resources([
    'breakdowns' => 'BreakdownController',
    'cells' => 'CellController',
    'columns' => 'ColumnController',
    'formulas' => 'FormulaController',
    'rows' => 'RowController',
    'tables' => 'TableController',
  ]);
});

//-----------------------------------------------------------------------------
// Site
//-----------------------------------------------------------------------------
Route::get('/', function () {
  return view('site');
});

//-----------------------------------------------------------------------------
// Authentication
//-----------------------------------------------------------------------------
Auth::routes();