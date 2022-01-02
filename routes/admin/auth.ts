import express, { Request, Response } from 'express'
import { getUserDetails } from '../../db/queries/adminUsers'
import { jwtFunc, verifyJwt } from '../../utils/jwt'
import { validateUserCredentials } from '../../utils/validateUser'

const router = express.Router()

router.get('/verifyUser', async (req: Request, res: Response) => {
  const { session } = req.cookies
  const { payload, error } = verifyJwt(session)
  if (!error && payload) {
    const user = await getUserDetails(payload.username)

    res.send({ adminUser: user })
    return
  }
  res.status(400)
  res.send({ message: 'Not authorized' })
})
router.post('/logout', async (req: Request, res: Response) => {
  res.clearCookie('session')
  res.send({ message: 'Logout successful.' })
})
router.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body

  if (!username && !password) {
    res.status(400)
    res.send({ message: 'Invalid credentials.' })
    return
  }

  const matched = await validateUserCredentials(username, password)
  if (matched) {
    const token = jwtFunc.generateJwt(username)
    res.cookie('session', token, {
      // You can't access these tokens in the client's javascript
      httpOnly: true,
      // Forces to use https in production
      secure: false, //process.env.NODE_ENV === 'production' ? true : false,
    })
    const userDetails = await getUserDetails(username)
    res.send({
      message: 'Login successful.',
      userDetails,
    })
  } else {
    res.status(400)
    res.send({ message: 'Invalid credentials.' })
  }
})

router.post('/logout', async (req: Request, res: Response) => {
  res.clearCookie('session')
  res.send({
    message: 'Logout successful.',
  })
})
export default router
