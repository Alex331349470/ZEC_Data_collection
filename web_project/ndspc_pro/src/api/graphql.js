import gql from 'graphql-tag'
// 测试
export const testQuery = gql`
  query getAuthor($pageSize:Int, $pageNum: Int) {
    authors(pageSize: $pageSize, pagesNum: $pageNum) {
      name
    }
  }
`;