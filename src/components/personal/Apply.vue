<template>
  <el-row :gutter="20">
    <el-col :span="20" :offset="2">
      <Header></Header>
    </el-col>
    <div style="margin-top:8%;margin-left:10%;" align="center" class="app-container">
      <el-page-header @back="goBack" content="详情页面"></el-page-header>
      <el-steps
        style="margin:15px 0;font-size:13px"
        align-center
        :active="active"
        finish-status="success"
      >
        <el-step title="基本信息"></el-step>
        <el-step title="身份证正面"></el-step>
        <el-step title="身份证反面"></el-step>
      </el-steps>
      <el-form :model="addForm" ref="addFormRef" :rules="addFormRules" label-width="auto" label-position="top" style="width: 80%;margin: auto;">
        <div v-if="active ===0">
          <el-form-item label="真实姓名" prop="realName"><el-input v-model="addForm.realName"></el-input></el-form-item>
          <el-form-item label="教学经验" prop="experience"><el-input v-model="addForm.experience"></el-input></el-form-item>
          <el-form-item label="目前年龄" prop="age"><el-input v-model="addForm.age"></el-input></el-form-item>
          <el-form-item label="擅长科目" prop="goodAt">
            <el-select v-model="addForm.goodAt" placeholder="请选择">
              <el-option
                v-for="item in catelist"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="课时费用" prop="hourPrice"><el-input v-model="addForm.hourPrice"></el-input></el-form-item>
          <el-form-item label="就读院校" prop="school"><el-input v-model="addForm.school"></el-input></el-form-item>
          <el-form-item label="所在城市" prop="city">
            <el-cascader
              style="float: left"
              placeholder="请选择城市"
              :options="options"
              v-model="addForm.city"
              :show-all-levels="false">
            </el-cascader>
          </el-form-item>
        </div>
        <div v-if="active ===1">
          <el-upload
            class="upload-demo"
            action="#"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :auto-upload="false"
            :limit="1"
            :on-change="change"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </div>
        <div v-if="active ===2">
          <el-upload
            class="upload-demo"
            action="#"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :auto-upload="false"
            :limit="1"
            :on-change="change1"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </div>
        <el-form-item>
          <el-button type="primary" style="margin-bottom:15px" @click="prev" v-if="active === 1">上一步</el-button>
          <el-button
            type="primary"
            style="margin-bottom:15px"
            @click="next('addFormRef')"
            v-if="active === 0 || active === 1 "
          >下一步</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-row>
</template>
<script>
  import Header from "./Header";
  import { provinceAndCityData } from 'element-china-area-data'
  import axios from 'axios'
  const Token = localStorage.getItem('token');
  export default {
    name: "Apply",
    components: {Header},
    data(){
      return{
        options: provinceAndCityData,// 城市数据
        tokens : [],
        catelist:'',
        active: 0,
        addForm:{
          realName:'',
          experience:'',
          age:'',
          goodAt:'',
          hourPrice:'',
          school:'',
          city:''
        },
        addFormRules:{
          realName: [
            { required: true, message: "请输入真实姓名", trigger: "blur" }
          ],
          experience: [
            { required: true, message: "请输入教学经验", trigger: "blur" }
          ],
          age: [
            { required: true, message: "请输入年龄", trigger: "blur" }
          ],
          hourPrice: [
            { required: true, message: "请输入课时费用", trigger: "blur" }
          ],
          school: [
            { required: true, message: "请输入学校", trigger: "blur" }
          ],
        },
        dialogImageUrl: "",
        dialogVisible: false,
        file: ""
      }
    },
    created(){
      this.getCateList();
    },
    methods:{
      goBack(){
        this.$router.push({ name: "PersonalCenter" });
        console.log("go back");
      },
      prev() {
        --this.active;
        if (this.active < 0) {
          this.active = 0;
        }
      },
      next(formName){
        this.$refs[formName].validate(valid =>{
          if (valid) {
            if (this.active ===0){
              axios.post('http://127.0.0.1:7001/business/teacher/create',this.addForm,{
                headers:{
                  authorization:`Bearer ${Token}`,
                }
              }).then(res => {
                console.log(this.addForm)
                console.log(res.data)
                this.active ++
              })
            } else {
              this.active ++
            }
          }
        })
      },
      getCateList(){
        axios.get('http://127.0.0.1:7001/business/category/List',{
          headers:{
            authorization:`Bearer ${Token}`
          }
        }).then(
          (res) => {
            const data = res.data.data;
            this.catelist = data
            console.log(this.catelist)
          },
          (err) => {
            console.log(err);
          }
        )
      },
      handleRemove(file) {
        console.log(file);
      },
      handlePreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      change(file, fileList) {
        this.file = file.raw;
        var formData = new FormData();
        formData.append("file", this.file);
        axios.post('http://127.0.0.1:7001/business/teacher/identityCard1',formData,{
          headers:{
            authorization:`Bearer ${Token}`
          }
        }).then(res => {
          console.log(res);
          if (res.data.code === 0) {
            this.$message({
              type: "success",
              message: "图片上传成功"
            });
          } else {
            this.$message({
              type: "warning",
              message: "图片上传失败"
            });
          }
        });
      },
      change1(file, fileList) {
        this.file = file.raw;
        var formData = new FormData();
        formData.append("file", this.file);
        axios.post('http://127.0.0.1:7001/business/teacher/identityCard2',formData,{
          headers:{
            authorization:`Bearer ${Token}`
          }
        }).then(res => {
          console.log(res);
          if (res.data.code === 0) {
            this.$message({
              type: "success",
              message: "图片上传成功"
            });
            this.$router.push({ name: "TeacherCenter" });
          } else {
            this.$message({
              type: "warning",
              message: "图片上传失败"
            });
          }
        });
      },
    }
  }
</script>

<style scoped>

</style>
