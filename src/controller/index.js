const Screenshot = require('../lib/Screenshot')
const Boom = require('boom')
const devices = require('puppeteer/DeviceDescriptors')
const deviceNames = devices.map(device => device.name)
const boolean = require('boolean')

const screenshot = new Screenshot()
;(async () => {
  await screenshot.launch()
})()

const defaultOptions = {
  device: 'iPhone 8',
  url: null,
  html: null,
  timeout: 30 * 1000,
  waitUntil: 'load',
  style: null,
  script: null,
  waitFor: null,
  selector: 'body',
  type: 'png',
  quality: null,
  fullPage: false,
  clipX: 0,
  clipY: 0,
  clipWidth: 0,
  clipHeight: 0,
  omitBackground: false
}

function removeNullProps(obj) {
  const newObj = {}
  for (const [key, value] of Object.entries(obj)) {
    if (value != null && value != undefined) {
      newObj[key] = value
    }
  }
  return newObj
}

async function getScreenshot(ctx) {
  const options = { ...defaultOptions, ...removeNullProps(ctx.query) }

  if (!checkOption(options, ctx)) {
    return
  }

  try {
    ctx.body = await screenshot.getImage(options)
    ctx.type = options.type
  } catch (e) {
    ctx.body = Boom.gatewayTimeout(e.message || 'Service Unavailable').output
  }
}

async function createScreenshot(ctx) {
  const options = { ...defaultOptions, ...removeNullProps(ctx.request.body) }
  if (!checkOption(options, ctx)) {
    return
  }

  try {
    ctx.body = await screenshot.getImage(options)
    ctx.type = options.type
  } catch (e) {
    ctx.body = Boom.gatewayTimeout(e.message || 'Service Unavailable').output
  }
}

function checkOption(options, ctx) {
  if (options.device && deviceNames.indexOf(options.device) === -1) {
    ctx.body = Boom.badRequest(`invalid device. Optional [${deviceNames}]`).output
    return false
  }

  if (!options.url) {
    if (!/^https?:\/\/.+/.test(options.url)) {
      ctx.body = Boom.badRequest('invalid url').output
      return false
    }
  }

  options.timeout = Number(options.timeout)

  if (!/^load$|^domcontentloaded$|^networkidle0$|^networkidle2$/.test(options.waitUntil)) {
    ctx.body = Boom.badRequest('invalid waitUntil. Optional [load,domcontentloaded,networkidle0,networkidle2]').output
    return false
  }

  if (!/^jpeg$|^png$/.test(options.type)) {
    ctx.body = Boom.badRequest('invalid type. Optional [jpeg,png]').output
    return false
  }

  options.quality = Number(options.quality)
  options.fullPage = boolean(options.fullPage)
  options.clipX = Number(options.clipX)
  options.clipY = Number(options.clipY)
  options.clipWidth = Number(options.clipWidth)
  options.clipHeight = Number(options.clipHeight)
  options.omitBackground = boolean(options.omitBackground)

  return true
}

module.exports = {
  getScreenshot,
  createScreenshot
}
