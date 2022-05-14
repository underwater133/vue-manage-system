
<template>
  <div class="container">
    <div class="title">支持拖拽上传</div>
    <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple show-file-list>

      <el-icon class="el-icon--upload">
        <upload-filled />
      </el-icon>
      <div class="el-upload__text">
        将文件拖到此处或<em>点击上传</em>
      </div>
      <template #tip>
        <div class="el-upload__tip">
          只能上传 jpg/png 文件，且不超过 500kb
        </div>
        <div class="title">已上传列表</div>
      </template>

    </el-upload>



  </div>

</template>


<script lang="ts" setup>
import { UploadFilled } from '@element-plus/icons-vue'
</script>

<style scoped lang="less">
.container {
  width: 500px;

  .title {
    font-weight: 400;
    line-height: 50px;
    margin: 10px 0;
    font-size: 22px;
    color: black;
  }

  .is-selected {
    color: #1989fa;
  }
}
</style>