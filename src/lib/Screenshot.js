const puppeteer = require('puppeteer')
const devices = require('puppeteer/DeviceDescriptors')

class Screenshot {
  constructor() {
    this.browser = null
  }

  async launch() {
    this.browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    })
  }

  async getImage({
    device,
    url,
    html,
    timeout,
    waitUntil,
    style,
    script,
    waitFor,
    selector,
    type,
    quality,
    fullPage,
    clipX,
    clipY,
    clipWidth,
    clipHeight,
    omitBackground
  }) {
    const page = await this.browser.newPage()

    try {
      // 模拟器
      await page.emulate(devices[device])

      if (html) {
        // render html
        await page.setContent(html, { waitUntil, timeout })
      } else {
        await page.goto(url, { waitUntil, timeout })
      }

      if (waitFor) {
        await page.waitFor(waitFor)
      }

      if (selector) {
        const element = await page.$(selector)
        if (element) {
          const options = {
            type,
            quality,
            omitBackground
          }

          const imageBuffer = await element.screenshot(options)

          return imageBuffer
        }
      }

      const options = {
        type,
        quality,
        fullPage,
        omitBackground
      }
      if (!fullPage && ![clipX, clipY, clipWidth, clipHeight].every(d => !d)) {
        options.clip = { x: clipX, y: clipY, width: clipWidth, height: clipHeight }
      }

      const imageBuffer = await page.screenshot(options)

      return imageBuffer
    } catch (error) {
      throw error
    } finally {
      await page.close()
    }
  }

  async destroy() {
    await this.browser.close()
  }
}

module.exports = Screenshot
