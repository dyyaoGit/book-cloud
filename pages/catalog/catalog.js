import { fetch } from '../../utils/util.js'

Page({
  data: {
    bookId: "",
    catalogData: []
  },
  onLoad: function (options) {
    this.setData({
      bookId: options.id
    })
    this.getData()
  },
  getData() {
    fetch.get(`/titles/${this.data.bookId}`).then(res => {
      console.log(res)
      this.setData({
        catalogData: res.data
      })
    })
  },
  onShareAppMessage: function () {
  
  }
})