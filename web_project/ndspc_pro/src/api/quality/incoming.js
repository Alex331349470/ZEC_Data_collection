import apolloClient from '../graphql'
import gql from 'graphql-tag'
//query方式的请求
export function questionById(params) {
  return apolloClient.query({
		query: gql`query playlist($id: ID!) {
			playlist(id: $id) {
				id
				name
				description
				tracks {
					name
					uri
					durationMs
				}
			}
		}`,
		variables: params
  })
}