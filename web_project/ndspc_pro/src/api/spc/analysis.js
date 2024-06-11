import apolloClient from '../graphql'
import gql from 'graphql-tag'
// 获取SPC数据列表
export function getSpcDataList(params) {
	return apolloClient.query({
		query: gql`query SpcProductTestItemSelectValues {
      spcProductTestItemSelectValues {
        analyze_num
        factory
        workshop
        line
        status
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
        change_time
      }
    }`,
		variables: params
	})
}
// 新增spc数据
export function addSPC(params) {
	return apolloClient.mutate({
		mutation: gql`mutation SpcProductTestItemImport($input: SpcProductTestItemSelectInput) {
      spcProductTestItemImport(input: $input) {
        message
        success
      }
    }`,
		variables: params
	})
}
// 更新spc数据
export function updateSPC(params) {
  return apolloClient.mutate({
    mutation: gql`mutation SpcProductTestItemUpdate($input: SpcProductTestItemAnalyzeInput) {
      spcProductTestItemUpdate(input: $input) {
        message
        success
      }
    }`,
    variables: params
  })
}
// 检索数据
export function SpcProductSelect(params) {
	return apolloClient.mutate({
		mutation: gql`mutation SpcProductSelect($input: ProductQCInput) {
      spcProductSelect(input: $input) {
        factory
        workshop
        line
        materialCode
        materialType
        propertyType
        testItem
        review
        controlType
        groupType
        sourceType
      }
    }`,
		variables: params
	})
}
// 变更履历
export function SpcHistory(params) {
  return apolloClient.mutate({
    mutation: gql`mutation SpcProductSelectHisValues($input: SpcProductTestItemAnalyzeInput) {
      spcProductSelectHisValues(input: $input) {
        analyze_num
        poor_amount
        backup
        factory
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
        change_time
      }
    }`,
    variables: params
  })
}