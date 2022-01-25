<?php

use App\Http\Controllers\MemoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// メモ全件取得
Route::get('/memos', [MemoController::class, 'fetch']);

// メモ登録
Route::post('/memos', [MemoController::class, 'create']);
