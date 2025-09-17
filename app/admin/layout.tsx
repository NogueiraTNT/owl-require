import { redirect } from "next/navigation"
import { getAdminSession } from "../_actions/admin-signin"
import AdminHeader from "../_components/admin-header"
import AdminNavigation from "../_components/admin-navigation"

interface AdminLayoutProps {
  children: React.ReactNode
}

const AdminLayout = async ({ children }: AdminLayoutProps) => {
  const adminSession = await getAdminSession()

  if (!adminSession) {
    redirect("/")
  }

  return (
    <div className="flex h-screen flex-col">
      <AdminHeader admin={adminSession} />

      <div className="flex flex-1 overflow-hidden">
        <AdminNavigation adminType={adminSession.type} />

        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}

export default AdminLayout
