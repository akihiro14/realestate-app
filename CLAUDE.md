# realestate-app

## プロジェクト概要

Supabase認証機能付き不動産管理Webアプリケーション。ログインユーザーが自分の物件を登録・閲覧・編集・削除できる。

## 技術スタック

- React 18 + Vite 5
- React Router DOM v6（ルーティング）
- @supabase/supabase-js v2（認証・データベース）

## ディレクトリ構成

```
src/
├── lib/
│   └── supabase.js              # Supabaseクライアント初期化
├── contexts/
│   └── AuthContext.jsx          # 認証状態管理コンテキスト
├── components/
│   ├── ProtectedRoute.jsx       # 未ログイン時リダイレクト
│   └── PropertyForm.jsx         # 物件登録・編集フォーム（モーダル）
├── pages/
│   ├── Login.jsx                # ログインページ
│   ├── Register.jsx             # 会員登録ページ
│   └── Properties.jsx           # 物件一覧（CRUD操作）
├── App.jsx                      # ルーティング設定
├── App.css                      # スタイル
└── main.jsx                     # エントリーポイント
supabase/
└── schema.sql                   # テーブル作成 + RLSポリシーSQL
```

## Supabaseテーブル構成

### propertiesテーブル

| カラム | 型 | 説明 |
|--------|-----|------|
| id | uuid | 主キー（自動生成） |
| name | text | 物件名 |
| rent | integer | 家賃（円） |
| area | text | エリア名 |
| layout | text | 間取り（例: 1LDK） |
| user_id | uuid | 登録者のユーザーID（auth.usersへの外部キー） |
| created_at | timestamptz | 作成日時（自動生成） |

RLS（行レベルセキュリティ）が有効で、自分が登録した物件のみSELECT/INSERT/UPDATE/DELETEが可能。

`supabase/schema.sql` をSupabaseダッシュボードの「SQL Editor」で実行してテーブルを作成する。

## 環境変数

`.env` ファイルに以下を設定（Gitには含めない）:

```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

## 開発コマンド

```bash
npm run dev     # 開発サーバー起動
npm run build   # プロダクションビルド
npm run preview # ビルド結果のプレビュー
```

## Git運用ルール

- コードを変更するたびに、変更内容をコミットしてGitHubにプッシュする
- コミットメッセージは変更内容が分かる日本語で記載する
- リモートリポジトリ: `git@github.com:akihiro14/realestate-app.git`

## 回答ルール

- 回答するたびにこのCLAUDE.mdを最新の状態に更新する
