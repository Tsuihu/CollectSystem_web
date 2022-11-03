<template>
  <div class="point">
    <Tabbar><h1>选择采集地点</h1></Tabbar>
    <van-search
      v-model="pointName"
      show-action
      label="地址"
      placeholder="请输入采集点"
      @search="onSearch"
      class="input_search"
    >
    <template class="btn_search" #action>
      <div @click="onClickButton">搜索</div>
    </template>
    </van-search>

    <div class="point_list">
      <van-pull-refresh 
        v-model="refreshing" 
        @refresh="onRefresh" >
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多啦"
          offset="58"
          :immediate-check="false">
          <div class="item" v-for="(item, index) in pointList" :key="index">
            <p @click="jumpBoxlist(item.pointId)" class="item_point">{{item.pointName}}</p>
          </div>
        </van-list>
      </van-pull-refresh>

      <van-button class="btn_point" round block type="primary" native-type="submit">
        确定
      </van-button>
    </div>
  </div>
</template>

<script>
import { Search,List,PullRefresh,Button } from 'vant';
import api from "@/axios/api.js";
import comm from "@/common/comm.js"
import Tabbar from '../components/Tabbar.vue'

export default {
  name: 'point',
  data() {
    return {
      pointList: [],
      pointListAll: [],
      pointName: '',
      loading: false, //上拉加载
      finished: false, //上拉加载完毕
      refreshing: false, //下拉刷新
    }
  },
  components: {
    [Search.name]: Search,
    [List.name]: List,
    [PullRefresh.name]: PullRefresh,
    [Button.name]: Button,
    Tabbar
  },
  methods: {
    getAllPoint(){
      api.post('/point/getAllPoint.do').then(res => {
        if (res.code == comm.RESULT_CODE.SUCCESS) {
          this.pointList = res.data
        }
      })
    },
    onClickButton(){
      var pointForm = {
        pointName: this.pointName
      }
      api.post('/point/getLikeName.do',pointForm)
        .then(res => {
          this.pointList = res.data
        })
    },
    onSearch(){},
    onRefresh() { //下拉刷新
      this.getAllPoint()
    },
    jumpBoxlist(pointId){
      console.log(pointId)
      this.$router.push({
        name: 'boxlist',
        params: {
          pointId:pointId
        }
      })
    }
  },
  created() {
    this.getAllPoint()
  }
}
</script>

<style lang="less">
.point {
  h1 {
    text-align: center;
    line-height: 82/40rem;
    font-weight: normal;
    font-size: 35/40rem;
    color: white;
  }
  hr {
    width: 90%;
    border: 2/40rem solid #ddd;
    margin: 20/40rem auto;
  }

  .input_search {
    width: 90%;
    margin: 20/40rem auto;
    border-radius: 20/40rem;
  }

  .point_list {
    width: 90%;
    margin: 100/40rem auto;
    .item {
      // width: 70%;
      text-align: center;
      line-height: 52/40rem;
      margin-top: 30/40rem;
      font-size: 30/40rem;
      border-bottom: 2/40rem solid #ddd;
      .item_point {
        color: black;
      }
    }
  }

  .btn_point {
    margin-top: 50/40rem;
  }
}
</style>