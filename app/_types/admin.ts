import { AdminType } from "@prisma/client"

export interface Admin {
  id: string
  name: string
  email: string
  password: string
  type: AdminType
  createdAt: Date
  updatedAt: Date
}

export interface AdminSession {
  id: string
  name: string
  email: string
  type: AdminType
}

export interface AdminStats {
  totalAdmins: number
  adminCount: number
  suporteCount: number
  recentAdmins: Admin[]
}

export interface CreateAdminData {
  name: string
  email: string
  password: string
  type: AdminType
}

export interface UpdateAdminData {
  name?: string
  email?: string
  password?: string
  type?: AdminType
}

export interface ActivityLog {
  id: string
  action: string
  description: string
  timestamp: Date
  ip: string
}
