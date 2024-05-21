import apolloClient from '../graphql'
import gql from 'graphql-tag'
//query方式的请求
export function questionById(params) {
	return apolloClient.query({
		query: gql`query ($id: ID) {
					questionById(id: $id) {
						id
						title 
						content
						userId
					}
			}`,
		variables: params
	})
}