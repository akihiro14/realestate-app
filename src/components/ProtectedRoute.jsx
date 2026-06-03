// 未ログイン時にログインページへリダイレクトする保護ルート
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  // セッション確認中はローディング表示
  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner" />
        <p>読み込み中...</p>
      </div>
    )
  }

  // 未ログインの場合はログインページへリダイレクト
  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}
