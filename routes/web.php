<?php
//-----------------------------------------------------------------------------
// Use
//-----------------------------------------------------------------------------

use Illuminate\Support\Facades\Auth;

use App\Models\Container;
use App\Models\View;

//-----------------------------------------------------------------------------
// App
//-----------------------------------------------------------------------------
Route::prefix('app')->group(function () {

  Route::get('/', function () {
    $user = Auth::loginUsingId(1, true);
    $view = $user->view();
    $organization = $user->organization();
    return view('app')->with([
      'activeContainerId' => $view->container_id,
      'containers' => $organization->containers(),
      'organizationId' => $organization->id
    ]);
  });

  Route::get('organizations/{organization}/containers', 'OrganizationController@containers');
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