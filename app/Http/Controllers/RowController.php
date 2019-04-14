<?php

namespace App\Http\Controllers;

use App\Models\Cell;
use App\Models\Row;
use Illuminate\Http\Request;

class RowController extends Controller
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
      $newRowInput = $request->input('newRow');
      $newRow = new Row;
      $newRow->table_id = $newRowInput['tableId'];
      if($newRow->save()) {
        $newCellInputs = $newRowInput['cells'];
        $newCellIds = [];
        foreach($newCellInputs as $newCellInput) {
          $newCell = new Cell;
          $newCell->table_id = $newCellInput['tableId'];
          $newCell->column_id = $newCellInput['columnId'];
          $newCell->row_id = $newRow->id;
          $newCell->string = $newCellInput['string'];
          $newCell->number = $newCellInput['number'];
          $newCell->boolean = $newCellInput['boolean'];
          $newCell->datetime = $newCellInput['datetime'];
          if($newCell->save()) {
            array_push($newCellIds, [
              'cellId' => $newCellInput['id'],
              'nextCellId' => $newCell->id,
            ]);
          }
        }
        return [
          'rowId' => $newRowInput['id'],
          'nextRowId' => $newRow->id,
          'nextCellIds' => $newCellIds,
        ];
      }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Row  $row
     * @return \Illuminate\Http\Response
     */
    public function show(Row $row)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Row  $row
     * @return \Illuminate\Http\Response
     */
    public function edit(Row $row)
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
    public function update(Request $request, Row $row)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Row  $row
     * @return \Illuminate\Http\Response
     */
    public function destroy(Row $row)
    {
      // Delete all of the cells
      $deletedCells = Cell::where('row_id', $row->id)->delete();
      return Row::destroy($row->id);
    }
}
