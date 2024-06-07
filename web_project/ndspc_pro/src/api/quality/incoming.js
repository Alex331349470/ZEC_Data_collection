import apolloClient from '../graphql'
import gql from 'graphql-tag'
//query方式的请求
export function materialQC(params) {
	return apolloClient.mutate({
		mutation: gql`mutation MaterialQC($input: MaterialQCInput) {
			materialQC(input: $input) {
				trendRate {
					quantityYearTrend {
						year
						amount
						poorAmount
						rate
						purpose
					}
					quantitySeasonTrend {
						year
						season
						amount
						poorAmount
						rate
						purpose
					}
					quantityMonthTrend {
						year
						season
						month
						amount
						poorAmount
						rate
						purpose
					}
					quantityWeekTrend {
						year
						season
						month
						week
						amount
						poorAmount
						rate
						purpose
					}
					quantityDayTrend {
						year
						season
						month
						week
						day
						amount
						poorAmount
						rate
						purpose
					}
					weightYearTrend {
						year
						amount
						poorAmount
						rate
						purpose
					}
					weightSeasonTrend {
						year
						season
						amount
						poorAmount
						rate
						purpose
					}
					weightMonthTrend {
						year
						season
						month
						amount
						poorAmount
						rate
						purpose
					}
					weightWeekTrend {
						year
						season
						month
						week
						amount
						poorAmount
						rate
						purpose
					}
					weightDayTrend {
						year
						season
						month
						week
						day
						amount
						poorAmount
						rate
						purpose
					}
				}
				factoryRate {
					quantityFactory {
						factory
						amount
						poorAmount
						rate
						purpose
					}
					weightFactory {
						factory
						amount
						poorAmount
						rate
						purpose
					}
				}
				supplierRate {
					quantitySupplier {
						supplier
						amount
						poorAmount
						rate
						purpose
					}
					weightSupplier {
						supplier
						amount
						poorAmount
						rate
						purpose
					}
				}
				materialTypeRate {
					quantityMaterialType {
						materialType
						amount
						poorAmount
						rate
						purpose
					}
					weightMaterialType {
						materialType
						amount
						poorAmount
						rate
						purpose
					}
				}
				materialCodeRate {
					quantityMaterialCode {
						materialCode
						amount
						poorAmount
						rate
						purpose
					}
					weightMaterialCode {
						materialCode
						amount
						poorAmount
						rate
						purpose
					}
				}
				materialCodePlato {
					quantityMaterialCodePlato {
						materialCode
						poorAmount
						proportion
					}
					weightMaterialCodePlato {
						materialCode
						poorAmount
						proportion
					}
				}
			}
		}`,
		variables: params
	})
}
export function materialSelect(params) {
	return apolloClient.mutate({
		mutation: gql`mutation MaterialSelect($input: MaterialQCInput) {
			materialSelect(input: $input) {
				factory
				supplier
				materialType
				materialCode
				propertyType
				testItem
			}
		}`,
		variables: params
	})
}
export function materialQCTestItem(params) {
	return apolloClient.mutate({
		mutation: gql`mutation MaterialQCTestItem($input: MaterialQCInput) {
			materialQCTestItem(input: $input) {
				testItemPlato {
					quantityTestItemPlato {
						testItem
						poorAmount
						proportion
					}
					weightTestItemPlato {
						testItem
						poorAmount
						proportion
					}
				}
				testItemRate {
					quantityTestItem {
						testItem
						amount
						poorAmount
						rate
						purpose
					}
					weightTestItem {
						testItem
						amount
						poorAmount
						rate
						purpose
					}
				}
			}
		}`,
		variables: params
	})
}