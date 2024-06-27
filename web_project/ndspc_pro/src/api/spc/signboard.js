import apolloClient from '../graphql'
import gql from 'graphql-tag'
// 异常点数据查询
export function SpcProductOCC(params) {
	return apolloClient.mutate({
		mutation: gql`mutation SpcProductOCC($input: SpcProductAbnormalSelectInput) {
      spcProductOCC(input: $input) {
        oocTrend {
          yearTrend {
            year
            poorAmount
          }
          seasonTrend {
            year
            season
            poorAmount
          }
          monthTrend {
            year
            season
            month
            poorAmount
          }
          weekTrend {
            year
            season
            month
            week
            poorAmount
          }
          dayTrend {
            year
            season
            month
            week
            day
            poorAmount
          }
        }
        oocFactory {
          factory
          poorAmount
        }
        oocWorkShop {
          workshop
          poorAmount
        }
        oocLine {
          line
          poorAmount
        }
        oocMaterialType {
          materialType
          poorAmount
        }
        oocMaterialCode {
          materialCode
          poorAmount
        }
        oocMaterialCodePlato {
          materialCode
          poorAmount
          proportion
        }
        oocTestItemPlato {
          testItem
          poorAmount
          proportion
        }
      }
    }`,
		variables: params
	})
}
// 异常点检索数据查询
export function SpcProductAbnormalSelect(params) {
  return apolloClient.mutate({
		mutation: gql`mutation SpcProductAbnormalSelect($input: SpcProductControlInput) {
      spcProductAbnormalSelect(input: $input) {
        factory
        workshop
        line
        materialType
        materialCode
        propertyType
        testItem
      }
    }`,
		variables: params
	})
}
//监控运行数据
export function SpcProductConnect(params) {
  return apolloClient.mutate({
		mutation: gql`mutation SpcProductConnect($input: SpcProductConnectStatusInput) {
      spcProductConnect(input: $input) {
        factoryConnectStatus {
          factory
          noDataConnect
          disconnect
          connect
        }
        workshopConnectStatus {
          workshop
          noDataConnect
          disconnect
          connect
        }
        lineConnectStatus {
          line
          noDataConnect
          disconnect
          connect
        }
      }
    }`,
		variables: params
	})
}
//整体数据
export function SpcProductAbnormalBoard(params) {
  return apolloClient.mutate({
		mutation: gql`mutation SpcProductAbnormalBoard($input: SpcProductAbnormalBoardInput) {
      spcProductAbnormalBoard(input: $input) {
        yearAbnormalData {
          factoryAbnormalData {
            total
            list {
              year
              factory
              poorAmount
            }
          }
          workshopAbnormalData {
            total
            list {
              year
              workshop
              poorAmount
            }
          }
          lineAbnormalData {
            total
            list {
              year
              line
              poorAmount
            }
          }
          materialTypeAbnormalData {
            total
            list {
              year
              materialType
              poorAmount
            }
          }
          materialCodeAbnormalData {
            total
            list {
              year
              materialCode
              poorAmount
            }
          }
        }
        seasonAbnormalData {
          factoryAbnormalData {
            total
            list {
              year
              season
              factory
              poorAmount
            }
          }
          workshopAbnormalData {
            total
            list {
              year
              season
              workshop
              poorAmount
            }
          }
          lineAbnormalData {
            total
            list {
              year
              season
              line
              poorAmount
            }
          }
          materialTypeAbnormalData {
            total
            list {
              year
              season
              materialType
              poorAmount
            }
          }
          materialCodeAbnormalData {
            total
            list {
              year
              season
              materialCode
              poorAmount
            }
          }
        }
        monthAbnormalData {
          factoryAbnormalData {
            total
            list {
              year
              season
              month
              factory
              poorAmount
            }
          }
          workshopAbnormalData {
            total
            list {
              year
              season
              month
              workshop
              poorAmount
            }
          }
          lineAbnormalData {
            total
            list {
              year
              season
              month
              line
              poorAmount
            }
          }
          materialTypeAbnormalData {
            total
            list {
              year
              season
              month
              materialType
              poorAmount
            }
          }
          materialCodeAbnormalData {
            total
            list {
              year
              season
              month
              materialCode
              poorAmount
            }
          }
        }
        weekAbnormalData {
          factoryAbnormalData {
            total
            list {
              year
              season
              month
              week
              factory
              poorAmount
            }
          }
          workshopAbnormalData {
            total
            list {
              year
              season
              month
              week
              workshop
              poorAmount
            }
          }
          lineAbnormalData {
            total
            list {
              year
              season
              month
              week
              line
              poorAmount
            }
          }
          materialTypeAbnormalData {
            total
            list {
              year
              season
              month
              week
              materialType
              poorAmount
            }
          }
          materialCodeAbnormalData {
            total
            list {
              year
              season
              month
              week
              materialCode
              poorAmount
            }
          }
        }
        dayAbnormalData {
          factoryAbnormalData {
            total
            list {
              year
              season
              month
              week
              day
              factory
              poorAmount
            }
          }
          workshopAbnormalData {
            total
            list {
              year
              season
              month
              week
              day
              workshop
              poorAmount
            }
          }
          lineAbnormalData {
            total
            list {
              year
              season
              month
              week
              day
              line
              poorAmount
            }
          }
          materialTypeAbnormalData {
            total
            list {
              year
              season
              month
              week
              day
              materialType
              poorAmount
            }
          }
          materialCodeAbnormalData {
            total
            list {
              year
              season
              month
              week
              day
              materialCode
              poorAmount
            }
          }
        }
      }
    }`,
		variables: params
	})
}