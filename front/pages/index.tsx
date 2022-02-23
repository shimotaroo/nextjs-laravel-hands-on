import type { NextPage } from 'next';
import { AxiosError, AxiosResponse } from 'axios';
import { useState } from 'react';
import { RequiredMark } from '../components/RequiredMark';
import { axiosApi } from '../lib/axios';
import { useRouter } from 'next/router';
import { useUserState } from '../atoms/userAtom';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

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
  const [validation, setValidation] = useState<Validation>({});
  // recoil stateの呼び出し
  const { setUser } = useUserState();

  // React-Hook-Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  // ログイン
  const login = (data: LoginForm) => {
    // バリデーションメッセージの初期化
    setValidation({});

    axiosApi
      // CSRF保護の初期化
      .get('/sanctum/csrf-cookie')
      .then((res) => {
        // ログイン処理
        axiosApi
          .post('/login', data)
          .then((response: AxiosResponse) => {
            setUser(response.data.data);
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
            {...register('email', {
              required: '必須入力です。',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: '有効なメールアドレスを入力してください。',
              },
            })}
          />
          <ErrorMessage
            errors={errors}
            name={'email'}
            render={({ message }) => (
              <p className='py-3 text-red-500'>{message}</p>
            )}
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
            type='password'
            {...register('password', {
              required: '必須入力です。',
              pattern: {
                value: /^([a-zA-Z0-9]{8,})$/,
                message: '8文字以上の半角英数字で入力してください',
              },
            })}
          />
          <ErrorMessage
            errors={errors}
            name={'password'}
            render={({ message }) => (
              <p className='py-3 text-red-500'>{message}</p>
            )}
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
            onClick={handleSubmit(login)}
          >
            ログイン
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
