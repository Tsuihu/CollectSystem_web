<template>
  <div class="add_people">
    <Tabbar>
      <template slot="left">
        <button @click="back" class="tab_btn"  size="mini">返回</button>
      </template>
      <template slot="title">
        <h1>人员信息录入</h1>
      </template>
    </Tabbar>

    <!-- <div class="idcard_type">
      <span class="span">证件类型:</span>
      <van-radio-group :icon-size="20" class="idcard_type" v-model="checked">
        <van-radio name="身份证">身份证</van-radio>
        <van-radio name="户口本">户口本</van-radio>
        <van-radio name="护照">护照</van-radio>
      </van-radio-group>
    </div> -->
    <!-- <div class="idcard">
      <van-cell-group inset>
        <van-field v-model="text" label="证件号" />
        <van-field v-model="text" label="姓名" />
        <van-field v-model="text" label="电话" />
      </van-cell-group>
    </div> -->

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
        <van-button class="form_delete" round block>
          删除
        </van-button>
      </div>
    </van-form>

  </div>
</template>

<script>
import { Button,RadioGroup, Radio,Field, CellGroup,Form } from 'vant';
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
      this.$router.back()
    },
    onSubmit(values) {
      console.log(values)
      api.post('/people/addPeople.do',values).then(res => {
        if (res.code == comm.RESULT_CODE.SUCCESS) {
          console.log(res)
        }
      })
    }
  },
  created() {
    console.log(this.$route.query.testtubeId)
  }
}
</script>

<style lang="less" scoped>
.add_people {
  .tab_btn {
    margin-top: 20/40rem;
    width: 70/40rem;
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
    .form_delete {
      margin-top: 20/40rem;
      background-color: #D9001B;
      color: white;
    }
  }

  // .idcard_type {
  //   margin-top: 100/40rem;
  //   .span {
  //     font-size: 30/40rem;
  //     margin-left: 100/40rem;
  //     }
  //   .idcard_type {
  //     margin-top: 0;
  //     font-size: 30/40rem;
  //     width: 200/40rem;
  //     padding: 20/40rem;
  //     margin-left: 300/40rem;
  //   }
  // }

  // .idcard {
  //   margin-top: 100/40rem;
  // }
}
</style>