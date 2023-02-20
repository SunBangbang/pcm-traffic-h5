<template>
  <view>
    <view class="content">
        <view class="nav_dev">
            <u-navbar title="违停上报" @rightClick="rightClick" :autoBack="true">
            </u-navbar>
        </view>
        <view class="bg_dev">
          <view style="display: flex;flex-direction: column; align-items: center;margin-top: 150px;">
            <view class="success_dev"><span>违停上报成功</span></view>
            <view class="report_dev">
              <span class="time">上报时间：</span>
              <span class="time_Num">2022-06-06 13:14:15</span>
            </view>
            <view class="home_dev">
              <u-button @click="hanleReturn">返回首页</u-button>
            </view>
            <view class="jump_dev" v-if="flag">
              <span>0{{count}}</span>
              <span>后自动跳转到首页</span>
            </view>
          </view>
        </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      count:'',
	  flag:false
    }
  },
  methods: {
    rightClick() {
      console.log("rightClick");
    },
    hanleReturn(){
		this.flag = true
      console.log('返回首页');
	  const TIME_COUNT = 5;
	          if(!this.timer){
	              this.count = TIME_COUNT;
	              this.show = false;
	              this.timer = setInterval(()=>{
	              if(this.count > 0 && this.count <= TIME_COUNT){
	                  this.count--;
	              }else{
	                  this.show = true;
	                  clearInterval(this.timer);
	                  this.timer = null;
	                  //跳转的页面写在此处
	                  this.$router.push({
	                      path: '../home/home'
	                  });
	              }
	            },1000)
	          }
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #F2F4F8;
  .nav_dev {
    width: 375px;
    height: 44px;
    opacity: 1;
    ::v-deep {
        .u-navbar__content__title[data-v-75dad532] {
            text-align: center;
            font-size: 17px;
            color: #000000;
            font-weight: bold;
        }
    }
  }
  .bg_dev {
    margin-top: 25px;
    background-image: url(../../static/card_right.png.png);
    width: 345px;
    height: 372px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .success_dev{
      margin-bottom: 20px;
      font-size: 20px;
      font-family: Source Han Sans CN;
      font-weight: bold;
      line-height: 0px;
      color: #356FFD;
      opacity: 1;
    }
    .report_dev{
      margin-bottom: 50px;
      .time{
        font-size: 14px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        line-height: 0px;
        color: #89909A;
        opacity: 1;
      }
      .time_Num{
        font-size: 14px;
        font-family: Source Han Sans CN;
        font-weight: 500;
        line-height: 0px;
        color: #575764;
        opacity: 1;
      }
    }
    .home_dev{
      ::v-deep{
        .u-button {
          width: 155px;
          height: 48px;
          opacity: 1;
          border-radius: 4px;
          background: linear-gradient(270deg, #356FFD 0%, #62A4FE 100%);
          color: #FFFFFF;
          font-size: 14px;
        }
      }
    }
    .jump_dev{
      margin-top: 18px;
      color: #C1C6CE;
      font-size: 14px;
    }
  }
}
</style>