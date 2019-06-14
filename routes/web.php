<?php
//-----------------------------------------------------------------------------
// Use
//-----------------------------------------------------------------------------

use Illuminate\Support\Facades\Auth;

use App\Models\Active;
use App\Models\Collection;
use App\Models\Container;
use App\Models\View;

//-----------------------------------------------------------------------------
// App
//-----------------------------------------------------------------------------
Route::prefix('app')->group(function () {

  // Initial load
  Route::get('/', function () {

    $user = Auth::loginUsingId('75e3c4f9-b261-3343-a320-8ee9fb0c931e', true);
    $organization = $user->organization()->first();

    $userFolders = $user->folder()->get();
    $organizationFolders = $organization->folder()->get();
    $folders = $userFolders->merge($organizationFolders)->values()->all();
    
    return view('app')->with([
      'user' => $user,
      'organization' => $organization,
      'folders' => $folders
    ]);
  });

  // Copy
  Route::post('/tables/copy', 'TableController@copy');

  // Resource Controllers
  Route::resources([
    // Folders
    'folders' => 'FolderController',
    'files' => 'FileController',
    // Calendars
    'calendars' => 'CalendarController',
    // Notes
    'notes' => 'NoteController',
    // Table
    'tables' => 'TableController',
    'tables/breakdowns' => 'TableBreakdownController',
    'tables/cells' => 'TableCellController',
    'tables/columns' => 'TableColumnController',
    'tables/breakdowns/formulas' => 'TableBreakdownFormulaController',
    'tables/rows' => 'TableRowController'
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