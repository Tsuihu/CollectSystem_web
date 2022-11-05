<template>
  <div class="tube">
    <Tabbar>
      <template slot="left">
        <button @click="back" class="tab_btn"  size="mini">返回</button>
      </template>
      <template slot="title">
        <h1>试管列表</h1>
      </template>
      <template slot="right">
        <button @click="reflush" class="tab_btn" size="mini">刷新</button>
      </template>
    </Tabbar>
    <div class="center">
      <van-button @click="openTube" class="btn_center" type="primary">开管</van-button>
      <van-button @click="closeBox" class="btn_center" type="primary">封箱</van-button>
    </div>

    <div class="tube_list">
      <van-list
        finished-text="没有更多啦"
        offset="58"
        :immediate-check="false">
        <div class="item" v-for="(item, index) in tubeList" :key="index">
          <p @click="jumpPeoplelist(item.testtubeId,item.testtubeCode)" class="item_tube">
            {{item.testtubeCode}} {{item.status == 1 ? "【已封管】" : "【已开管】"}}
          </p>
        </div>
      </van-list>
    </div>

    <van-overlay :show="isShow" @click="isShow = false">
      <div class="wrapper" @click.stop>
        <div class="block">
          <van-cell-group class="input_box_code" inset>
            <van-field v-model="testtubeCode" label="试管码" placeholder="请输入试管码" />
          </van-cell-group>
          <span class="span">请输入采集模式:</span>
          <van-radio-group :icon-size="15" class="collect_type" v-model="checked">
            <van-radio name="1">单采</van-radio>
            <van-radio name="10">10人混采</van-radio>
            <van-radio name="20">20人混采</van-radio>
          </van-radio-group>
          <van-button @click="scanTube" class="btn_box" block type="primary">
            扫码
          </van-button>
          <van-button @click="addTube" class="btn_box" block type="primary">
            确定
          </van-button>
        </div>
      </div>
    </van-overlay>

  </div>
</template>

<script>
import Tabbar from '../components/Tabbar.vue'
import { Button,List,Field, CellGroup,Overlay,RadioGroup, Radio } from 'vant';
import api from "@/axios/api.js";
import comm from "@/common/comm.js"
export default {
  name: 'tubelist',
  data() {
    return {
      tubeList: [],
      isShow: false,
      testtubeCode: '',
      checked: ''
    }
  },
  components: {
    Tabbar,
    [Button.name]: Button,
    [List.name]: List,
    [Field.name]:Field,
    [CellGroup.name]:CellGroup,
    [Overlay.name]:Overlay,
    [RadioGroup.name]:RadioGroup,
    [Radio.name]:Radio
  },
  methods: {
    back() {
      this.$router.back()
    },
    reflush() {
      this.getAllTubeList()
    },
    // 获取所有管信息
    getAllTubeList() {
      api.post(`/testtube/getAllTube.do?boxId=${this.$route.query.boxId}`).then(res => {
        if (res.code == comm.RESULT_CODE.SUCCESS) {
          this.tubeList = res.data
          this.testtubeCode = res.data.testtubeCode
        }
      })
    },
    // 扫码添加管
    scanTube() {},
    // 手动添加管
    addTube() {
      let info = {
        boxId: this.$route.query.boxId,
        testtubeCode: this.testtubeCode,
        collectType: this.checked
      }
      console.log(info)
      api.post('/testtube/addTube.do',info).then(res => {
        console.log(res)
        this.isShow = false
        this.getAllTubeList()
      })
    },
    // 开管
    openTube() {
      this.isShow = true
    },
    // 封箱
    closeBox() {
      api.post(`/box/closeBox.do?boxId=${this.$route.query.boxId}`).then(res => {
        console.log(res)
      })
    },
    jumpPeoplelist(testtubeId,testtubeCode) {
      this.$router.push({
        name: 'people',
        query: {
          testtubeId: testtubeId,
          testtubeCode: testtubeCode
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
.tube {
  .tab_btn {
    margin-top: 20/40rem;
    width: 70/40rem;
    height: 40/40rem;
    font-size: 20/40rem;
    background-color: #07C160;
    border: none;
    color: white;
  }
  .center {
    display: flex;
    justify-content: space-between;
    margin-top: 40/40rem;
    padding-left: 40/40rem;
    padding-right: 40/40rem;
    .btn_center {
      width: 260/40rem;
      border-radius: 20/40rem;
    }
  }

  .tube_list {
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
      .item_tube {
        color: black;
      }
    }
  }

  .wrapper {
    .block {
      position: fixed;
      bottom: 0;
      width: 100%;
      height: 550/40rem;
      background-color: #fff;
      .btn_box {
        margin: 30/40rem auto;
        width: 90%;
        border-radius: 10/40rem;
      }
      .span {
        font-size: 28/40rem;
        color: #646566;
        margin-left: 40/40rem;
      }
      .collect_type {
        font-size: 28/40rem;
        width: 400/40rem;
        padding: 20/40rem;
        margin-left: 300/40rem;
      }
    }
  }
}
</style>