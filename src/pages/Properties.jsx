// 物件一覧ページ（ダミーデータ使用）
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

// 表示用ダミーデータ
const PROPERTIES = [
  { id: 1, name: 'サンシャインマンション', rent: 85000, area: '東京都新宿区', type: '1LDK', size: '45㎡' },
  { id: 2, name: 'グリーンハイツ', rent: 62000, area: '東京都杉並区', type: '1K', size: '28㎡' },
  { id: 3, name: 'パークサイド大崎', rent: 120000, area: '東京都品川区', type: '2LDK', size: '65㎡' },
  { id: 4, name: 'レジデンス渋谷', rent: 95000, area: '東京都渋谷区', type: '1LDK', size: '40㎡' },
  { id: 5, name: 'ブルーリバー江東', rent: 75000, area: '東京都江東区', type: '2K', size: '50㎡' },
  { id: 6, name: 'スカイタワー豊洲', rent: 150000, area: '東京都江東区', type: '3LDK', size: '80㎡' },
]

export default function Properties() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

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
        <h2 className="section-title">物件一覧</h2>
        <p className="property-count">全 {PROPERTIES.length} 件</p>

        <div className="properties-grid">
          {PROPERTIES.map((property) => (
            <div key={property.id} className="property-card">
              <div className="property-card-header">
                <h3 className="property-name">{property.name}</h3>
                <span className="property-type">{property.type}</span>
              </div>
              <div className="property-card-body">
                <div className="property-detail">
                  <span className="detail-label">エリア</span>
                  <span className="detail-value">{property.area}</span>
                </div>
                <div className="property-detail">
                  <span className="detail-label">広さ</span>
                  <span className="detail-value">{property.size}</span>
                </div>
              </div>
              <div className="property-card-footer">
                <span className="property-rent">
                  ¥{property.rent.toLocaleString()}
                  <span className="rent-unit"> / 月</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
