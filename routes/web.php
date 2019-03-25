<?php
//-----------------------------------------------------------------------------
// Use
//-----------------------------------------------------------------------------
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
    return view('app')->with([
      'organizationId' => 1,
      'userId' => 1
    ]);
  });

  Route::get('organizations/{organization}/projects', 'OrganizationController@projects');

  Route::resources([
    'cells' => 'CellController',
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