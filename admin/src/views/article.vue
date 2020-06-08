<template>
  <div class="main">
    <div class="header">
      <el-row>
        <el-col :span="6">
          <div>
            <el-input v-model="input" placeholder="搜索文件"></el-input>
            <el-buttton @click="addArticle">新增</el-buttton>
          </div>
        </el-col>
        <el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>
      </el-row>
    </div>
    <div class="table">
      <el-table :data="tableData">
        <el-table-column prop="date" label="文章" width="250"> </el-table-column>
        <el-table-column prop="name" label="姓名" width="120"> </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
        <el-table-column prop="address" label="发布时间"> </el-table-column>
        <el-table-column prop="address" label="发布时间"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { getArticle } from '@/api/article'
export default {
  name: 'article',
  data() {
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄',
    }
    return {
      tableData: Array(10).fill(item),
    }
  },
  methods: {
    async addArticle() {
      try {
        const res = await getArticle()
      } catch (error) {
        
      }
      
    },
  },
}
</script>
<style lang="scss">
.main {
  // background-color:rgba(0,0,0,.1);
  .table {
    margin-top: 20px;
  }
}
</style>
