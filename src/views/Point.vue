<template>
  <div class="point">
    <Tabbar>
      <template slot="title">
        <h1>选择采集地点</h1>
      </template>
      <template slot="right">
        <button @click="logout" class="tab_btn" size="mini">退出</button>
      </template>
    </Tabbar>
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
      <van-tag type="success" size="medium">请选择采集点</van-tag>
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
    </div>
  </div>
</template>

<script>
import { Search,List,PullRefresh,Button,Tag  } from 'vant';
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
    [Tag.name]: Tag,
    Tabbar
  },
  methods: {
    // 获取所有地点
    getAllPoint(){
      api.post('/point/getAllPoint.do').then(res => {
        if (res.code == comm.RESULT_CODE.SUCCESS) {
          this.pointList = res.data
        }
      })
    },
    // 搜索
    onClickButton(){
      var pointForm = {
        pointName: this.pointName
      }
      api.post('/point/getLikeName.do',pointForm)
        .then(res => {
          if (res.code == comm.RESULT_CODE.SUCCESS) {
          this.pointList = res.data
        }
        })
    },
    onSearch(){},
    onRefresh() { //下拉刷新
      this.getAllPoint()
    },
    jumpBoxlist(pointId){
      sessionStorage.setItem('pointId',pointId)
      this.$router.push('/boxlist')
    },
    // 退出
    logout() {
      sessionStorage.removeItem('collectors')
      this.$router.push('/login')
    }
  },
  created() {
    this.getAllPoint()
  }
}
</script>

<style lang="less">
.point {
  .tab_btn {
    margin-top: 20/40rem;
    width: 100/40rem;
    height: 40/40rem;
    font-size: 20/40rem;
    background-color: #07C160;
    border: none;
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
    margin: 50/40rem auto;
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
  .logout {
    width: 90%;
    border-radius: 20/40rem;
    background-color: #D9001B;
    border: none;
    margin-left: 5%;
  }
}
</style>