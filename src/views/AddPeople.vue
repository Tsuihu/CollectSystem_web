<template>
  <div class="add_people">
    <Tabbar>
      <template slot="left">
        <van-button icon="arrow-left" @click="back" class="tab_btn"  size="mini">返回</van-button>
      </template>
      <template slot="title">
        <h1>人员信息录入</h1>
      </template>
    </Tabbar>

    <van-form class="people_form" @submit="onSubmit">
      <van-field class="form_radio" name="idcardType" label="证件类型">
        <template #input>
          <van-radio-group v-model="peopleFrom.idcardType">
            <van-radio name="0">证件号</van-radio>
            <van-radio name="1">户口本</van-radio>
            <van-radio name="2">护照</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-cell-group inset>
        <van-field
          v-model="peopleFrom.idcard"
          name="idcard"
          label="证件号"
          placeholder="证件号"
          :rules="[{ required: true, message: '请填写证件号' }]"
        />
        <van-field
          v-model="peopleFrom.name"
          type="text"
          name="name"
          label="姓名"
          placeholder="姓名"
          :rules="[{ required: true, message: '请填写姓名' }]"
        />
        <van-field
          v-model="peopleFrom.tel"
          type="text"
          name="tel"
          label="电话"
          placeholder="电话"
          :rules="[{ required: true, message: '请填写电话' }]"
        />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button class="form_submit" round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
    <van-button @click="deleteInfo" class="form_delete" round block>
      删除
    </van-button>
  </div>
</template>

<script>
import { Button,RadioGroup, Radio,Field, CellGroup,Form, Toast } from 'vant';
import Tabbar from '../components/Tabbar.vue'
import api from "@/axios/api.js";
import comm from "@/common/comm.js"
export default {
  name: 'addpeople',
  data() {
    return {
      peopleFrom: {
        idcardType: '',
        name: '',
        idcard: '',
        tel: ''
      }
    }
  },
  components: {
    Tabbar,
    [RadioGroup.name]:RadioGroup,
    [Radio.name]:Radio,
    [Field.name]:Field,
    [CellGroup.name]:CellGroup,
    [Form.name]:Form,
    [Button.name]:Button
  },
  methods: {
    back() {
      this.$router.push('/people')
    },
    // 添加个人信息并跳转
    onSubmit(values) {
      // console.log(values)
      api.post('/people/addPeople.do',values).then(res => {
        console.log(res)
        if (res.code == comm.RESULT_CODE.SUCCESS) {
          Toast(res.errMsg)
          setTimeout(() => {
            this.$router.push('/people')
          },500)
        }else {
          Toast(res.errMsg)
          setTimeout(() => {
            this.$router.push('/people')
          },500)
        }
      })
    },
    // 清空表中信息
    deleteInfo() {
      this.peopleFrom = {}
    }
  }
}
</script>

<style lang="less" scoped>
.add_people {
  .tab_btn {
    margin-top: 20/40rem;
    width: 100/40rem;
    height: 40/40rem;
    font-size: 20/40rem;
    background-color: #07C160;
    border: none;
    color: white;
  }

  .people_form {
    margin-top: 100/40rem;
    .form_radio {
      padding-left: 100/40rem;
      margin-bottom: 40/40rem;
    }
    .form_submit {
      margin-top: 100/40rem;
    }
  }
  .form_delete {
    width: 92%;
    margin: 20/40rem auto;
    background-color: #D9001B;
    color: white;
  }
}
</style>