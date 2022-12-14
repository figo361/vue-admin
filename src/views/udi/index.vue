<script lang="ts" setup>
import { reactive, computed, ref } from "vue";
import { http } from "@/utils/http";
import { ElMessage } from "element-plus";

interface info {
  d_change: string;
  n_active: string;
  n_fy_price: string;
  s_factory: string;
  s_flag: string;
  s_fy_name: string;
  s_fy_no: string;
  s_fy_type: string;
  s_fy_unit: string;
  s_nation_yb_code: string;
  s_nation_yb_name: string;
  s_product_type: string;
  s_province_yb_code: string;
  s_province_yb_name: string;
  s_sort_out: string;
  s_supplier: string;
}
const multipleSelection = ref<info[]>([]);
const handleSelectionChange = (val: info[]) => {
  multipleSelection.value = val;
};
const factory = ref("");

const res = http.request("get", "/get_feefactory");
res
  .then(result => {
    factory.value = result;
  })
  .catch(e => {
    ElMessage.error(e + "未检索到数据确认检索条件是否有问题！");
    return;
  });

const search = ref("");
const filterTableData = computed(() =>
  tableData.value.filter(
    data =>
      !search.value ||
      data.s_fy_name.toLowerCase().includes(search.value.toLowerCase())
  )
);
const handlesave = (index: number, row: info) => {
  const data = {
    fy_no: row.s_fy_no,
    sort_out: row.s_sort_out
  };
  const res = http.request("post", "/updatesortout", { data: data });
  res
    .then(result => {
      ElMessage.success(result.data);
    })
    .catch(e => {
      ElMessage.error(e);
      return;
    });
};
const handleEdit = (index: number, row: info) => {
  const data = {
    fy_no: row.s_fy_no,
    active: 2
  };
  const res = http.request("post", "/updatefee", { data: data });
  res
    .then(result => {
      ElMessage.success(result.data);
      row.n_active = 2;
    })
    .catch(e => {
      ElMessage.error(e);
      return;
    });
};
const handleDelete = (index: number, row: info) => {
  const data = {
    fy_no: row.s_fy_no,
    active: 0
  };
  const res = http.request("post", "/updatefee", { data: data });
  res
    .then(result => {
      ElMessage.success(result.data);
      row.n_active = 0;
    })
    .catch(e => {
      ElMessage.error(e);
      return;
    });
};
const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0);
const condition = ref("");
const tableData: info[] = ref([]);
const formInline = reactive({
  name: "",
  factory: "",
  active: ""
});
const handleSizeChange = (val: number) => {
  pageSize.value = val;
  if (formInline.name != "") {
    condition.value =
      condition.value + " and s_fy_name like '%" + formInline.name + "%'";
  }
  if (formInline.factory != "") {
    condition.value =
      condition.value + " and s_factory = '" + formInline.factory + "'";
  }
  if (formInline.active != "") {
    condition.value =
      condition.value + " and n_active = " + formInline.active + "";
  }
  const data = {
    size: pageSize.value,
    index: currentPage.value,
    confid: condition.value
  };
  const res = http.request("post", "/udifee", { data: data });
  res
    .then(result => {
      tableData.value = result;
      total.value = result[0].rows;
      condition.value = "";
    })
    .catch(e => {
      ElMessage.error(e + "未检索到数据确认检索条件是否有问题！");
      condition.value = "";
      total.value = 0;
      return;
    });
};
const handleCurrentChange = (val: number) => {
  currentPage.value = val;
  if (formInline.name != "") {
    condition.value =
      condition.value + " and s_fy_name like '%" + formInline.name + "%'";
  }
  if (formInline.factory != "") {
    condition.value =
      condition.value + " and s_factory = '" + formInline.factory + "'";
  }
  if (formInline.active != "") {
    condition.value =
      condition.value + " and n_active = " + formInline.active + "";
  }
  // condition.value =formInline
  const data = {
    size: pageSize.value,
    index: currentPage.value,
    confid: condition.value
  };
  const res = http.request("post", "/udifee", { data: data });
  res
    .then(result => {
      tableData.value = result;
      total.value = result[0].rows;
      condition.value = "";
    })
    .catch(e => {
      ElMessage.error(e);
      condition.value = "";
      total.value = 0;
      return;
    });
};
const onSubmit = () => {
  if (formInline.name != "") {
    condition.value =
      condition.value + " and s_fy_name like '%" + formInline.name + "%'";
  }
  if (formInline.factory != "") {
    condition.value =
      condition.value + " and s_factory = '" + formInline.factory + "'";
  }
  if (formInline.active != "") {
    condition.value =
      condition.value + " and n_active = " + formInline.active + "";
  }

  const data = {
    size: pageSize.value,
    index: currentPage.value,
    confid: condition.value
  };
  const res = http.request("post", "/udifee", { data: data });
  res
    .then(result => {
      tableData.value = result;
      total.value = result[0].rows;
      condition.value = "";
    })
    .catch(e => {
      ElMessage.error(e + "未检索到数据确认检索条件是否有问题！");
      condition.value = "";
      total.value = 0;
      return;
    });
};
const onactive = () => {
  // console.log(multipleSelection.value.s_fy_no);
  multipleSelection.value.forEach(row => {
    const data = {
      fy_no: row.s_fy_no,
      active: 2
    };
    const res = http.request("post", "/updatefee", { data: data });
    res
      .then(result => {
        ElMessage.success(result.data);
        row.n_active = 2;
      })
      .catch(e => {
        ElMessage.error(e);
        return;
      });
  });
};
const onstop = () => {
  multipleSelection.value.forEach(row => {
    const data = {
      fy_no: row.s_fy_no,
      active: 0
    };
    const res = http.request("post", "/updatefee", { data: data });
    res
      .then(result => {
        ElMessage.success(result.data);
        row.n_active = 0;
      })
      .catch(e => {
        ElMessage.error(e);
        return;
      });
  });
};
const formatstatus = row => {
  const active = row.n_active;
  if (active === 0) {
    return "停用";
  } else {
    return "启用";
  }
};
const formatedate = row => {
  let date = row.d_change;
  if (date) {
    date = new Date(date);
    const y = date.getFullYear() + "-";
    const mon = date.getMonth() + 1 + "-";
    const d = date.getDate();
    return y + mon + d;
  } else {
    return "";
  }
};
const tableRowClassName = ({ row }: { row: info }) => {
  if (row.n_active === 0) {
    return "warning-row";
  }
  return "";
};
const editData = (row, column) => {
  row[column.property + "isShow"] = true;
};
const alterData = (row, column) => {
  row[column.property + "isShow"] = false;
};
</script>
<template>
  <div class="common-layout">
    <!-- <el-container> -->
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="商品名称">
        <el-input v-model="formInline.name" placeholder="商品名称" />
      </el-form-item>
      <el-form-item label="厂家">
        <el-select
          v-model="formInline.factory"
          placeholder="厂家"
          filterable
          collapse-tags-tooltip="true"
        >
          <el-option
            v-for="item in factory"
            :key="item.value"
            :label="item.value"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="formInline.active" placeholder="状态">
          <el-option label="启用" value="2" />
          <el-option label="停用" value="0" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="success" @click="onactive">全部启用</el-button>
        <el-button type="danger" @click="onstop">全部停用</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="filterTableData"
      style="width: 120%"
      :table-layout="auto"
      stripe
      highlight-current-row
      :row-class-name="tableRowClassName"
      @selection-change="handleSelectionChange"
      @cell-dblclick="editData"
    >
      <el-table-column type="selection" />
      <el-table-column label="收费名称" prop="s_fy_name" />
      <el-table-column
        label="修改时间"
        prop="d_change"
        :formatter="formatedate"
      />
      <el-table-column label="状态" prop="n_active" :formatter="formatstatus">
        <!-- <template v-slot="scope">
            <div
              :style="{
                color: scope.row.n_active === 2 ? '#95d475' : 'red'
              }"
              :formatter="formatstatus"
            >
              {{ scope.row.n_active }}
            </div> -->
        <!-- </template> -->
      </el-table-column>
      <el-table-column label="费用" prop="n_fy_price" />
      <el-table-column label="生产商" prop="s_factory" />
      <el-table-column label="收费类型" prop="s_flag" />
      <el-table-column label="收费编码" prop="s_fy_no" />
      <el-table-column label="规格" prop="s_fy_type" />
      <el-table-column label="单位" prop="s_fy_unit" />
      <el-table-column label="国家医保码" prop="s_nation_yb_code" />
      <el-table-column label="国家医保项目名称" prop="s_nation_yb_name" />
      <el-table-column label="型号" prop="s_product_type" />
      <el-table-column label="福建医保码" prop="s_province_yb_code" />
      <el-table-column label="福建医保项目名称" prop="s_province_yb_name" />
      <el-table-column label="除外内容" prop="s_sort_out" width="150">
        <template v-slot="scope">
          <!-- <el-input
              v-model="scope.row.s_sort_out"
              placeholder="请输入内容容"
            /> -->
          <el-input
            v-if="scope.row[scope.column.property + 'isShow']"
            :ref="scope.column.property"
            v-model="scope.row.s_sort_out"
            @blur="alterData(scope.row, scope.column)"
          />
          <span v-else>{{ scope.row.s_sort_out }}</span>
        </template>
      </el-table-column>
      <el-table-column label="供应商" prop="s_supplier" />
      <el-table-column fixed="right" width="200">
        <template #header>
          <el-input v-model="search" size="default" placeholder="查找" />
        </template>
        <template #default="scope">
          <el-button
            size="small"
            type="primary"
            @click="handlesave(scope.$index, scope.row)"
            >保存</el-button
          >
          <el-button
            size="small"
            type="success"
            @click="handleEdit(scope.$index, scope.row)"
            >启用</el-button
          >

          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >停用</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- <div class="demo-pagination-block"> -->
    <!-- <div class="demonstration">All combined</div> -->
    <el-pagination
      v-model:currentPage="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[10, 30, 50, 100, 200, 300, 400]"
      :small="small"
      :disabled="disabled"
      :background="true"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <!-- </div> -->
    <!-- </el-container> -->
  </div>
</template>
<style scoped>
.el-table .warning-row {
  --el-table-tr-bg-color: "red";
}

.el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}
</style>
