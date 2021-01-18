<template>
  <el-row :gutter="20">
    <el-col :span="20" :offset="2"><TeachersWantedHeader></TeachersWantedHeader></el-col>
    <div style="margin-top: 10px" align="center">
      <el-table
        :data="hire_teacher_Data.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))"
        style="width: 82%"
        height="500"
      ><!--height可实现固定表头的表格-->
        <el-table-column align="center"
                         label="招聘主题"
                         prop="title">
        </el-table-column>
        <el-table-column align="center"
                         label="招聘 ID"
                         prop="msgid">
        </el-table-column>
        <el-table-column align="center"
                         label="家教要求"
                         prop="identities">
        </el-table-column>
        <el-table-column align="center"
                         label="招聘发布时间"
                         prop="publish">
        </el-table-column>
        <el-table-column v-if="false"
                         label="家长 ID"
                         prop="pid">
        </el-table-column>
        <!--点击查看，跳转到招聘页面详情-->
        <el-table-column align="center"
                         label="操作"
                         width="150">
          <template slot-scope="scope">
            <router-link
              :to="`/parentDetail/${scope.row.msgid}/${scope.row.pid}`"><!--传俩id-->
              <el-button type="text" size="small" icon="el-icon-thumb">查看</el-button>
            </router-link>
          </template>
        </el-table-column>
        <!--搜索框（根据招聘主题即科目筛选招聘信息）-->
        <el-table-column
          align="right"
          width="190">
          <template slot="header" slot-scope="scope">
            <el-input
              prefix-icon="el-icon-search"
              v-model="search"
              size="mini"
              placeholder="输入招聘科目进行筛选"/>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-row>
</template>

<script>
  import TeachersWantedHeader from "./TeachersWantedHeader";
  import axios from 'axios'
  export default {
    name: "TeachersWanted",
    data() {
      return {
        hire_teacher_Data: [],
        search: ''
      }
    },
    components: {
      TeachersWantedHeader
    },
    mounted() {
      axios.get('/api/Rec_Information.json')
        .then(
          (resp) => {
            this.hire_teacher_Data = resp.data.hireinformation
            //数据拿到，ok!
            console.log(this.hire_teacher_Data)
          },
          (err) => {
            console.log(err);
          }
        )
    }
  }
</script>

<style scoped>

</style>
