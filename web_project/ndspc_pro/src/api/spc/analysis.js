import apolloClient from '../graphql'
import gql from 'graphql-tag'
//query方式的请求
export function uploadFile(params) {
  console.log(params)
  return apolloClient.mutate({
		mutation: gql`mutation uploadFile($file: Upload!) {
      uploadFile(file: $file) {
        uri
        filename
        mimetype
        encoding
        fileSize
      }
    }`,
		variables: params
  })
}