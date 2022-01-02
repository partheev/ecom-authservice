import { Pool } from 'pg'
export const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'localstore',
  password: 'password',
  port: 5432,
})
