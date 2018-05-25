const fs = require('fs')

class UploadController {

  static async upload (ctx) {
    const file = ctx.request.body.files.file
    const reader = fs.createReadStream(file.path)
    const filePath = Date.now()+ "-" + file.name
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

}

module.exports = UploadController
