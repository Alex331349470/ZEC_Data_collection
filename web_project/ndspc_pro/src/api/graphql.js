import qgl from 'graphql-tag'
// 测试
export const testQuery = qgl`
  query getAuthor {
    authors {
      name
    }
    books {
      title
    }
  }
`;