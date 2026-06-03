-- ==================================================
-- 不動産管理アプリ: propertiesテーブル作成 + RLSポリシー
-- Supabaseダッシュボードの「SQL Editor」で実行してください
-- ==================================================

-- propertiesテーブルを作成
CREATE TABLE IF NOT EXISTS properties (
  id          uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  name        TEXT        NOT NULL,           -- 物件名
  rent        INTEGER     NOT NULL,           -- 家賃（円）
  area        TEXT        NOT NULL,           -- エリア名
  layout      TEXT        NOT NULL,           -- 間取り（例: 1LDK）
  user_id     uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at  TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- RLSを有効化（未設定だと全ユーザーのデータが見えてしまうため必須）
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- SELECT: 自分が登録した物件のみ参照可能
CREATE POLICY "自分の物件のみ参照可能"
  ON properties FOR SELECT
  USING (auth.uid() = user_id);

-- INSERT: user_idが自分のUIDの物件のみ登録可能
CREATE POLICY "自分の物件のみ登録可能"
  ON properties FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- UPDATE: 自分が登録した物件のみ編集可能
CREATE POLICY "自分の物件のみ編集可能"
  ON properties FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- DELETE: 自分が登録した物件のみ削除可能
CREATE POLICY "自分の物件のみ削除可能"
  ON properties FOR DELETE
  USING (auth.uid() = user_id);
