# realestate-app

## プロジェクト概要

Supabase認証機能付き不動産管理Webアプリケーション。

## 技術スタック

- React 18 + Vite 5
- React Router DOM v6（ルーティング）
- @supabase/supabase-js v2（認証・バックエンド）

## ディレクトリ構成

```
src/
├── lib/
│   └── supabase.js          # Supabaseクライアント初期化
├── contexts/
│   └── AuthContext.jsx      # 認証状態管理コンテキスト
├── components/
│   └── ProtectedRoute.jsx   # 未ログイン時リダイレクト
├── pages/
│   ├── Login.jsx            # ログインページ
│   ├── Register.jsx         # 会員登録ページ
│   └── Properties.jsx       # 物件一覧ページ
├── App.jsx                  # ルーティング設定
├── App.css                  # スタイル
└── main.jsx                 # エントリーポイント
```

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
