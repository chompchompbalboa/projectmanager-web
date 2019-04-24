<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

use App\Models\Cell;
use App\Models\Column;
use App\Models\Row;
use App\Models\Table;

class TableController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
      $newTable = new Table;
      $newTable->organization_id = $request->input('organizationId');
      $newTable->project_id = $request->input('projectId');
      if($newTable->save()) {
        // Add the first column to the table. If you make changes to the defaults
        // here, you also need to update the column defaults on the front end.
        $firstColumn = new Column;
        $firstColumn->table_id = $newTable->id;
        $firstColumn->position = 1;
        $firstColumn->width = 1;
        $firstColumn->type = 'STRING';
        if($firstColumn->save()) {
          $user = Auth::user();
          $user->active_project_id = $newTable->project_id;
          $user->active_table_id = $newTable->id;
          $user->save();
          return [
            'tableId' => $request->input('tableId'),
            'nextTableId' => $newTable->id,
            'firstColumnId' => $firstColumn->id
          ];
        }
      }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Table  $table
     * @return \Illuminate\Http\Response
     */
    public function show(Table $table)
    {
      $user = Auth::user();
      $user->active_project_id = $table->project_id;
      $user->active_table_id = $table->id;
      $user->save();
      $columns = Column::where('table_id', $table->id)->get();
      $rows = Row::where('table_id', $table->id)->get();
      return [
        'id' => $table->id,
        'name' => $table->name,
        'columns' => $columns,
        'rows' => $rows
      ];
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Table  $table
     * @return \Illuminate\Http\Response
     */
    public function edit(Table $table)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Table  $table
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Table $table)
    {      
      $table->name = $request->input('table')['name'];
      if ($table->save()) {
        return [
          "success" => true
        ];
      }
      else {
        return [
          "success" => false
        ];
      }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Table  $table
     * @return \Illuminate\Http\Response
     */
    public function destroy(Table $table)
    {
      $rowsToDelete = Row::where('table_id', $table->id)->get();
      foreach($rowsToDelete as $rowToDelete) {
        Cell::where('row_id', $rowToDelete->id)->delete();
        Row::destroy($rowToDelete->id);
      }
      Column::where('table_id', $table->id)->delete();
      return Table::destroy($table->id);
    }
}
