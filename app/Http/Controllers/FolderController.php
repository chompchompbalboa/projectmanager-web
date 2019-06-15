<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;

use App\Http\Controllers\CalendarController;
use App\Http\Controllers\NoteController;
use App\Http\Controllers\TableController;

use App\Models\Folder;

class FolderController extends Controller
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
     * Copy the folder and its children
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function copyFromRequest(Request $request)
    {
      $rootFolderToCopyId = $request->input('folderToCopyId');
      $rootNewFolderId = $request->input('newFolderId');
      $rootNewFolderFolderId = $request->input('pasteFolderId');
      $newFolders = [];
      $newFiles = [];
      
      $copyFolder = function($folderToCopyId, $newFolderId, $newFolderFolderId) use(&$copyFolder) {
        $folderToCopy = Folder::find($folderToCopyId);
        $newFolder = $folderToCopy->replicate();
        $newFolder->id = $newFolderId;
        $newFolder->folderId = $newFolderFolderId;
        $newFolder->save();
        
        foreach($folderToCopy->files as $file) {
          $controllerMap = [
            'CALENDAR' => 'App\Http\Controllers\CalendarController',
            'NOTE' => 'App\Http\Controllers\NoteController',
            'TABLE' => 'App\Http\Controllers\TableController'
          ];
          $controller = $controllerMap[$file->type];
          $controller::copy($file->typeId, $newFolder->id, [
            'id' => Str::uuid()->toString(),
            'name' => $file->name,
            'type' => $file->type,
            'typeId' => Str::uuid()->toString()
          ]);
        }
        
        foreach($folderToCopy->folders as $folder) {
          $copyFolder($folder->id, Str::uuid()->toString(), $newFolder->id);
        }
      };
      
      $copyFolder($rootFolderToCopyId, $rootNewFolderId, $rootNewFolderFolderId);
      return Folder::find($rootNewFolderId);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
      return Folder::create($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Folder  $folder
     * @return \Illuminate\Http\Response
     */
    public function show(Folder $folder)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Folder  $folder
     * @return \Illuminate\Http\Response
     */
    public function edit(Folder $folder)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Folder  $folder
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Folder $folder)
    {
      $folder->update($request->all());
      return response()->json($folder, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Folder  $folder
     * @return \Illuminate\Http\Response
     */
    public function destroy(Folder $folder)
    {
      $folder->delete();
      return response()->json(null, 204);
    }
}
