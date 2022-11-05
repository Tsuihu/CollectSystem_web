<template>
  <div class="people">
    <Tabbar>
      <template slot="left">
        <button @click="back" class="tab_btn"  size="mini">返回</button>
      </template>
      <template slot="title">
        <h1>试管码: {{this.$route.query.testtubeCode}}</h1>
      </template>
      <template slot="right">
        <button @click="reflush" class="tab_btn" size="mini">刷新</button>
      </template>
    </Tabbar>

    <div class="people_center">
      <p>样品数量：0</p>
      <van-button @click="closeTube" class="btn_center" type="primary">封管</van-button>
    </div>

    <div class="people_list">
      <van-list
        finished-text="没有更多啦"
        offset="58"
        :immediate-check="false">
        <div class="item" v-for="(item, index) in peopleList" :key="index">
          <p class="item_people">
            {{item.name}}
          </p>
        </div>
      </van-list>
    </div>

    <div class="people_buttom">
      <van-button @click="scanPeople" class="btn_buttom" type="primary">扫描核算码</van-button>
      <van-button @click="addPeople" class="btn_buttom" type="primary">手动录入</van-button>
    </div>

  </div>
</template>

<script>
import Tabbar from '../components/Tabbar.vue'
import { Button,List,Field, CellGroup,Overlay } from 'vant';
import api from "@/axios/api.js";
import comm from "@/common/comm.js"
export default {
  name: 'tubelist',
  data() {
    return {
      peopleList: [],
      testtubeCode: '',
    }
  },
  components: {
    Tabbar,
    [Button.name]: Button,
    [List.name]: List,
    [Field.name]:Field,
    [CellGroup.name]:CellGroup,
    [Overlay.name]:Overlay,
  },
  methods: {
    back() {
      this.$router.back()
    },
    reflush() {
      this.getAllTubeList()
    },
    // 封管
    closeTube() {
      api.post(`/testtube/closeTube.do?testtubeId=${this.$route.query.testtubeId}`).then(res => {
        if (res.code == comm.RESULT_CODE.SUCCESS) {
          console.log(res)
        }
      })
    },
    // 获取所有人信息
    getAllTubeList() {
      // console.log(this.$route.query.testtubeId)
      api.post(`/people/getAllPeople.do?testtubeId=${this.$route.query.testtubeId}`).then(res => {
        if (res.code == comm.RESULT_CODE.SUCCESS) {
          this.peopleList = res.data
        }
      })
    },
    scanPeople() {},
    // 手动输入添加人员信息
    addPeople() {
      this.$router.push({
        name: 'addpeople',
        query: {
          testtubeId: '1'
        }
      })
    }
  },
  created() {
    this.getAllTubeList()
  }
}
</script>

<style lang="less" scoped>
.people {
  .tab_btn {
    margin-top: 20/40rem;
    width: 70/40rem;
    height: 40/40rem;
    font-size: 20/40rem;
    background-color: #07C160;
    border: none;
    color: white;
  }
  .people_center {
    display: flex;
    justify-content: space-between;
    margin-top: 40/40rem;
    padding-left: 70/40rem;
    padding-right: 70/40rem;
    p {
      font-size: 30/40rem;
      line-height: 100/40rem;
    }
    .btn_center {
      width: 200/40rem;
      border-radius: 20/40rem;
      background-color: #D9001B;
      border: none;
    }
  }
  .people_list {
    width: 90%;
    margin: 100/40rem auto;
    overflow: scroll;
    .item {
      // width: 70%;
      text-align: center;
      line-height: 52/40rem;
      margin-top: 30/40rem;
      font-size: 30/40rem;
      border-bottom: 2/40rem solid #ddd;
      .item_people {
        color: black;
      }
    }
  }
  .people_buttom {
    display: flex;
    justify-content: space-between;
    margin-top: 40/40rem;
    padding-left: 40/40rem;
    padding-right: 40/40rem;
    .btn_buttom {
      width: 260/40rem;
      border-radius: 20/40rem;
    }
  }
}
</style>