<?php

namespace App\Http\Controllers;

use App\Models\TableCell;
use App\Models\TableRow;
use Illuminate\Http\Request;

class TableRowController extends Controller
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
      $tableRow = TableRow::create($request->input('newRow'));
      foreach($request->input('newCells') as $newCell) {
        TableCell::create($newCell);
      }
      return response()->json($tableRow, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Row  $row
     * @return \Illuminate\Http\Response
     */
    public function show(TableRow $row)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Row  $row
     * @return \Illuminate\Http\Response
     */
    public function edit(TableRow $row)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Row  $row
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, TableRow $row)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Row  $row
     * @return \Illuminate\Http\Response
     */
    public function destroy(TableRow $row)
    {
      // Delete all of the cells
      $deletedCells = TableCell::where('table_row_id', $row->id)->delete();
      return TableRow::destroy($row->id);
    }
}
