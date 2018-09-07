const fs = require('fs')
const qiniuConfig = require('../config/qiniu')
const qiniu = require('qiniu')

const mac = new qiniu.auth.digest.Mac(qiniuConfig.ACCESS_KEY, qiniuConfig.SECRET_KEY)

class UploadController {

  static async upload (ctx) {
    const file = ctx.request.body.files.file
    const reader = fs.createReadStream(file.path)
    const filePath = Date.now()+ "_" + file.name
    const upStream = fs.createWriteStream('upload/'+filePath)
    reader.pipe(upStream)
    const res = {
      size: file.size,
      name: file.name,
      type: file.type,
      path: filePath
    }
    // console.log(ctx.request.body)
    return ctx.success({data: res})
  }

  static async uploadQiniu (ctx) {
    let file = ctx.request.body.files.file
    let options = {
      scope: qiniuConfig.bucket,
      returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}'
    }
    let putPolicy = new qiniu.rs.PutPolicy(options)
    let uploadToken = putPolicy.uploadToken(mac)
    let config = new qiniu.conf.Config()
    config.zone = qiniu.zone.Zone_z2
    let formUploader = new qiniu.form_up.FormUploader(config)
    let putExtra = new qiniu.form_up.PutExtra()
    let key = Date.now() + "_" + file.name
    let upload = () => {
      return new Promise((resolve, reject) => {
        formUploader.putFile(uploadToken, key, file.path, putExtra, function (error, body, info) {
          if (info.statusCode === 200) {
            resolve(body)
          } else {
            reject(error)
          }
        })
      })
    }
    try {
      let result = await upload()
      ctx.success({Data: result})
    } catch (error) {
      ctx.error({Data: error})
    }

  }

}

module.exports = UploadController
