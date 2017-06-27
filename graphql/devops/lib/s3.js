import Promise from 'bluebird'
import AWS from 'aws-sdk'
import {logger} from '~/lib'
import config from '~/config'

const s3 = Promise.promisifyAll(new AWS.S3(), {suffix: '$'})
const bucketName = config.s3RoomImageBucket

function createBucket() {
  logger.info(`Creating S3 bucket: ${bucketName}`)
  return s3.createBucket$({
    Bucket: bucketName,
    ACL: 'public-read',
    CreateBucketConfiguration: {
      LocationConstraint: config.awsRegion
    }
  }).catch(err => {
    if (!err.code === 'BucketAlreadyOwnedByYou') {
      throw err
    }
  })
}

function setBucketCORS() {
  logger.info(`Setting CORS for S3 bucket: ${bucketName}`)
  return s3.putBucketCors$({
    Bucket: bucketName,
    CORSConfiguration: {
      CORSRules:  [{
        AllowedMethods: ['PUT', 'POST', 'GET', 'DELETE', 'HEAD'],
        AllowedOrigins: ['*'],
        AllowedHeaders: ['*'],
        ExposeHeaders: ['ETag']
      }]
    }
  })
}

export default function setupS3() {
  return createBucket().then(setBucketCORS)
}
