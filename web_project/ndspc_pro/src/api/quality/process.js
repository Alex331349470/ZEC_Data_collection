import apolloClient from '../graphql'
import gql from 'graphql-tag'
//query方式的请求
export function processQC(params) {
	return apolloClient.mutate({
		mutation: gql`mutation ProcessQC($input: ProcessQCInput) {
			processQC(input: $input) {
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
				workshopRate {
					quantityWorkshop {
						workshop
						amount
						poorAmount
						rate
						purpose
					}
					weightWorkshop {
						workshop
						amount
						poorAmount
						rate
						purpose
					}
				}
				lineRate {
					quantityLine {
						line
						amount
						poorAmount
						rate
						purpose
					}
					weightLine {
						line
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
				processRate {
					quantityProcess {
						process
						amount
						poorAmount
						rate
						purpose
					}
					weightProcess {
						process
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
export function ProcessSelect(params) {
	return apolloClient.mutate({
		mutation: gql`mutation ProcessSelect($input: ProcessQCInput) {
			processSelect(input: $input) {
				factory
				workshop
				line
				materialType
				process
				materialCode
				propertyType
				testItem
			}
		}`,
		variables: params
	})
}
export function processQCTestItem(params) {
	return apolloClient.mutate({
		mutation: gql`mutation ProcessQCTestItem($input: ProcessQCInput) {
			processQCTestItem(input: $input) {
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