<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use Illuminate\Http\Resources\Json\JsonResource;

class LoginController extends Controller
{
    /**
     * ログイン
     * @param LoginRequest $request
     * @return JsonResource
     */
    public function login(LoginRequest $request): JsonResource
    {
        // 処理
    }
}
