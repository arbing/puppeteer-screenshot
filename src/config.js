const isProduction = process.env.NODE_ENV == 'production'
const port = process.env.PORT || 8556

module.exports = {
  isProduction,
  port
}
