const Router = require('koa-router')
const router = new Router()
const { getScreenshot, createScreenshot } = require('../controller/index')

router
  .get('/', getScreenshot)
  .post('/', createScreenshot)
  .get('/screenshot', getScreenshot)
  .post('/screenshot', createScreenshot)

module.exports = router.routes()
