<?php

namespace App\Http\Controllers;

use App\Models\Column;
use Illuminate\Http\Request;

class ColumnController extends Controller
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
      $newColumn = new Column;
      $newColumn->table_id = $newColumnInput['tableId'];
      $newColumn->name = $newColumnInput['name'];
      $newColumn->required = $newColumnInput['required'];
      $newColumn->position = $newColumnInput['position'];
      $newColumn->type = $newColumnInput['type'];
      $newColumn->default_sort_order = $newColumnInput['defaultSortOrder'];
      $newColumn->width = $newColumnInput['width'];
      if ($newColumn->save()) {
        $newCellInputs = $request->input('cells');
        $newCellIds = [];
        foreach($newCellInputs as $newCellInput) {
          $newCell = new Cell;
          $newCell->table_id = $newCellInput['tableId'];
          $newCell->column_id = $newCellInput['columnId'];
          $newCell->row_id = $newCellInput['rowId'];
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
          'columnId' => $newColumnInput['id'],
          'nextColumnId' => $newColumn->id,
          'newCellIds' => $newCellIds
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
    public function show(Column $column)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Column  $column
     * @return \Illuminate\Http\Response
     */
    public function edit(Column $column)
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
    public function update(Request $request, Column $column)
    {
      $nextWidth = $request->input('column')['width'];
      $column->width = $nextWidth;
      $nextName = $request->input('column')['name'];
      $column->name = $nextName;
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
    public function destroy(Column $column)
    {
        //
    }
}
