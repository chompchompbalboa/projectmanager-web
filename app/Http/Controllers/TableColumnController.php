<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\TableCell;
use App\Models\TableColumn;

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
      $newColumnInput = $request->input('newColumn');
      $newColumn = new TableColumn;
      $newColumn->table_id = $newColumnInput['tableId'];
      $newColumn->name = $newColumnInput['name'];
      $newColumn->position = $newColumnInput['position'];
      $newColumn->type = $newColumnInput['type'];
      $newColumn->width = $newColumnInput['width'];
      if ($newColumn->save()) {
        // Update the column positions for the table
        $columnPositions = $request->input('columnPositions');
        foreach ($columnPositions as $columnPosition) {
          $nextColumn = TableColumn::find($columnPosition['id']);
          if ($nextColumn) {
            $nextColumn->position = $columnPosition['position'];
            $nextColumn->save();
          }
        }
        // Get the new cell ids
        $rowIds = $request->input('rowIds');
        $newCellIds = [];
        foreach($rowIds as $rowId) {
          $newCell = new TableCell;
          $newCell->table_id = $newColumnInput['tableId'];
          $newCell->table_column_id = $newColumn->id;
          $newCell->table_row_id = $rowId;
          $newCell->string = null;
          $newCell->number = null;
          $newCell->boolean = null;
          $newCell->datetime = null;
          if($newCell->save()) {
            array_push($newCellIds, [
              'rowId' =>  $rowId,
              'nextCellId' => $newCell->id,
            ]);
          }
        }
        return [
          'columnId' => $newColumnInput['id'],
          'nextColumnId' => $newColumn->id,
          'nextCellIds' => $newCellIds
        ];
      }
      else {
        return [
          "success" => false
        ];
      }
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
      $column->width = $request->input('column')['width'];
      $column->name = $request->input('column')['name'];
      $column->position = $request->input('column')['position'];
      $column->type = $request->input('column')['type'];
      if ($column->save()) {
        return $column;
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
     * @param  \App\Column  $column
     * @return \Illuminate\Http\Response
     */
    public function destroy(TableColumn $column)
    {
      // Delete all of the cells
      $deletedRows = TableCell::where('table_column_id', $column->id)->delete();
      return TableColumn::destroy($column->id);
    }
}
