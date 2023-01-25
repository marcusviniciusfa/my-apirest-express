/* eslint-disable @typescript-eslint/no-namespace */
import multer, { Options, StorageEngine } from 'multer'
import crypto from 'node:crypto'
import path from 'node:path'
import { FILE } from '../constants'
import { BadRequestError } from '../errors/BadRequestError'

interface UploadConfig extends Options {
  dest: string
  storage: StorageEngine
}

function generateRandomFileName(originalFileName: string): string {
  const buffer = crypto.randomBytes(Math.ceil(FILE.RANDOM_NAME_KEY_LENGTH))
  return `${buffer.toString('hex').slice(0, FILE.RANDOM_NAME_KEY_LENGTH)}_${originalFileName}`
}

const dest = path.resolve(__dirname, '../', '../', '../', 'temp', 'uploads')

const uploadConfig: UploadConfig = {
  dest,
  storage: multer.diskStorage({
    destination(_req, _file, callback) {
      callback(null, dest)
    },
    filename(_req, file, callback) {
      const fileName = generateRandomFileName(file.originalname)
      callback(null, fileName)
    },
  }),
  fileFilter(req, file, callback) {
    file.size = file.size || Number(req.headers['content-length'])
    const allowedMimeTypes = ['image/png', 'image/jpeg']
    if (!allowedMimeTypes.includes(file.mimetype)) {
      return callback(new BadRequestError(`invalid file type. must be one of the following extensions ${allowedMimeTypes.join(' or ').replace(/image\//g, '.')} ❌`))
    }
    if (file.size > FILE.MAXIMUM_SIZE_IN_BYTES) {
      return callback(new BadRequestError(`the file has exceeded the maximum size of ${FILE.MAXIMUM_SIZE_IN_BYTES / 1024}KB ❌`))
    }
    callback(null, true)
  },
}

export { uploadConfig }
