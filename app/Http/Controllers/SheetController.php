<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

use App\Models\File;
use App\Models\SheetCell;
use App\Models\SheetColumn;
use App\Models\SheetRow;
use App\Models\Sheet;

class SheetController extends Controller
{
    /**
     * Copy the resource
     *
     * @return \Illuminate\Http\Response
     */
    public static function copy($sheetToCopyId, $folderId, $newFileParameters)
    {
      $newFile = File::create($newFileParameters);
      $newFile->folderId = $folderId;
      $newFile->save();

      $sheetToCopy = Sheet::find($sheetToCopyId);
      $newSheet = $sheetToCopy->replicate();
      $newSheet->id = $newFile->typeId;
      $newSheet->save();
      $columnIdsMap = [];
      foreach($sheetToCopy->columns as $column) {
        $newColumn = $column->replicate();
        $newColumn->sheetId = $newSheet->id;
        $newColumn->save();
        $columnIdsMap[$column->id] = $newColumn->id;
      }
      foreach($sheetToCopy->rows as $row) {
        $newRow = $row->replicate();
        $newRow->sheetId = $newSheet->id;
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
      $sheetToCopyId = $request->input('fileToCopyId');
      $pasteFolderId = $request->input('pasteFolderId');
      $newFileParameters = $request->input('newFile');
      $this->copy($sheetToCopyId, $pasteFolderId, $newFileParameters);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
      return Sheet::create($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Sheet  $sheet
     * @return \Illuminate\Http\Response
     */
    public static function show(Sheet $sheet)
    {
      $columns = SheetColumn::where('sheet_id', $sheet->id)->get();
      $rows = SheetRow::where('sheet_id', $sheet->id)->get();
      return [
        'id' => $sheet->id,
        'name' => $sheet->name,
        'columns' => $columns,
        'rows' => $rows
      ];
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Sheet  $sheet
     * @return \Illuminate\Http\Response
     */
    public function edit(Sheet $sheet)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Sheet  $sheet
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Sheet $sheet)
    {
      $sheet->update($request->all());
      return response()->json($sheet, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Sheet  $sheet
     * @return \Illuminate\Http\Response
     */
    public function destroy(Sheet $sheet)
    {
      $rowsToDelete = SheetRow::where('sheet_id', $sheet->id)->get();
      foreach($rowsToDelete as $rowToDelete) {
        SheetCell::where('sheet_row_id', $rowToDelete->id)->delete();
        SheetRow::destroy($rowToDelete->id);
      }
      SheetColumn::where('sheet_id', $sheet->id)->delete();
      return Sheet::destroy($sheet->id);
    }
}
