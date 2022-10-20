
enum MaxwellEventType {
  'insert' = 'insert',
  'update' = 'update',
  'delete' = 'delete',
  'bootstrap-insert' = 'bootstrap-insert',
  'bootstrap-start' = 'bootstrap-start',
  'bootstrap-complete' = 'bootstrap-complete',
}


export type MaxwellMessage = {
  database: string
  table: string
  type: keyof typeof MaxwellEventType,
  data: any
}