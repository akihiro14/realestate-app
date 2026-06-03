// 物件の新規登録・編集に共用するフォームモーダル
import { useState } from 'react'

// property が null のとき新規登録、オブジェクトのとき編集モード
export default function PropertyForm({ property, onSubmit, onCancel }) {
  const isEditing = property !== null

  const [values, setValues] = useState({
    name:   property?.name   ?? '',
    rent:   property?.rent   ?? '',
    area:   property?.area   ?? '',
    layout: property?.layout ?? '',
  })
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // 家賃の入力値チェック
    const rent = parseInt(values.rent, 10)
    if (isNaN(rent) || rent <= 0) {
      setError('家賃は1以上の整数を入力してください')
      return
    }

    setLoading(true)
    const result = await onSubmit({
      name:   values.name.trim(),
      rent,
      area:   values.area.trim(),
      layout: values.layout.trim(),
    })

    // 親から渡ったエラーを表示
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    // モーダルの背景オーバーレイ
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">
          {isEditing ? '物件を編集' : '物件を新規登録'}
        </h2>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="name">物件名</label>
            <input
              id="name"
              name="name"
              type="text"
              value={values.name}
              onChange={handleChange}
              placeholder="例: サンシャインマンション"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="rent">家賃（円）</label>
            <input
              id="rent"
              name="rent"
              type="number"
              value={values.rent}
              onChange={handleChange}
              placeholder="例: 80000"
              min="1"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="area">エリア</label>
            <input
              id="area"
              name="area"
              type="text"
              value={values.area}
              onChange={handleChange}
              placeholder="例: 東京都新宿区"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="layout">間取り</label>
            <input
              id="layout"
              name="layout"
              type="text"
              value={values.layout}
              onChange={handleChange}
              placeholder="例: 1LDK"
              required
            />
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onCancel} className="btn-secondary">
              キャンセル
            </button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? '保存中...' : isEditing ? '更新する' : '登録する'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
