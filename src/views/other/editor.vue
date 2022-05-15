<template>
  <div class="editor">
    <Toolbar
      style="border-bottom: 1px solid #ccc;"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      mode="default"
    />
    <Editor
      style="height: 300px; overflow-y: hidden; text-align: left;"
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      mode="default"
      @onCreated="handleCreated"
    />
  </div>

  <div class="plugins-tips">
    wangEditor：轻量级 web 富文本编辑器，配置方便，使用简单。
    访问地址：
    <a href="https://www.wangeditor.com/" target="_blank">wangEditor</a>
  </div>
</template>

<script lang="ts" setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref('<p>hello😀</p>')

// 模拟 ajax 异步获取内容
// onMounted(() => {
//     setTimeout(() => {
//         valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>'
//     }, 1500)
// })

const toolbarConfig = {}
const editorConfig = { 
  placeholder: '请输入内容...',
  scroll: false,
}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})

const handleCreated = (editor: any) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}
</script>

<style scoped lang="less">
.editor{
  border: 1px solid #ccc;
  width: 1000px;
  height: 400px;
}
.plugins-tips{
  text-align: left;
}
</style>