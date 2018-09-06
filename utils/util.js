const baseUrl = "https://m.yaojunrong.com"

const fetch = {
  http (url, method, data) {
    return new Promise((resolve, reject) => {
      let token = wx.getStorageSync('token')
      let header = {
        'content-type': 'application/json'
      }
      if (token) {
        header.token = token
      }

      wx.request({
        url: baseUrl + url,
        data,
        method,
        header,
        success(res) {
          console.log(res)
          if(res.header.Token||res.header.token){
            wx.setStorageSync('token', res.header.Token)
          }
          resolve(res.data)
        },
        fail(err) {
          reject(err)
        }
      })
    })
  },
  get(url, data) {
    return this.http(url, 'GET', data)
  },
  post(url, data) {
    return this.http(url, 'POST', data)
  }
}

const login = () => {
  wx.login({
    success(res){
      fetch.post('/login', {
        code: res.code,
        appid: "wx046d05ad6eaa75a7",
        secret: "809450792cb6b6bac9ed22af0c4e4437"
      }).then(res => {
        console.log(res)
      })
    }
  })
}
exports.login = login
exports.fetch = fetch;