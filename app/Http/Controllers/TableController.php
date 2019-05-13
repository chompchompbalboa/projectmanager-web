<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

use App\Models\TableCell;
use App\Models\TableColumn;
use App\Models\TableRow;
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
      $newTable->collection_id = $request->input('collectionId');
      if($newTable->save()) {
        // Add the first column to the table. If you make changes to the defaults
        // here, you also need to update the column defaults on the front end.
        $firstColumn = new TableColumn;
        $firstColumn->table_id = $newTable->id;
        $firstColumn->position = 1;
        $firstColumn->width = 1;
        $firstColumn->type = 'STRING';
        if($firstColumn->save()) {
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
      $rowsToDelete = TableRow::where('table_id', $table->id)->get();
      foreach($rowsToDelete as $rowToDelete) {
        TableCell::where('table_row_id', $rowToDelete->id)->delete();
        TableRow::destroy($rowToDelete->id);
      }
      TableColumn::where('table_id', $table->id)->delete();
      return Table::destroy($table->id);
    }
}
