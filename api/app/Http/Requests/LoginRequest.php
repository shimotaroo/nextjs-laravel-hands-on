<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'email' => ['required', 'email:rfc'],
            'password' => ['required', 'regex:regex:/\A([a-zA-Z0-9]{8,})+\z/u']
        ];
    }

    public function messages()
    {
        return [
            'required' => '必須入力です。',
            'email.email' => '有効なメールアドレスを入力してください。',
            'password.regex' => '8文字以上の半角英数字で入力してください',
        ];

    }
}
