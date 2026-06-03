// 物件一覧ページ（SupabaseによるCRUD操作）
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import PropertyForm from '../components/PropertyForm'

export default function Properties() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const [properties, setProperties] = useState([])
  const [loadingList, setLoadingList] = useState(true)
  const [listError, setListError]     = useState('')

  // フォームの表示制御: null=非表示, undefined=新規登録, object=編集対象
  const [formTarget, setFormTarget] = useState(null)

  // 削除確認中の物件ID
  const [deletingId, setDeletingId] = useState(null)

  // ——— SELECT: 自分の物件一覧を取得 ———
  const fetchProperties = async () => {
    setLoadingList(true)
    setListError('')
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      setListError('物件の取得に失敗しました: ' + error.message)
    } else {
      setProperties(data)
    }
    setLoadingList(false)
  }

  useEffect(() => {
    fetchProperties()
  }, [])

  // ——— INSERT: 物件を新規登録 ———
  const handleInsert = async (values) => {
    const { error } = await supabase
      .from('properties')
      .insert({ ...values, user_id: user.id })

    if (error) return { error: '登録に失敗しました: ' + error.message }

    setFormTarget(null)
    await fetchProperties()
  }

  // ——— UPDATE: 物件情報を更新 ———
  const handleUpdate = async (values) => {
    const { error } = await supabase
      .from('properties')
      .update(values)
      .eq('id', formTarget.id)

    if (error) return { error: '更新に失敗しました: ' + error.message }

    setFormTarget(null)
    await fetchProperties()
  }

  // ——— DELETE: 物件を削除 ———
  const handleDelete = async (id) => {
    const { error } = await supabase
      .from('properties')
      .delete()
      .eq('id', id)

    if (error) {
      alert('削除に失敗しました: ' + error.message)
    } else {
      setDeletingId(null)
      await fetchProperties()
    }
  }

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  return (
    <div className="properties-page">
      <header className="page-header">
        <h1 className="page-title">不動産管理アプリ</h1>
        <div className="header-right">
          <span className="user-email">{user?.email}</span>
          <button onClick={handleSignOut} className="btn-logout">
            ログアウト
          </button>
        </div>
      </header>

      <main className="properties-main">
        <div className="section-header">
          <div>
            <h2 className="section-title">物件一覧</h2>
            {!loadingList && (
              <p className="property-count">全 {properties.length} 件</p>
            )}
          </div>
          {/* 新規登録ボタン */}
          <button
            onClick={() => setFormTarget(undefined)}
            className="btn-add"
          >
            ＋ 新規登録
          </button>
        </div>

        {/* エラー表示 */}
        {listError && <div className="error-message">{listError}</div>}

        {/* ローディング */}
        {loadingList ? (
          <div className="loading-screen" style={{ height: '300px' }}>
            <div className="loading-spinner" />
            <p>読み込み中...</p>
          </div>
        ) : properties.length === 0 ? (
          <div className="empty-state">
            <p>物件が登録されていません。「＋ 新規登録」から追加してください。</p>
          </div>
        ) : (
          <div className="properties-grid">
            {properties.map((property) => (
              <div key={property.id} className="property-card">
                <div className="property-card-header">
                  <h3 className="property-name">{property.name}</h3>
                  <span className="property-type">{property.layout}</span>
                </div>

                <div className="property-card-body">
                  <div className="property-detail">
                    <span className="detail-label">エリア</span>
                    <span className="detail-value">{property.area}</span>
                  </div>
                </div>

                <div className="property-card-footer">
                  <span className="property-rent">
                    ¥{property.rent.toLocaleString()}
                    <span className="rent-unit"> / 月</span>
                  </span>

                  <div className="card-actions">
                    {/* 編集ボタン */}
                    <button
                      onClick={() => setFormTarget(property)}
                      className="btn-edit"
                    >
                      編集
                    </button>

                    {/* 削除ボタン（確認付き） */}
                    {deletingId === property.id ? (
                      <div className="delete-confirm">
                        <span>削除しますか？</span>
                        <button
                          onClick={() => handleDelete(property.id)}
                          className="btn-confirm-delete"
                        >
                          はい
                        </button>
                        <button
                          onClick={() => setDeletingId(null)}
                          className="btn-cancel-delete"
                        >
                          いいえ
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeletingId(property.id)}
                        className="btn-delete"
                      >
                        削除
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* 新規登録・編集フォームモーダル */}
      {formTarget !== null && (
        <PropertyForm
          property={formTarget === undefined ? null : formTarget}
          onSubmit={formTarget === undefined ? handleInsert : handleUpdate}
          onCancel={() => setFormTarget(null)}
        />
      )}
    </div>
  )
}
