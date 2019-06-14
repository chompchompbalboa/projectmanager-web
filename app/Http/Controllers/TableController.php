<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

use App\Models\File;
use App\Models\TableCell;
use App\Models\TableColumn;
use App\Models\TableRow;
use App\Models\Table;

class TableController extends Controller
{
    /**
     * Copy the resource
     *
     * @return \Illuminate\Http\Response
     */
    public static function copy($tableToCopyId, $folderId, $newFileParameters)
    {
      $newFile = File::create($newFileParameters);
      $newFile->folderId = $folderId;
      $newFile->save();

      $tableToCopy = Table::find($tableToCopyId);
      $newTable = $tableToCopy->replicate();
      $newTable->id = $newFile->typeId;
      $newTable->save();
      $columnIdsMap = [];
      foreach($tableToCopy->columns as $column) {
        $newColumn = $column->replicate();
        $newColumn->tableId = $newTable->id;
        $newColumn->save();
        $columnIdsMap[$column->id] = $newColumn->id;
      }
      foreach($tableToCopy->rows as $row) {
        $newRow = $row->replicate();
        $newRow->tableId = $newTable->id;
        $newRow->save();
        foreach($row->cells as $cell) {
          $newCell = $cell->replicate();
          $newCell->rowId = $newRow->id;
          $newCell->columnId = $columnIdsMap[$cell->columnId];
          $newCell->save();
        }
      }
    }

    /**
     * Copy the resource.from a request
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function copyFromRequest(Request $request)
    {
      $tableToCopyId = $request->input('fileToCopyId');
      $pasteFolderId = $request->input('pasteFolderId');
      $newFileParameters = $request->input('newFile');
      $this->copy($tableToCopyId, $pasteFolderId, $newFileParameters);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
      return Table::create($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Table  $table
     * @return \Illuminate\Http\Response
     */
    public static function show(Table $table)
    {
      $columns = TableColumn::where('table_id', $table->id)->get();
      $rows = TableRow::where('table_id', $table->id)->get();
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
      $table->update($request->all());
      return response()->json($table, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Table  $table
     * @return \Illuminate\Http\Response
     */
    public function destroy(Table $table)
    {
      $rowsToDelete = TableRow::where('table_id', $table->id)->get();
      foreach($rowsToDelete as $rowToDelete) {
        TableCell::where('table_row_id', $rowToDelete->id)->delete();
        TableRow::destroy($rowToDelete->id);
      }
      TableColumn::where('table_id', $table->id)->delete();
      return Table::destroy($table->id);
    }
}
