import type { NextPage } from 'next';
import { useRouter } from 'next/router';

type Memo = {
  title: string;
  body: string;
};

const tempMemos: Memo[] = [
  {
    title: '仮のタイトル1',
    body: '仮のメモの内容1',
  },
  {
    title: '仮のタイトル2',
    body: '仮のメモの内容2',
  },
  {
    title: '仮のタイトル3',
    body: '仮のメモの内容3',
  },
  {
    title: '仮のタイトル4',
    body: '仮のメモの内容4',
  },
  {
    title: '仮のタイトル5',
    body: '仮のメモの内容5',
  },
];

const Memo: NextPage = () => {
  const router = useRouter();

  return (
    <div className='w-2/3 mx-auto mt-32'>
      <div className='w-1/2 mx-auto text-center'>
        <button
          className='text-xl mb-12 py-3 px-10 bg-blue-500 text-white rounded-3xl drop-shadow-md hover:bg-blue-400'
          onClick={() => router.push('/memos/post')}
        >
          メモを追加する
        </button>
      </div>
      <div className='mt-3'>
        {/* 仮データでの一覧表示 */}
        <div className='grid w-2/3 mx-auto gap-4 grid-cols-2'>
          {tempMemos.map((memo: Memo, index) => {
            return (
              <div className='bg-gray-100 shadow-lg mb-5 p-4' key={index}>
                <p className='text-lg font-bold mb-1'>{memo.title}</p>
                <p className=''>{memo.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Memo;
