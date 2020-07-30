//const fs = require('fs')
module.exports = {
  pluginOptions: {
    electronBuilder: {
      preload: 'src/preload.js'
    }
  },
  "transpileDependencies": [
    "vuetify"
  ]
}
