// Demo view models only. Laravel request/response contracts are still undefined.
export type DashboardScope = 'vendor' | 'admin'
export type VendorRole = 'Owner' | 'Manager' | 'Content Editor'
export type AdminRole =
  'Super Admin' | 'Moderator' | 'Content / CMS Admin' | 'Commercial Admin' | 'Support / Operations'
export type DashboardRole = VendorRole | AdminRole
export interface DemoUser {
  id: string
  email: string
  name: string
  scope: DashboardScope
  role: DashboardRole
}
export interface DemoSession {
  user: DemoUser
  expiresAt: number
}
export interface DemoAccount extends DemoUser {
  active: boolean
  organizationActive: boolean
}
export interface RecoveryChallenge {
  email: string
  code: string
  expiresAt: number
  verified: boolean
}
export interface DemoInvitation {
  token: string
  email: string
  role: VendorRole
  expiresAt: number
  used: boolean
}
