
export type MaxwellMessage = {
  database: string
  table: string
  type: 'insert' | 'update' | 'delete'
  data: any
}