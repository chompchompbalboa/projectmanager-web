<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Table;
use App\Models\TableCell;
use App\Models\TableColumn;
use App\Models\TableRow;

class TableColumnController extends Controller
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
      $tableColumn = TableColumn::create($request->input('newColumn'));
      foreach($request->input('newCells') as $newCell) {
        TableCell::create($newCell);
      }
      return response()->json($tableColumn, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Column  $column
     * @return \Illuminate\Http\Response
     */
    public function show(TableColumn $column)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Column  $column
     * @return \Illuminate\Http\Response
     */
    public function edit(TableColumn $column)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Column  $column
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, TableColumn $column)
    {
      $column->update($request->all());
      return response()->json($column, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Column  $column
     * @return \Illuminate\Http\Response
     */
    public function destroy(TableColumn $column)
    {
      // Delete all of the cells
      TableCell::where('table_column_id', $column->id)->delete();
      // If deleting the table's only column, delete any rows as well
      $columnCount = Table::where('id', $column->tableId)->first()->columns()->count();
      if($columnCount === 1) {
        TableRow::where('table_id', $column->tableId)->delete();
      }
      return TableColumn::destroy($column->id);
    }
}
