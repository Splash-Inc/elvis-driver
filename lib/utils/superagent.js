var superagent = require('superagent')

if (typeof superagent.Request.prototype.fields === "undefined") {
  superagent.Request.prototype.fields = function(data) {
    if (!this._formData) {
      this._formData = new FormData()
    }

    if (typeof data === "object") {
      for (var key in data) {
        if (data.hasOwnProperty(key) && data[key]){
          this._formData.append(key, data[key])
        }
      }
    }

    return this
  }
}

module.exports = superagent