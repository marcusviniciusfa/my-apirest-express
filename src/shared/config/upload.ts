import multer from 'multer'
import crypto from 'node:crypto'
import path from 'node:path'

export const destination = path.resolve(__dirname, '../../../', 'uploads')
export const storage = multer.diskStorage({
  destination,
  filename(_req, file, callback) {
    const nameSuffix = crypto.randomBytes(8).toString('hex')
    // eslint-disable-next-line prettier/prettier
      const originalNameSplited = file.originalname.split('.')
    const fileExtension = originalNameSplited[originalNameSplited.length - 1]
    const fileName = `${file.filename}_${nameSuffix}.${fileExtension}`
    callback(null, fileName)
  },
})
