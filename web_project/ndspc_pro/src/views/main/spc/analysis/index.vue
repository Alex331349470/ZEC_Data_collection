<template>
  <div class="box">
    <div class="search-box">
      <el-form ref="form" :model="searchForm" label-width="80px" size="small">
        <el-form-item label="来料信息：">
          <el-form-item label="工厂" label-width="40px" >
            <MultipleSelect 
              productType="spc-product"
              inputWidth="220px"
              :selectOption="options"
              selectTypeName="factory"
              @handleChange='searchForm.factory=$event' />
          </el-form-item>
          <el-form-item label="车间" label-width="60px" >
            <MultipleSelect 
              productType="spc-product"
              inputWidth="220px"
              :selectOption="options"
              selectTypeName="workshop"
              @handleChange='searchForm.workshop=$event' />
          </el-form-item>
          <el-form-item label="产线" label-width="80px" >
            <MultipleSelect 
              productType="spc-product"
              inputWidth="220px"
              :selectOption="options"
              selectTypeName="line"
              @handleChange='searchForm.line=$event' />
          </el-form-item>
        </el-form-item>
        <el-form-item label="物料信息：" >
          <el-form-item label="物料类型" label-width="60px" >
            <MultipleSelect 
              productType="spc-product"
              inputWidth="220px"
              :selectOption="options"
              selectTypeName="materialType"
              @handleChange='searchForm.materialType=$event' />
          </el-form-item>
          <el-form-item label="物料编码" label-width="80px" >
            <MultipleSelect 
              productType="spc-product"
              inputWidth="220px"
              :selectOption="options"
              selectTypeName="materialCode"
              @handleChange='searchForm.materialCode=$event' />
          </el-form-item>
        </el-form-item>
        <el-form-item label="检测信息：" >
          <el-form-item label="特性类型" label-width="60px" >
            <MultipleSelect 
              productType="spc-product"
              inputWidth="220px"
              :selectOption="options"
              selectTypeName="propertyType"
              @handleChange='searchForm.propertyType=$event' />
          </el-form-item>
          <el-form-item label="检测项目" label-width="80px" >
            <MultipleSelect 
              productType="spc-product"
              inputWidth="220px"
              :selectOption="options"
              selectTypeName="testItem"
              @handleChange='searchForm.testItem=$event' />
          </el-form-item>
          <el-button type="success" size="small"  @click="getData" style="margin-left: 25px;margin-top: -10px">查询</el-button>
        </el-form-item>
        <div class="search-contral">
          <MultipleSelect 
            productType="spc-product"
            inputWidth="100%"
            :selectOption="options"
            selectTypeName="analyzeNum"
            placeholder="分析型控制图编码"
            @handleChange='searchForm.analyzeNum=$event' />
          <el-button class="system-btn" type="success"  @click="addFile">新增控制图</el-button>
          <el-button class="system-btn" type="success"  @click="editFile" :disabled="!selectionItem || selectionItem.length !== 1">修改</el-button>
          <el-button class="system-btn" type="success"  @click="importFile" >数据导入</el-button>
          <el-button class="system-btn" type="success"  @click="checkCarts" :disabled="!selectionItem || selectionItem.length !== 1">查看分析型控制图</el-button>
          <!-- <el-button type="danger" @click="handleDelete" :disabled="!selectionItem || selectionItem.length === 0">删除</el-button> -->
        </div>
      </el-form>
    </div>
    <div class="content-box">
      <el-table :data="tableData" v-loading="loading" style="width: 100%; font-size: 13px; font-size: 13px" ref="multipleTable" @selection-change="handleSelectionChange" :header-cell-style="{background:'#f0f2f5'}">
        <el-table-column type="selection" width="40" align="center" fixed="left" />
        <el-table-column prop="analyze_num" label="分析控制图编码" :show-overflow-tooltip="true" sortable width="160" align="center" />
        <el-table-column prop="status" label="分析状态" sortable :show-overflow-tooltip="true" width="120" align="center">
          <template #default="scope">
            <span :style="{background: getStatusLabel(scope.row.status).color}" class="table_tag">{{getStatusLabel(scope.row.status).label}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="change_time" label="变更次数" sortable :show-overflow-tooltip="true" width="120" align="center" />
        <el-table-column prop="material_code" label="物料编码" sortable :show-overflow-tooltip="true" width="120" align="center" />
        <!-- <el-table-column prop="bianNum" label="物料名称" sortable :show-overflow-tooltip="true" width="120" align="center" /> -->
        <el-table-column prop="analyze_column" label="检测项目" sortable :show-overflow-tooltip="true" width="120" align="center" />
        <!-- <el-table-column prop="bianNum" label="工厂编码" sortable :show-overflow-tooltip="true" width="120" align="center" /> -->
        <el-table-column prop="factory" label="工厂名称" sortable :show-overflow-tooltip="true" width="120" align="center" />
        <el-table-column prop="workshop" label="车间" sortable :show-overflow-tooltip="true" width="100" align="center" />
        <el-table-column prop="line" label="产线" sortable :show-overflow-tooltip="true" width="100" align="center" />
        <el-table-column prop="material_type" label="物料类型" sortable :show-overflow-tooltip="true" width="120" align="center" />
        <el-table-column prop="control_type" label="控制图类型" sortable :show-overflow-tooltip="true" width="140" align="center" />
        <el-table-column prop="group_type" label="子组件大小" sortable :show-overflow-tooltip="true" width="140" align="center" />
        <el-table-column prop="property_type" label="特性类型" sortable :show-overflow-tooltip="true" width="120" align="center" />
        <el-table-column label="操作" width="160" align="center" fixed="right">
          <template #default="scope">
            <el-button @click.prevent="handleAssociation(scope.row)" link type="primary" >关联</el-button>
            <el-button @click.prevent="handleDetail(scope.row)" link type="primary" >明细</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <Pagination :page_num="searchForm.pageNum"
        :page_size="searchForm.pageSize"
        @update:pageChange="pageChange"
        :total="total"
      />
    </div>
    <!-- 新增/修改 -->
    <ComDialog ref="dialogRef" :dialogTitle="dialogTitle" @confirmEmitBtn="confirmBtn" top="0">
      <div style="padding: 20px;height: calc(100vh - 134px);overflow: auto;">
        <el-form ref="workRef" :model="addForm" width="400px" :rules="rules" style="margin-top: 15px;" :validate-on-rule-change="false">
          <el-divider content-position="center"><span style="color: red">*</span>基础信息</el-divider>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="工序:" prop="materialCode" label-width="120px">
                <el-input value="成品" placeholder="请输入内容" disabled style="width: 220px;"></el-input>
              </el-form-item>
              <el-form-item label="物料编码：" prop="materialCode" label-width="120px" required>
                <MultipleSelect 
                  productType="spc"
                  inputWidth="220px"
                  :selectOption="options1"
                  selectTypeName="materialCode"
                  selectType="single"
                  :selectValue="addForm.materialCode"
                  @handleChange='addForm.materialCode=$event'
                />
              </el-form-item>
              <el-form-item label="特性类型：" prop="propertyType" label-width="120px">
                <MultipleSelect 
                  productType="spc"
                  inputWidth="220px"
                  :selectOption="options1"
                  selectTypeName="propertyType"
                  :selectValue="addForm.propertyType"
                  selectType="single"
                  @handleChange='addForm.propertyType=$event'
                />
              </el-form-item>
              <el-form-item label="控制图类型：" prop="controlType" label-width="120px">
                <MultipleSelect 
                  productType="spc"
                  inputWidth="220px"
                  :selectOption="options1"
                  selectTypeName="controlType"
                  selectType="disabled"
                  @handleChange='addForm.controlType=$event'
                />
              </el-form-item>
              <el-form-item label="子组大小：" prop="groupType" label-width="120px" required>
                <el-input type="number"  v-model.number="addForm.groupType" placeholder="请输入数值" style="width: 220px;"></el-input>
              </el-form-item>
              <el-form-item label="分析控制图编码：" prop="analyzeCode" label-width="120px">
                <el-input v-model="addForm.analyzeCode" placeholder="请输入内容" disabled style="width: 220px;"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="工厂：" prop="factory" label-width="120px">
                <MultipleSelect 
                  productType="spc"
                  inputWidth="220px"
                  :selectOption="options1"
                  selectTypeName="factory"
                  selectType="single"
                  :selectValue="addForm.factory"
                  @handleChange='addForm.factory=$event'
                />
              </el-form-item>
              <el-form-item label="车间：" prop="workshop" label-width="120px" required>
                <MultipleSelect 
                  productType="spc"
                  inputWidth="220px"
                  :selectOption="options1"
                  selectTypeName="workshop"
                  selectType="single"
                  :selectValue="addForm.workshop"
                  @handleChange='addForm.workshop=$event'
                />
              </el-form-item>
              <el-form-item label="产线：" prop="line" label-width="120px" required>
                <MultipleSelect 
                  productType="spc"
                  inputWidth="220px"
                  :selectOption="options1"
                  selectTypeName="line"
                  selectType="single"
                  :selectValue="addForm.line"
                  @handleChange='addForm.line=$event'
                />
              </el-form-item>
              <el-form-item label="物料类型：" prop="materialType" label-width="120px">
                <MultipleSelect 
                  productType="spc"
                  inputWidth="220px"
                  :selectOption="options1"
                  selectTypeName="materialType"
                  selectType="single"
                  :selectValue="addForm.materialType"
                  @handleChange='addForm.materialType=$event'
                />
              </el-form-item>
              <el-form-item label="检测项目：" prop="testItem" label-width="120px" required>
                <MultipleSelect 
                  productType="spc"
                  inputWidth="220px"
                  :selectOption="options1"
                  selectTypeName="testItem"
                  selectType="single"
                  :selectValue="addForm.testItem"
                  @handleChange='addForm.testItem=$event'
                />
              </el-form-item>
              <el-form-item label="负责人：" prop="review" label-width="120px" required>
                <MultipleSelect 
                  productType="spc"
                  inputWidth="220px"
                  :selectOption="options1"
                  selectTypeName="review"
                  selectType="single"
                  :selectValue="addForm.review"
                  @handleChange='addForm.review=$event'
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-divider content-position="center">规格</el-divider>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="上限值：" prop="usl" label-width="120px">
                <el-input type="number"  v-model.number="addForm.usl" placeholder="请输入内容" style="width: 220px;" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="下限值：" prop="lsl" label-width="120px">
                <el-input type="number"  v-model.number="addForm.lsl" pplaceholder="请输入内容" style="width: 220px;" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-divider content-position="center"><span style="color: red">*</span>统计目标</el-divider>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="Mean偏移目标线：" prop="mean" label-width="120px" required>
                <el-input type="number"  v-model.number="addForm.mean" pplaceholder="请输入内容" style="width: 220px;" ></el-input>
              </el-form-item>
              <el-form-item label="COV目标线：" prop="covPurpose" label-width="120px" required>
                <el-input type="number"  v-model.number="addForm.covPurpose" pplaceholder="请输入内容" style="width: 220px;" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Cpk目标线：" prop="cpk" label-width="120px" required>
                <el-input type="number"  v-model.number="addForm.cpk" pplaceholder="请输入内容" style="width: 220px;" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-divider content-position="center">控制限</el-divider>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="上控制限：" prop="ucl" label-width="120px">
                <el-input type="number"  v-model.number="addForm.ucl" pplaceholder="请输入内容" style="width: 220px;" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="下控制限：" prop="lcl" label-width="120px">
                <el-input type="number"  v-model.number="addForm.lcl" pplaceholder="请输入内容" style="width: 220px;" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-divider content-position="center"><span style="color: red">*</span>判异准则①:1个点距离中心线大于_个标准差</el-divider>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="状态:" prop="rule1Status" label-width="120px">
                <el-checkbox v-model="addForm.rule1Status" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="参数：" prop="rule1" label-width="120px" required>
                <el-input type="number"  v-model.number="addForm.rule1" pplaceholder="请输入内容" style="width: 220px;" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-divider content-position="center"><span style="color: red">*</span>判异准则②:连续_点在中心线的同一侧</el-divider>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="状态:" prop="rule2Status" label-width="120px">
                <el-checkbox v-model="addForm.rule2Status" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="参数：" prop="rule2" label-width="120px" required>
                <el-input type="number"  v-model.number="addForm.rule2" pplaceholder="请输入内容" style="width: 220px;" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-divider content-position="center"><span style="color: red">*</span>判异准则③:连续_点全部递增或者递减</el-divider>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="状态:" prop="rule3Status" label-width="120px">
                <el-checkbox v-model="addForm.rule3Status" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="参数：" prop="rule3" label-width="120px" required>
                <el-input type="number"  v-model.number="addForm.rule3" pplaceholder="请输入内容" style="width: 220px;" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-divider content-position="center"><span style="color: red">*</span>判异准则④:连续_点上下交错</el-divider>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="状态:" prop="rule4Status" label-width="120px">
                <el-checkbox v-model="addForm.rule4Status" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="参数：" prop="rule4" label-width="120px" required>
                <el-input type="number"  v-model.number="addForm.rule4" pplaceholder="请输入内容" style="width: 220px;" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-divider content-position="center"><span style="color: red">*</span>判异准则⑤:_点(K)中存在K-1个点距离中心线(同侧)大于两个标准差</el-divider>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="状态:" prop="rule5Status" label-width="120px">
                <el-checkbox  v-model="addForm.rule5Status" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="参数：" prop="rule5" label-width="120px" required>
                <el-input type="number" v-model.number="addForm.rule5" pplaceholder="请输入内容" style="width: 220px;" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-divider content-position="center"><span style="color: red">*</span>判异准则⑥:_点(K)中存在K-1个点距离中心线(同侧)大于一个标准差</el-divider>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="状态:" prop="rule6Status" label-width="120px">
                <el-checkbox v-model="addForm.rule6Status" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="参数：" prop="rule6" label-width="120px" required>
                <el-input type="number"  v-model.number="addForm.rule6" pplaceholder="请输入内容" style="width: 220px;" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-divider content-position="center"><span style="color: red">*</span>判异准则⑦:连续 点距离中心线(任一侧)1个标准差以内</el-divider>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="状态:" prop="rule7Status" label-width="120px">
                <el-checkbox v-model="addForm.rule7Status" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="参数：" prop="rule7" label-width="120px" required>
                <el-input type="number"  v-model.number="addForm.rule7" pplaceholder="请输入内容" style="width: 220px;" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-divider content-position="center"><span style="color: red">*</span>判异准则⑧:连续_点距离中心线(任一侧)大于1个标准差</el-divider>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="状态:" prop="rule8Status" label-width="120px">
                <el-checkbox v-model="addForm.rule8Status" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="参数：" prop="rule8" label-width="120px" required>
                <el-input type="number"  v-model.number="addForm.rule8" pplaceholder="请输入内容" style="width: 220px;" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-divider content-position="center"><span style="color: red">*</span>判异准则⑨:连续_点偏移_个标准差</el-divider>
          <el-row :gutter="10">
            <el-col :span="4">
              <el-form-item label="状态:" prop="rule9Status" label-width="120px">
                <el-checkbox v-model="addForm.rule9Status" />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="参数1：" prop="rule9_a1" label-width="120px" required>
                <el-input type="number"  v-model.number="addForm.rule9_a1" pplaceholder="请输入内容" style="width: 220px;" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="参数2：" prop="rule9_a2" label-width="120px" required>
                <el-input type="number"  v-model.number="addForm.rule9_a2" pplaceholder="请输入内容" style="width: 220px;" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-divider content-position="center"><span style="color: red">*</span>判异准则⑩:连续_点中存在_点以上距离中心线大于_个标准差</el-divider>
          <el-row :gutter="10">
            <el-col :span="4">
              <el-form-item label="状态:" prop="rule10Status" label-width="120px">
                <el-checkbox v-model="addForm.rule10Status" />
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="参数1：" prop="rule10_a1" label-width="120px" required>
                <el-input type="number"  v-model.number="addForm.rule10_a1" pplaceholder="请输入内容" style="width: 220px;" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="参数2：" prop="rule10_a2" label-width="120px" required>
                <el-input type="number"  v-model.number="addForm.rule10_a2" pplaceholder="请输入内容" style="width: 220px;" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="参数3：" prop="rule10_a3" label-width="120px" required>
                <el-input type="number"  v-model.number="addForm.rule10_a3" pplaceholder="请输入内容" style="width: 220px;" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-divider content-position="center">判异准则⑪:超出内控线</el-divider>
          <el-row :gutter="10">
            <el-col :span="4">
              <el-form-item label="状态:" prop="rule11Status" label-width="120px">
                <el-checkbox v-model="addForm.rule11Status" />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="控制线上限：" prop="rule11_a1" label-width="120px">
                <el-input type="number"  v-model.number="addForm.rule11_a1" pplaceholder="请输入内容" style="width: 220px;" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="控制线下限：" prop="rule11_a2" label-width="120px">
                <el-input type="number"  v-model.number="addForm.rule11_a2" pplaceholder="请输入内容" style="width: 220px;" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-divider content-position="center">判异准则⑫:连续___点的均值偏移大于___均值偏移（K）管控</el-divider>
          <el-row :gutter="10">
            <el-col :span="4">
              <el-form-item label="状态:" prop="rule12Status" label-width="120px">
                <el-checkbox v-model="addForm.rule12Status" />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="参数1：" prop="rule12_a1" label-width="120px">
                <el-input type="number"  v-model.number="addForm.rule12_a1" pplaceholder="请输入内容" style="width: 220px;" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="参数2：" prop="rule12_a2" label-width="120px">
                <el-input type="number"  v-model.number="addForm.rule12_a2" pplaceholder="请输入内容" style="width: 220px;" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </ComDialog>
    <!-- 控制图 -->
    <ComDialog ref="chartDialogRef" dialogTitle="查看分析控制图" :fullScreen="true" :hiddenFooter="true">
      <AnalysisChart ref="chartRef" @closeAllDialog="closeAllDialog"/>
    </ComDialog>
    <!-- 关联表格 -->
    <el-drawer v-model="drawer" :with-header="false" size="80%">
      <AssociationTable ref="associationRef"/>
    </el-drawer>
    <!-- 明细 -->
    <ComDialog ref="detailDialogRef" dialogTitle="明细" :hiddenFooter="true"  top="0" >
      <div style="padding: 20px;height: calc(100vh - 84px);overflow: auto;">
        <DetailForm ref="detailRef"/>
      </div>
    </ComDialog>
    <!-- 数据导入 -->
    <ComDialog ref="importDialogRef" dialogTitle="数据导入" @confirmEmitBtn="confirmImport" >
      <ImportFile ref="importRef" @closeAllDialog="closeAllDialog"/>
    </ComDialog>
  </div>
</template>
<script setup>
import { defineComponent, onMounted, reactive, ref, nextTick } from 'vue'
import { ElMessage } from 'element-plus'
import ComDialog from '@/components/comDialog/index.vue'
import Pagination from '@/components/pagination/index.vue'
import AnalysisChart from './components/analysisChart.vue'
import AssociationTable from './components/associationTable.vue'
import DetailForm from './components/detailForm.vue'
import ImportFile from './components/importFile.vue'
import MultipleSelect from '@/components/multipleSelect/index.vue'
import config from '@/utils/system/config'
import {getSpcDataList, addSPC, updateSPC, SpcProductSelectQuery, SpcProductSelect, getSpcData} from '@/api/spc/analysis'
import { get } from '@vueuse/core'

/* ------parmas--------- */
const searchForm = reactive({
  pageSize: 10,
  pageNum: 1 ,
  factory: [],
  workshop: [],
  line: [],
  materialCode: [],
  materialType: [],
  propertyType: [],
  testItem: [],
  analyzeNum: []
})
const selectionItem = ref(null)
const defaultForm = {
  materialCode: '',
  materialType: '',
  factory: '',
  line: '',
  review: '',
  propertyType: '',
  workshop: '',
  testItem: '',
  controlType: '',
  groupType: '',
  lsl: '',
  usl: '',
  lcl: '',
  ucl: '',
  covPurpose: '',
  cpk: '',
  mean:'',
  rule1: '',
  rule1Status: false,
  rule2: '',
  rule2Status: false,
  rule3: '',
  rule3Status: false,
  rule4: '',
  rule4Status: false,
  rule5: '',
  rule5Status: false,
  rule6: '',
  rule6Status: false,
  rule7: '',
  rule7Status: false,
  rule8: '',
  rule8Status: false,
  rule9_a1: '',
  rule9_a2: '',
  rule9Status: false,
  rule10_a1: '',
  rule10_a2: '',
  rule10_a3: '',
  rule10Status: false,
  rule11_a1: '',
  rule11_a2: '',
  rule11Status: false,
  rule12_a1: '',
  rule12_a2: '',
  rule12Status: false
}
const addForm = reactive({...defaultForm})
const dialogTitle = ref('新增分析型控制图')
const dialogRef = ref(false) // 新增/修改弹窗
const chartDialogRef = ref(false) // 控制图弹窗
const chartRef = ref(null) //控制图组件
const drawer = ref(false) // 关联表弹窗
const detailDialogRef = ref(false) // 明细弹窗
const detailRef = ref(null) //明细组件
const importDialogRef = ref(false) // 导入弹窗
const importRef = ref(null) //导入组件
const loading = ref(true) // 加载
const total = ref(0)
const StatusOptions = config.status // 状态标签
const options = ref({}) // 列表检索
const options1 = ref({}) // 表单
const associationRef = ref(null) // 关联表组件
const tableData = ref([])
const workRef = ref(null)
const rules = ref({
  data1: [{ required: false, message: '开始时间不能为空', trigger: 'blur' }],
  data2: [{ required: false, message: '结束时间不能为空', trigger: 'blur' }],
})
const inputSelect = config.spcPorSelect // 列表检索
const inputSelect1 = config.spcSelect // 表单检索
onMounted(() => {
  getInputSelect()
  getInputSelect1()
})
/* ------function--------- */
function onChangePage(index) {
  searchForm.pagesNum.value = index
}
// 列表检索查询
async function getInputSelect() {
  const res = await SpcProductSelectQuery({input:inputSelect})
  const data = res.data.spcProductSelectQuery
  if(data) {
      options.value = data
      Object.keys(searchForm).forEach(key => {
        if (data.hasOwnProperty(key)) {
          searchForm[key] = data[key];
        }
      })
      getData()
    }
}
// 表单检索查询
async function getInputSelect1() {
  const res = await SpcProductSelect({input:inputSelect1})
  const data = res.data.spcProductSelect
  if(data) {
    options1.value = data
  }
}
// 获取状态标签
function getStatusLabel(status) {
  const mapping = StatusOptions.find(item => item.value === status)
  return mapping ? {label: mapping.label, color: mapping.color} : {label: '未接入', color: '#b2091e'};
}
// 新增
function addFile() {
  Object.assign(addForm, { ...defaultForm })
  dialogRef.value.visible = true
  nextTick(() => {
    workRef.value.resetFields()
  })
}
// 编辑
async function editFile() {
  const newForm = await getSpcDataDetail(selectionItem.value[0].analyze_num)
  Object.assign(addForm, { ...newForm })
  dialogRef.value.visible = true
}
// table数据处理
function reduceData(option) {
  const newForm = {...defaultForm}
  const addFormKeys = Object.keys(newForm)
  option.materialCode = option.material_code
  option.materialType = option.material_type
  option.propertyType = option.property_type
  option.testItem = option.analyze_column
  option.groupType = option.group_type
  option.controlType = option.control_type
  option.covPurpose = option.cov_purpose
  option.rule1Status = option.rule1_status
  option.rule2Status = option.rule2_status
  option.rule3Status = option.rule3_status
  option.rule4Status = option.rule4_status
  option.rule5Status = option.rule5_status
  option.rule6Status = option.rule6_status
  option.rule7Status = option.rule7_status
  option.rule8Status = option.rule8_status
  option.rule9Status = option.rule9_status
  option.rule10Status = option.rule10_status
  option.rule11Status = option.rule11_status
  option.rule12Status = option.rule12_status
  for (const key of addFormKeys) {
    newForm[key] = option[key]
  }
  newForm.analyzeCode = option.analyze_num
  return newForm
}
// 添加/编辑弹窗确认
function confirmBtn() {
  workRef.value.validate(async (valid) => {
    if (valid) {
      if(addForm.analyzeCode) { // 更新
        updateSPC({input: addForm}).then(res => {
          dialogRef.value.visible = false
          ElMessage({ message: '操作成功', type: 'success'})
          getInputSelect()
        }).catch(err => {
          ElMessage({ message: '操作失败', type: 'error'})
        })
      } else { // 新增
        addSPC({input: addForm}).then(res => {
          dialogRef.value.visible = false
          ElMessage({ message: '操作成功', type: 'success'})
          getInputSelect()
        }).catch(err => {
          ElMessage({ message: '操作失败', type: 'error'})
        })
      }
    }
  })
}
// 查看分析型控制图
async function checkCarts() {
  chartDialogRef.value.visible = true
  const itemDetail = await getSpcDataDetail(selectionItem.value[0].analyze_num)
  chartRef.value.getData(itemDetail)
}
// 删除
function handleDelete() {
  ElMessage({ message: '删除成功', type: 'success'})
}
// 关联
async function handleAssociation(row) {
  drawer.value = true
  await nextTick()
  associationRef.value.getInfo(row)
}
// 明细
async function handleDetail(row) {
  detailDialogRef.value.visible = true
  const itemDetail = await getSpcDataDetail(row.analyze_num)
  nextTick(() => {
    detailRef.value.getInfo(itemDetail)
  })
}
// 导入
function importFile() {
  importDialogRef.value.visible = true
  nextTick(() => {
    importRef.value.openImport()
  })
}
// 导入确认
function confirmImport() {
  importRef.value.handleUpload()
}
// 关闭所有弹窗
function closeAllDialog() {
  importDialogRef.value.visible = false
  chartDialogRef.value.visible = false
  getData()
}
// 分页选择
function pageChange(parmas) {
  searchForm.pageNum = parmas.page_num
  searchForm.pageSize = parmas.page_size
  getData()
}
// 获取数据
async function getData() {
  console.log(searchForm)
  loading.value = true
  const res = await getSpcDataList({input: searchForm})
  const data = res.data?.spcProductTestItemSelectValues || []
  total.value = data?.total || 0
  loading.value = false
  tableData.value = data.list
}
// table选择
function handleSelectionChange(val) {
  selectionItem.value = val
}
// 根据编码获取详情
async function getSpcDataDetail(code) {
  const res = await getSpcData({input: {analyzeCode: code}})
  const data = res.data?.spcProductSelectValue || {}
  return reduceData(data)
}
</script>

<style lang="scss" scoped>
.search-box {
  width: 100%;
  background: #fff;
  padding-top: 7px;
  border-bottom: 1px solid #ddd;
  .el-form-item {
    margin-bottom: 5px!important;
  }
}
.search-box {
  padding-top: 10px;
  width: 100%;
  background: #f2f2f5;
}
.search-contral {
  padding: 10px;
  border-top: 1px solid #ddd;
  .el-button {
    margin-left: 10px;
  }
}
.pagination {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #fff;
  padding-top: 7px;
  padding-bottom: 7px;
  padding-left: 25px;
  border-top: 1px solid #ddd;
  z-index: 999;
}
.search-contral{
  display: flex;
}
.el-button--success {
  border-color: var(--system-primary-color);
  background: var(--system-primary-color);
  color: #fff!important;
}
.el-button.is-disabled {
  background-color: var(--el-button-disabled-bg-color)!important;
  border-color: var(--el-button-disabled-border-color)!important
}
.table_tag {
  padding: 2px 8px;
  color: #fff;
  font-size: 12px;
}
</style>  