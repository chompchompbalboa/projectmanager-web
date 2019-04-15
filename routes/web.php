<?php
//-----------------------------------------------------------------------------
// Use
//-----------------------------------------------------------------------------

use Illuminate\Support\Facades\Auth;

use App\Models\Project;
use App\Models\Table;
use App\Models\Row;
use App\Models\Column;
use App\Models\Cell;

//-----------------------------------------------------------------------------
// App
//-----------------------------------------------------------------------------
Route::prefix('app')->group(function () {

  Route::get('/', function () {
    $user = Auth::loginUsingId(1, true);
    return view('app')->with([
      'organizationId' => $user->organization()->first()->id,
      'userId' => $user->id
    ]);
  });

  Route::get('organizations/{organization}/projects', 'OrganizationController@projects');
  
  Route::patch('/view', 'ViewController@updateView');

  Route::resources([
    'cells' => 'CellController',
    'columns' => 'ColumnController',
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