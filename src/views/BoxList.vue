<template>
  <div class="boxlist">
    <Tabbar>
      <template slot="left">
        <van-button icon="arrow-left" @click="back" class="tab_btn"  size="mini">返回</van-button>
      </template>
      <template slot="title">
        <h1>转运箱列表</h1>
      </template>
      <template slot="right">
        <button @click="reflush" class="tab_btn" size="mini">刷新</button>
      </template>
    </Tabbar>
    <div class="container">
      <van-button @click="openBox" class="btn_box" block type="primary">
        开箱
      </van-button>
      <div class="box_list">
        <van-tag type="success" size="medium">请选择转运箱</van-tag>
        <van-pull-refresh 
          v-model="refreshing" 
          @refresh="onRefresh" >
            <van-list
            finished-text="没有更多啦"
            offset="58"
            :immediate-check="false">
            <div class="item" v-for="(item, index) in boxList" :key="index">
              <p @click="jumpTubelist(item.boxId)" class="item_box">
                {{item.boxCode}} {{item.status == 1 ? "【已封箱】" : "【已开箱】"}}
              </p>
            </div>
          </van-list>
        </van-pull-refresh>
      </div>
    </div>
    <van-overlay :show="isShow" @click="isShow = false">
      <div class="wrapper" @click.stop>
        <div class="block">
          <van-cell-group class="input_box_code" inset>
            <van-field v-model="boxCode" label="转运箱码" placeholder="请输入转运箱码" />
          </van-cell-group>
          <van-button @click="scanBox" class="btn_box" block type="primary">
            扫码
          </van-button>
          <van-button @click="addBox" class="btn_box" block type="primary">
            确定
          </van-button>
        </div>
      </div>
    </van-overlay>

  </div>
</template>

<script>
import Tabbar from '../components/Tabbar.vue'
import { Button,List,Field, CellGroup,Overlay, Toast,Tag,PullRefresh } from 'vant';
import api from "@/axios/api.js";
import comm from "@/common/comm.js"
export default {
  name: 'box',
  data() {
    return {
      boxList: [],
      boxCode: '',
      collectorId: '',
      isShow: false,
      refreshing: false
    }
  },
  components: {
    Tabbar,
    [Button.name]:Button,
    [List.name]:List,
    [Field.name]:Field,
    [CellGroup.name]:CellGroup,
    [Overlay.name]:Overlay,
    [Tag.name]:Tag,
    [PullRefresh.name]:PullRefresh
  },
  methods: {
    // 返回
    back(){
      this.$router.push('/point')
    },
    // 刷新
    reflush() {
      this.getBoxList()
    },
    // 下拉刷新
    onRefresh() {
      this.getBoxList()
      this.refreshing = false
    },
    // 获取转运箱列表
    getBoxList() {
      let pointId = sessionStorage.getItem('pointId')
      api.post(`/box/getAllBox.do?pointId=${pointId}`,).then(res => {
        if (res.code == comm.RESULT_CODE.SUCCESS) {
          this.boxList = res.data
        }
      })
    },
    // 开箱
    openBox() {
      this.isShow = true
    },
    // 手动输入添加一个箱子
    addBox(){
      let info = {
        pointId: sessionStorage.getItem('pointId'),
        boxCode: this.boxCode,
        collectorId: JSON.parse(sessionStorage.getItem('collectors')).collectorId
      }
      api.post('/box/addBox.do',info).then(res => {
        console.log(res)
        if(res.code == comm.RESULT_CODE.SUCCESS) {
          Toast(res.errMsg)
          setTimeout(() => {
            this.isShow = false
            sessionStorage.setItem('boxId',res.data.boxId)
            this.$router.push('/tubelist')
          },500)
        }else {
          Toast(res.errMsg)
          this.boxCode = ''
        }
        
      })
    },
    // 扫码开箱
    scanBox() {},
    // 跳转到管列表
    jumpTubelist(boxId) {
      sessionStorage.setItem('boxId',boxId)
      this.$router.push('/tubelist')
      // this.$router.push({
      //   name: 'tubelist',
      //   query: {
      //     boxId:boxId
      //   }
      // })
    }
  },
  created() {
    this.getBoxList()
  }
}
</script>

<style lang="less" scoped>
.boxlist {
  .tab_btn {
    margin-top: 20/40rem;
    width: 100/40rem;
    height: 40/40rem;
    font-size: 20/40rem;
    background-color: #07C160;
    border: none;
    color: white;
  }
  .btn_box {
    margin: 50/40rem auto;
    width: 90%;
    border-radius: 10/40rem;
  }

  .box_list {
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
      .item_point {
        color: black;
      }
    }
  }
  .wrapper {
    .block {
      position: fixed;
      bottom: 0;
      width: 100%;
      height: 400/40rem;
      background-color: #fff;
    }
  }
}
</style>