<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


// App
Route::get('/app', function () {
  return view('app');
});

// Site
Route::get('/', function () {
  return view('site');
});

// Authentication
Auth::routes();