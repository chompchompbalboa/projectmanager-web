<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Models\Column;
use App\Models\Row;

class AppInitialData extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    { 
      if(Auth::attempt(['email' => 'rockye@dillonworks.com', 'password' => 'secret'])) {
        $user = Auth::user();
        $organization = $user->organization()->first();
        $project = $organization->projects()->first();
        $table = $project->tables()->first();
        $rows = Row::where('table_id', $table->id)->with('cells')->get();
        $columns = Column::where('table_id', $table->id)->get();

        return [
          'user' => $user,
          'organization' => $organization,
          'project' => $project,
          'table' => [
            'id' => $table->id,
            'name' => $table->name,
            'rows' => $rows,
            'columns' => $columns
          ]
        ];
      }
    }
}
