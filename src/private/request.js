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

/**
 * Request
 * @param payload
 * @private
 */
module.exports = function request(payload) {
  superagent
      .post(payload.url)
      .withCredentials()
      .type('form')
      .send(payload.params)
      .end((err, res) => {
        if (err) {
          payload.failure.call(this, err)

        } else {
          var data = res.body
          if (data.errorcode) {
            if (data.errorcode === 401) {
              this.sessionID = null
              payload.failure.call(this, { loggedOut: true })
            } else {
              payload.failure.call(this, data)
            }
          } else {
            payload.success.call(this, data)
          }
        }
      })
}