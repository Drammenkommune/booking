import Promise from 'bluebird'
import AWS from 'aws-sdk'
import uuid from 'uuid'
import config from '~/config'

AWS.config.region = config.awsRegion

export default (id, filename, filetype, bucket = config.s3RoomImageBucket) => {
  const s3 = Promise.promisifyAll(new AWS.S3(), {suffix: '$'})
  const path = `${id}/${uuid.v4()}`
  const params = {
    Bucket: bucket,
    Key: path,
    Expires: 60,
    ACL: 'public-read',
    ContentType: filetype,
  }

  return s3.getSignedUrl$('putObject', params)
}
