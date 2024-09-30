export type Property = {
  property_id: number
  name: string
  notes: string | null
  user_id: number
  region: string | null
  street: string | null
  postal_code: string | null
  city: string | null
  house_number: string | null
  country: string | null
  timezone: string
  customer_id: number | null
  archive_at: Date | null
  noti_incidents: boolean
  noti_tags: boolean
  noti_routes: boolean
  noti_mail: number | null
  show_incidents: boolean
  show_routes: boolean
  show_time: boolean
  show_task: boolean
  show_docs: boolean
  wt_close_at: string | null
  wt_disable_on: PropertyWTDisableOn
  wt_pause: PropertyPauseType
}

export type PropertyPauseType = 'none' | 'law' | '45' | '60'
export type PropertyWTDisableOn = { start: string; end: string }[]
