<template>
  <el-upload
    ref="upload"
    class="upload-demo"
    action="http://localhost:3000/11"
    accept=".xls, .xlsx"
    method="post"
    :limit="1"
    :on-exceed="handleExceed"
    :before-upload="beforeUpload"
    :auto-upload="false"
    :on-change="handchange"
  >
    <template #trigger>
      <el-button type="primary">select file</el-button>
    </template>
    <el-button class="ml-3" type="success" @click="submitUpload">
      upload to server
    </el-button>
    <template #tip>
      <div class="el-upload__tip text-red">
        limit 1 file, new file will cover the old file
      </div>
    </template>
  </el-upload>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { genFileId } from "element-plus";
import * as XLSX from "xlsx";
import { readFile, character } from "../../plugins/readFile";
import type { UploadInstance, UploadProps, UploadRawFile } from "element-plus";

const upload = ref<UploadInstance>();
const js_data = ref("");
const handchange: UploadProps["onChange"] = async file => {
  const data = await readFile(file.raw);
  const workbook = XLSX.read(data, { type: "binary", cellDates: true });
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const json = XLSX.utils.sheet_to_json(worksheet);
  const arr = [];

  // for (let key in character) {
  //   let events = { key: false };
  //   if (Object.prototype.hasOwnProperty.call(events, key)) {
  //     // This would compile without any issue !
  //     console.log("The object has the property");
  //   }
  // }

  json.forEach(item => {
    // console.log(item);
    const obj = {};
    Object.keys(character).forEach(key => {
      let v = character[key];
      const text = v.text;
      const type = v.type;
      v = item[text] || "";
      type === "string" ? (v = String(v)) : null;
      type === "number" ? (v = Number(v)) : null;
      obj[key] = v;
    });

    arr.push(obj);
  });
  console.log(arr);
  // let data_js = JSON.stringify(json);
  // js_data.value = data_js;
};
const handleExceed: UploadProps["onExceed"] = (files, uploadFiles) => {
  console.log(files, uploadFiles);
  upload.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  upload.value!.handleStart(file);
};

const beforeUpload = UploadRawFile => {
  console.log("before-upload", UploadRawFile);
};

const submitUpload = () => {
  console.log(js_data.value);
  // upload.value!.submit();
};
</script>
