import type { NextPage } from 'next';
import { AxiosError, AxiosResponse } from 'axios';
import { ChangeEvent, useState } from 'react';
import { RequiredMark } from '../components/RequiredMark';
import { axiosApi } from '../lib/axios';
import { useRouter } from 'next/router';

// POSTデータの型
type LoginForm = {
  email: string;
  password: string;
};

// バリデーションメッセージの型
type Validation = {
  email?: string;
  password?: string;
  loginFailed?: string;
};

const Home: NextPage = () => {
  // ルーター定義
  const router = useRouter();
  // state定義
  const [loginForm, setLoginForm] = useState<LoginForm>({
    email: '',
    password: '',
  });
  const [validation, setValidation] = useState<Validation>({});

  // POSTデータの更新
  const updateLoginForm = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  // ログイン
  const login = () => {
    // バリデーションメッセージの初期化
    setValidation({});

    axiosApi
      // CSRF保護の初期化
      .get('/sanctum/csrf-cookie')
      .then((res) => {
        // ログイン処理
        axiosApi
          .post('/login', loginForm)
          .then((response: AxiosResponse) => {
            console.log(response.data);
            router.push('/memos');
          })
          .catch((err: AxiosError) => {
            console.log(err.response);
            // バリデーションエラー
            if (err.response?.status === 422) {
              const errors = err.response?.data.errors;
              // state更新用のオブジェクトを別で定義
              const validationMessages: { [index: string]: string } =
                {} as Validation;
              Object.keys(errors).map((key: string) => {
                validationMessages[key] = errors[key][0];
              });
              // state更新用オブジェクトに更新
              setValidation(validationMessages);
            }
            if (err.response?.status === 500) {
              alert('システムエラーです！！');
            }
          });
      });
  };

  return (
    <div className='w-2/3 mx-auto py-24'>
      <div className='w-1/2 mx-auto border-2 px-12 py-16 rounded-2xl'>
        <h3 className='mb-10 text-2xl text-center'>ログイン</h3>
        <div className='mb-5'>
          <div className='flex justify-start my-2'>
            <p>メールアドレス</p>
            <RequiredMark />
          </div>
          <input
            className='p-2 border rounded-md w-full outline-none'
            name='email'
            value={loginForm.email}
            onChange={updateLoginForm}
          />
          {validation.email && (
            <p className='py-3 text-red-500'>{validation.email}</p>
          )}
        </div>
        <div className='mb-5'>
          <div className='flex justify-start my-2'>
            <p>パスワード</p>
            <RequiredMark />
          </div>
          <small className='mb-2 text-gray-500 block'>
            8文字以上の半角英数字で入力してください
          </small>
          <input
            className='p-2 border rounded-md w-full outline-none'
            name='password'
            type='password'
            value={loginForm.password}
            onChange={updateLoginForm}
          />
          {validation.password && (
            <p className='py-3 text-red-500'>{validation.password}</p>
          )}
        </div>
        <div className='text-center mt-12'>
          {validation.loginFailed && (
            <p className='py-3 text-red-500'>{validation.loginFailed}</p>
          )}
          <button
            className='bg-gray-700 text-gray-50 py-3 sm:px-20 px-10 rounded-xl cursor-pointer drop-shadow-md hover:bg-gray-600'
            onClick={login}
          >
            ログイン
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
