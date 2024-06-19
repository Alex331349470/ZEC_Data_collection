
// import ApolloClient from 'apollo-boost' //引入apollo-boost插件
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink } from 'apollo-link'

const httpLink = createHttpLink({
  uri: "http://10.0.45.20:8080/graphql", //配置api调用连接
})

const middlewareLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      'Apollo-Require-Preflight': true,
      // "Content-Type": "multipart/form-data"
    },
  })

  return forward(operation).map((response) => {
    return response
  }) //response拦截器，但是此处并不能对错误响应进行拦截
})

const authLink = middlewareLink.concat(httpLink)

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'network-only',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
  },
}

const apolloClient = new ApolloClient({
  link: authLink,
  cache: new InMemoryCache(),
  connectToDevTools: true,
  defaultOptions: defaultOptions,
})

//导出实例
export default apolloClient

