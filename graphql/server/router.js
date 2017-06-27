import express from 'express'
import jwt from 'jsonwebtoken'
import {INTERNAL_SERVER_ERROR, BAD_REQUEST, FORBIDDEN} from 'http-status-codes'
import config from '~/config'
import ics from '~/lib/utils/generateIcsFile'
import {roles} from '~/lib'
import statistics from '~/lib/utils/generateStatisticsFile'

const router = express.Router()

router.get('/ics/:id', async (req, res) => {
  res.type('text/calendar')
  ics(req.params.id)
    .then(file => {
      res.set('Content-type', 'text/calendar; charset=utf-8')
      res.set('Character-Encoding', 'UTF-8')
      res.set('Content-Disposition', `attachment;filename="${file.name}"`)
      res.send(file.data.toString())
      res.end()
    })
    .catch(error => {
      console.log('ICS Creation failed with error')
      console.log(error)
      res.sendStatus(INTERNAL_SERVER_ERROR)
    })
})

router.get('/stats', async (req, res) => {
  const {start, end, token} = req.query
  if (!token) {
    res.sendStatus(FORBIDDEN)
  }
  const user = jwt.verify(token, config.jwtSecret)
  const authenticated = user && user.role === roles.ADMIN
  if (!authenticated) {
    res.sendStatus(FORBIDDEN)
  }
  if (start && end) {
    statistics(parseInt(start, 10), parseInt(end, 10))
      .then(file => {
        res.type('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
        res.set('Character-Encoding', 'UTF-8')
        res.set('Content-Disposition', `attachment;filename="${file.name}"`)
        res.send(new Buffer(file.data, 'base64'))
        res.end()
      })
      .catch(error => {
        console.log('Statistics file failed while generating')
        console.log(error)
        res.sendStatus(INTERNAL_SERVER_ERROR)
      })
  } else {
    res.sendStatus(BAD_REQUEST)
  }
})

export default router
