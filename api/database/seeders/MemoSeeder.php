<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MemoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('memos')->insert([
            [
                'user_id' => 1,
                'title' => 'タイトル1',
                'body' => 'サンプルメモ1'
            ],
            [
                'user_id' => 1,
                'title' => 'タイトル2',
                'body' => 'サンプルメモ2'
            ],
            [
                'user_id' => 1,
                'title' => 'タイトル3',
                'body' => 'サンプルメモ3'
            ],
            [
                'user_id' => 1,
                'title' => 'タイトル4',
                'body' => 'サンプルメモ4'
            ],
            [
                'user_id' => 1,
                'title' => 'タイトル5',
                'body' => 'サンプルメモ5'
            ],
            [
                'user_id' => 1,
                'title' => 'タイトル6',
                'body' => 'サンプルメモ6'
            ],
        ]);
    }
}
