import apolloClient from '../graphql'
import gql from 'graphql-tag'
// 多个控制型条目查询
export function getSpcDataList(params) {
	return apolloClient.mutate({
		mutation: gql`mutation SpcProductControlSelect($input: SpcProductControlSelect) {
      spcProductControlSelect(input: $input) {
        total
        list {
          analyze_num
          poor_amount
          backup
          factory
          change_time
          workshop
          status
          line
          source_type
          material_type
          material_code
          property_type
          analyze_column
          control_type
          group_type
          usl
          lsl
          mean
          cpk
          cov_purpose
          ucl
          lcl
          review
          rule1
          rule1_status
          rule2
          rule2_status
          rule3
          rule3_status
          rule4
          rule4_status
          rule5
          rule5_status
          rule6
          rule6_status
          rule7
          rule7_status
          rule8
          rule8_status
          rule9_a1
          rule9_a2
          rule9_status
          rule10_a1
          rule10_a2
          rule10_a3
          rule10_status
          rule11_a1
          rule11_a2
          rule11_status
          rule12_a1
          rule12_a2
          rule12_status
          connect_status
        }
      }
    }`,
		variables: params
	})
}
// 单个控制型条目查询
export function spcProductControl(params) {
	return apolloClient.mutate({
		mutation: gql`mutation SpcProductControl($input: SpcProductControlInput) {
      spcProductControl(input: $input) {
        iControl {
          productPatch
          productI
          usl
          lsl
          ucl
          cl
          lcl
          jugeStatus
          jugeArr
        }
        mrControl {
          productPatch
          productMR
          uclr
          lclr
          clr
          jugeStatus
          jugeArr
        }
        processCapability {
          lsl
          usl
          amount
          sampleAvg
          sigmaIn
          sigmaTotal
          stablilityIndex
          cpk
          cpl
          cpu
          cp
          ppk
          cov
          mean
          ppl
          ppu
          pp
          poorBelowRate
          poorAboveRate
          poorTotalRate
          sigmaInBelowRate
          sigmaInAboveRate
          sigmaInTotalRate
          sigmaTotalBelowRate
          sigmaTotalAboveRate
          sigmaTotalAllRate
        }
        normalDistribution {
          ndMap {
            group
            group_value
            frequency
            totalFit
            inFit
          }
          ndXArr
          lsl
          usl
          p_value
          a2_value
        }
        iControlJugeTrend {
          spcProductIControlJugeYearTrend {
            year
            poorAmount
          }
          spcProductIControlJugeSeasonTrend {
            year
            season
            poorAmount
          }
          spcProductIControlJugeMonthTrend {
            year
            season
            month
            poorAmount
          }
          spcProductIControlJugeWeekTrend {
            year
            season
            month
            week
            poorAmount
          }
          spcProductIControlJugeDayTrend {
            year
            season
            month
            week
            day
            poorAmount
          }
        }
        mrControlJugeTrend {
          spcProductMRControlJugeYearTrend {
            year
            poorAmount
          }
          spcProductMRControlJugeSeasonTrend {
            year
            season
            poorAmount
          }
          spcProductMRControlJugeMonthTrend {
            year
            season
            month
            poorAmount
          }
          spcProductMRControlJugeWeekTrend {
            year
            season
            month
            week
            poorAmount
          }
          spcProductMRControlJugeDayTrend {
            year
            season
            month
            week
            day
            poorAmount
          }
        }
        iControlMeanTrend {
          spcProductIControlMeanYearTrend {
            year
            purpose
            mean
          }
          spcProductIControlMeanSeasonTrend {
            year
            season
            purpose
            mean
          }
          spcProductIControlMeanMonthTrend {
            year
            season
            month
            purpose
            mean
          }
          spcProductIControlMeanWeekTrend {
            year
            season
            month
            week
            purpose
            mean
          }
          spcProductIControlMeanDayTrend {
            year
            season
            month
            week
            day
            purpose
            mean
          }
        }
        iControlCpCpkTrend {
          spcProductIControlCpCpkYearTrend {
            year
            purpose
            cpk
            cp
          }
          spcProductIControlCpCpkSeasonTrend {
            year
            season
            purpose
            cpk
            cp
          }
          spcProductIControlCpCpkMonthTrend {
            year
            season
            month
            purpose
            cpk
            cp
          }
          spcProductIControlCpCpkWeekTrend {
            year
            season
            month
            week
            purpose
            cpk
            cp
          }
          spcProductIControlCpCpkDayTrend {
            year
            season
            month
            week
            day
            purpose
            cpk
            cp
          }
        }
        iControlCovTrend {
          spcProductIControlCovYearTrend {
            year
            purpose
            cov
          }
          spcProductIControlCovSeasonTrend {
            year
            season
            purpose
            cov
          }
          spcProductIControlCovMonthTrend {
            year
            season
            month
            purpose
            cov
          }
          spcProductIControlCovWeekTrend {
            year
            season
            month
            week
            purpose
            cov
          }
          spcProductIControlCovDayTrend {
            year
            season
            month
            week
            day
            purpose
            cov
          }
        }
      }
    }`,
		variables: params
	})
}
// 关联条目查询
export function SpcProductSelectConnectControlValue(params) {
	return apolloClient.mutate({
		mutation: gql`mutation SpcProductSelectConnectControlValue($input: SpcProductInput) {
      spcProductSelectConnectControlValue(input: $input) {
        total
        list {
          status
          change_time
          serial_num
          product_value
          sigma_in
          r_value
          control_type
          group_type
        }
      }
    }`,
		variables: params
	})
}