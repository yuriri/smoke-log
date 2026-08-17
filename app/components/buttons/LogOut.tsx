import { logout } from "@/app/login/actions"

// ログアウトボタン
export default function LogOut() {
  return (
    <form action={logout} className="grid place-items-center">
      <button type="submit" className="text-white hover:cursor-pointer hover:underline">LOG OUT</button>
    </form>
  )
}