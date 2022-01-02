import express from 'express'
import cookieParser from 'cookie-parser'

import adminUserRoute from './routes/admin/userManagement'
import adminUserAuth from './routes/admin/auth'
const app = express()
app.use(express.json())
app.use(cookieParser())

//ADMIN USERS ROUTES

app.use('/api/admin/', adminUserRoute)
app.use('/api/admin/', adminUserAuth)

app.listen(5000, () => console.log('server running...'))
