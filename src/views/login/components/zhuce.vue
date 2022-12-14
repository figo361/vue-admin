<template>
  <div
    style="
      width: 1000px;
      height: 750px;
      margin-top: 10px;
      margin-left: 10px;
      margin-right: 10px;
      background-color: rgb(255, 255, 255);
    "
  >
    <h3 style="margin-left: 300px; margin-top: 10px; font-size: 20px">
      供应商注册表
    </h3>
    <div style="margin-top: 30px; margin-left: 100px">
      <el-form :inline="true" style="margin-top: 10px" label-width="120px">
        <el-form-item label="账号">
          <el-input
            style="width: 400px"
            v-model="input1"
            type="text"
            placeholder="账号"
          />
        </el-form-item>
      </el-form>
      <el-form :inline="true" style="margin-top: 10px" label-width="120px">
        <el-form-item label="密码">
          <el-input
            v-model="input2"
            style="width: 400px"
            type="password"
            placeholder="密码"
            show-password
          />
        </el-form-item>
      </el-form>
      <el-form :inline="true" style="margin-top: 10px" label-width="120px">
        <el-form-item label="确认密码">
          <el-input
            style="width: 400px"
            v-model="input3"
            type="password"
            placeholder="确认密码"
            show-password
          />
        </el-form-item>
      </el-form>
      <el-form :inline="true" style="margin-top: 10px" label-width="120px">
        <el-form-item label="单位名称">
          <el-input
            style="width: 400px"
            v-model="input4"
            type="text"
            placeholder="单位名称"
          />
        </el-form-item>
      </el-form>
      <el-form :inline="true" style="margin-top: 10px" label-width="120px">
        <el-form-item label="统一社会信用代码">
          <el-input
            style="width: 400px"
            v-model="input5"
            type="text"
            placeholder="统一社会信用代码"
          />
        </el-form-item>
      </el-form>
      <el-form :inline="true" style="margin-top: 10px" label-width="120px">
        <el-form-item label="法人代表">
          <el-input
            style="width: 400px"
            v-model="input6"
            type="text"
            placeholder="法人代表"
          />
        </el-form-item>
      </el-form>
      <el-form :inline="true" style="margin-top: 10px" label-width="120px">
        <el-form-item label="注册地址">
          <el-input
            style="width: 400px"
            v-model="input7"
            type="text"
            placeholder="注册地址"
          />
        </el-form-item>
      </el-form>
      <el-form :inline="true" style="margin-top: 10px" label-width="120px">
        <el-form-item label="主要产品">
          <el-input
            style="width: 400px"
            v-model="input8"
            type="text"
            placeholder="主要产品"
          />
        </el-form-item>
      </el-form>
      <el-form :inline="true" style="margin-top: 10px" label-width="120px">
        <el-form-item label="联系人">
          <el-input
            style="width: 400px"
            v-model="input9"
            type="text"
            placeholder="联系人"
          />
        </el-form-item>
      </el-form>
      <el-form :inline="true" style="margin-top: 10px" label-width="120px">
        <el-form-item label="联系电话">
          <el-input
            style="width: 400px"
            v-model="input10"
            type="text"
            placeholder="联系电话"
          />
        </el-form-item>
      </el-form>
      <el-form style="margin-left: 200px">
        <el-row class="mb-4">
          <el-button type="primary" @click="onSubmit">注册</el-button>
          <el-button>重置</el-button>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";

const input1 = ref("");
const input2 = ref("");
const input3 = ref("");
const input4 = ref("");
const input5 = ref("");
const input6 = ref("");
const input7 = ref("");
const input8 = ref("");
const input9 = ref("");
const input10 = ref("");
const onSubmit = () => {
  console.log("submit!");
};
</script>

<script lang="ts">
export default {
  name: "reSupplier",
  setup() {
    return {};
  }
};
</script>

<style scoped></style>
