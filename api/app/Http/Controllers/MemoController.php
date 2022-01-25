<?php

namespace App\Http\Controllers;

use App\Http\Requests\MemoPostRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class MemoController extends Controller
{
    /**
     * メモの全件取得
     * @return AnonymousResourceCollection
     */
    public function fetch(): AnonymousResourceCollection
    {
        // 処理
    }

    /**
     * メモの登録
     * @param MemoPostRequest $request
     * @return JsonResponse
     */
    public function create(MemoPostRequest $request): JsonResponse
    {
        // 処理
    }
}
