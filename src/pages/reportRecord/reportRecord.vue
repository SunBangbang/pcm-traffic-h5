<template>
	<view class="content">
		<view class="nav_dev">
			<u-navbar title="违停上报记录" @rightClick="rightClick" :autoBack="true">
			</u-navbar>
		</view>
		<view class="bg_dev">
			<view style="display: flex; align-items: center; position: relative;">
				<view class="tabs_dev">
					<u-tabs :list="list" @click="handleClick"></u-tabs>
				</view>
				<view class="icon_dev">
					<u-image :showLoading="true" src="../../static/icon_screen.png.png" width="24px" height="24px"
						@click="screenCampus"></u-image>
				</view>
				<view class="text_dev" v-if="textShow">
					<u-text text="丁家桥校区"></u-text>
					<!-- <u-line></u-line> -->
					<u-text text="九龙湖校区"></u-text>
					<!-- <u-line></u-line> -->
					<u-text text="四牌楼校区"></u-text>
				</view>
			</view>
			<view class="search_dev">
				<u-input placeholder="输入车牌号进行搜索" v-model="keyword">
					<template slot="suffix">
						<u-icon name="search" size="44" @click="serchClick"></u-icon>
					</template>
				</u-input>
				<!-- <u-search
					height="88"
          :show-action="false"
          shape="square"
          placeholder="输入车牌号进行搜索"
          v-model="keyword"
        ></u-search> -->
			</view>
		</view>
		<view> </view>
		<view class="u-page">
			<view class="u-demo-block" v-for="details in detailsList">
				<!-- 车辆状态/车牌号 -->
				<view class="plateNum_dev">
					<view class="status_dev">
						<view v-show="flag">
							<u-image :showLoading="true" src="../../static/label_blue.png.png" width="56px"
								height="22px"></u-image>
						</view>
						<view v-show="!flag">
							<u-image :showLoading="true" src="../../static/label_green.png.png" width="56px"
								height="22px"></u-image>
						</view>
					</view>
					<view class="plateNum">
						<span>{{ details.plateNum }}</span>
					</view>
				</view>
				<!-- 列表信息 -->
				<view class="u-demo-block__content">
					<u-row customStyle="margin-bottom: 10px;margin-top: 10px">
						<u-col span="3">
							<view class="demo-layout bg-purple-light">
								<span>违停地点：</span>
							</view>
						</u-col>
						<u-col span="8">
							<view class="demo-layout bg-purple">
								<span>{{ details.violationArea }}</span>
							</view>
						</u-col>
					</u-row>
					<u-row customStyle="margin-bottom: 8px">
						<u-col span="3">
							<view class="demo-layout bg-purple-light">
								<span>违停详情：</span>
							</view>
						</u-col>
						<u-col span="8">
							<view class="demo-layout bg-purple">
								<span>{{ details.stopDetails }}</span>
							</view>
						</u-col>
					</u-row>
					<u-row customStyle="margin-bottom: 8px">
						<u-col span="3">
							<view class="demo-layout bg-purple-light">
								<span>上报人：</span>
							</view>
						</u-col>
						<u-col span="8">
							<view class="demo-layout bg-purple">
								<span>{{ details.reportingPerson }}</span>
							</view>
						</u-col>
					</u-row>
					<u-row customStyle="margin-bottom: 8px">
						<u-col span="3">
							<view class="demo-layout bg-purple-light">
								<span>上报时间：</span>
							</view>
						</u-col>
						<u-col span="8">
							<view class="demo-layout bg-purple">
								<span>{{details.time}}2022-06-06 13:14:15</span>
							</view>
						</u-col>
					</u-row>
					<u-row customStyle="margin-bottom: 8px">
						<u-col span="3">
							<view class="demo-layout bg-purple-light">
								<span>违停照片：</span>
							</view>
						</u-col>
					</u-row>
					<!-- 违停照片 -->
					<u-row customStyle="margin-bottom: 10px">
						<u-col span="4" v-for="item in details.picList">
							<u-image class="bg-image" :src="item" width="99px" height="60px" :lazy-load="true"></u-image>
							<!-- <view class="bg-image">1111111</view> -->
						</u-col>
						<!-- <u-col span="4">
							<view class="bg-image">2222222</view>
						</u-col>
						<u-col span="4">
							<view class="bg-image">3333333</view>
						</u-col> -->
					</u-row>
					<view>
						<!-- 上报次数弹窗 -->
						<u-popup :closeable="true" :show="show" mode="bottom" @close="close" @open="open">
							<view>
								<view class="reportDetails">
									<span>上报详情</span>
								</view>
								<view class="box_dev">
									<u-row customStyle="margin-bottom: 8px">
										<u-col span="3">
											<view class="demo-layout bg-purple-light">
												<span>上报人：</span>
											</view>
										</u-col>
										<u-col span="8">
											<view class="demo-layout bg-purple">
												<span>{{ detailsList.reportingPerson }}</span>
											</view>
										</u-col>
									</u-row>
									<u-row customStyle="margin-bottom: 8px">
										<u-col span="3">
											<view class="demo-layout bg-purple-light">
												<span>上报时间：</span>
											</view>
										</u-col>
										<u-col span="8">
											<view class="demo-layout bg-purple">
												<span>2022-06-06 13:14:15</span>
											</view>
										</u-col>
									</u-row>
								</view>
							</view>
						</u-popup>
					</view>
				</view>
				<!-- 线条 -->
				<view class="line_dev">
					<u-line></u-line>
				</view>
				<!-- 再次上报 -->
				<view class="rereportDiv">
					<view class="rereport_dev" v-show="flag">
						<u-button size="mini" @click="handleRereport">再次上报</u-button>
					</view>
					<view class="rereport_dev" v-show="!flag">
						<u-button size="mini" :disabled="true">再次上报</u-button>
					</view>
					<view class="rereportNum_dev">
						<u-button size="mini" @click="handleRereportNum">1</u-button>
					</view>
					<view class="rereportStatus_dev">
						<u-collapse :border="false">
							<u-collapse-item title="待驶离">
								<u-button size="mini" @click="handleDeparture">已驶离</u-button>
							</u-collapse-item>
						</u-collapse>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getToken
	} from "../../plugins/cookie";
	import {
		reportRecord
	} from "@/api/index.js";
	export default {
		data() {
			return {
				list: [{
					name: "待驶离"
				}, {
					name: "已驶离"
				}],
				keyword: "",
				show: false,
				flag: true,
				textShow: false,
				Token: getToken(),
				campus: "", //校区
				plateNum: "", //车牌号
				pageNum: 1, //默认1 第1页
				pageSize: 5, //默认5 每页5个
				status: "", //状态1:待驶离 2：已驶离
				detailsList: [{
					plateNum: 123456,
					violationArea: "北京",
					stopDetails: "测试",
					reportingPerson: "测试",
					picList: ["https://cdn.uviewui.com/uview/album/1.jpg","https://cdn.uviewui.com/uview/album/2.jpg"] //违停图片
				}], //详情
			};
		},
		onLoad() {},
		created() {
			this.getList();
		},
		methods: {
			getList() {
				reportRecord({
					campus: this.campus,
					plateNum: this.plateNum,
					pageNum: this.pageNum,
					pageSize: this.pageSize,
					status: 1,
				}).then(res => {
					res.data.records.forEach((v) => {
						// this.detailsList = v;
						// this.picList = v.picList;
					});
				})
				// this.$request(
				//   `/tbReportRecord/reportRecordPage`,
				//   {
				//     campus: this.campus,
				//     plateNum: this.plateNum,
				//     pageNum: this.pageNum,
				//     pageSize: this.pageSize,
				//     status: 1,
				//   },
				//   "POST",
				//   { Authorization: "Bearer " + this.Token }
				// ).then((res) => {
				//   console.log(res, "++++");
				//   // this.$msg('操作成功')
				//   res.data.records.forEach((v) => {
				//     this.detailsList = v;
				//     this.picList = v.picList;
				//   });
				// });
			},
			//tabs切换
			handleClick(item) {
				console.log(item);
				if (item.name === "待驶离") {
					this.flag = true;
					//     this.$request(`pcm-traffic/tbReportRecord/reportRecordPage`,{
					//     campus:this.campus,
					//     plateNum:this.plateNum,
					//     pageNum:this.pageNum,
					//     pageSize:this.pageSize,
					//     status:1
					// },'POST', {Authorization: "Bearer " + this.Token,
					// }).then((res)=>{
					//     console.log(res,'++++');
					//     res.data.records.forEach(v => {
					//       this.detailsList = v
					//       this.picList = v.picList
					//     });
					//     console.log(this.picList,'this.picList');
					//     console.log(this.detailsList.violationArea,'this.detailsList.violationArea');
					// })
				} else if ((item.name = "已驶离")) {
					this.flag = false;
				}
			},
			rightClick() {
				console.log("6666");
			},
			leftClick() {
				console.log("leftClick");
			},
			//筛选校区
			screenCampus() {
				this.textShow = !this.textShow;
			},
			//再次上报
			handleRereport() {
				console.log("再次上报");
				uni.navigateTo({
					url: "/pages/violationReport/violationReport",
				});
			},
			//上报次数
			handleRereportNum() {
				console.log("1");
				this.show = true;
			},
			//车辆状态
			handleDeparture() {
				console.log("已驶离");
			},
			open() {},
			//上报次数弹窗
			close() {
				this.show = false;
				// console.log('close');
			},
			// 搜索
			serchClick() {
				console.log(this.keyword)
			}
		},
	};
</script>

<style lang="scss" scoped>
	.content {
		height: calc(100vh - 44px);
		display: flex;
		flex-direction: column;
		align-items: center;
		background: #f2f4f8;

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
			background-image: url(../../static/img_bg1.png.png);
			width: 375px;
			height: 150px;
			display: flex;
			flex-direction: column;
			align-items: center;

			.tabs_dev {
				display: flex;
				justify-content: center;
				margin-top: 20px;
				margin-bottom: 20px;
				margin-right: 15px;
				width: 306px;
				height: 44px;
				background-color: #ffffff;
				opacity: 1;
				border-radius: 4px;

				::v-deep {
					.u-tabs__wrapper__nav {
						display: flex;
						flex-direction: row;
						position: relative;

						.u-tabs__wrapper__nav__item {
							padding: 0 54px;
							display: flex;
							flex-direction: row;
							align-items: center;
							justify-content: center;
						}
					}

					.u-tabs__wrapper__nav__line {
						width: 44px !important;
						left: -12px;
						// transform: translate(54.5px) !important;
					}
				}
			}

			.search_dev {
				width: 345px;
				// height: 44px;
				background-color: #ffffff;
				box-shadow: 0px 0px 8px rgba(98, 112, 149, 0.16);
				border-radius: 4px;

				.u-input {
					height: 32px;
				}

				// ::v-deep {
				//     .u-search__content {
				//       // margin: 11px 0;
				//       display: flex;
				//       flex-direction: row;
				//       align-items: center;
				//       padding: 0 10px;
				//       flex: 1;
				//       justify-content: space-between;
				//       // border-width: 1px;
				//       // border-color: transparent;
				//       border-style: solid;
				//       // overflow: hidden;
				// 	background-color: #fff !important;
				//     }
				//     .u-search__content__input {
				//       background-color: #fff !important;
				//     }
				// .u-icon__icon {
				// 	font-size: 20px !important;
				// }
				// }
			}

			.text_dev {
				position: absolute;
				right: 0;
				top: 70px;
				display: flex;
				flex-direction: column;
				justify-content: flex-end;
				padding: 5px 10px;
				width: 98px;
				height: 110px;
				background: #4c4c4c;
				box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
				opacity: 1;
				border-radius: 5px;
				z-index: 2;

				.u-text {
					padding-bottom: 5px;
					border-bottom: 1px solid $uni-border-color;

					&:last-child {
						border: none;
					}

					justify-content: center !important;

					::v-deep {
						.u-text__value {
							color: $uni-text-color-inverse !important;
							font-size: 18px !important;
						}
					}
				}
			}
		}

		.u-page {
			margin-bottom: 20px;
			width: 345px;
			background-color: #fff;

			.plateNum_dev {
				display: flex;
				align-items: center;
				margin-top: 15px;
				height: 48px;
				background: linear-gradient(274deg, #f8faff 0%, #ebf1ff 100%);
				opacity: 1;
				border-radius: 4px;

				.status_dev {
					margin: 13px 12px;
				}

				.plateNum {
					font-size: 17px;
					color: #000000;
					font-family: Source Han Sans CN;
					font-weight: 500;
				}
			}

			.u-demo-block__content {
				margin-left: 10px;

				.demo-layout {
					font-size: 14px;
					color: #89909a;
				}

				.bg-purple {
					font-size: 14px;
					color: #575764;
				}

				.bg-image {
					// width: 99px;
					// height: 60px;
					// background: #a2bbed;
					// opacity: 1;
					// border-radius: 2px;
				}

				.reportDetails {
					margin: 20px 155px 30px;
				}

				.box_dev {
					margin: 20px auto;
					width: 327px;
					height: 48px;
					// background: red;
					padding: 10px 20px;
					border: 1px dashed #89909a;
					opacity: 1;
					border-radius: 0px;
				}
			}

			.rereportDiv {
				display: flex;
				margin-top: 12px;
				margin-left: 85px;
				margin-bottom: 20px;

				.rereport_dev {
					width: 80px;
					margin-right: 8px;

					.u-button[data-v-3bf2dba7] {
						height: 40px;
						opacity: 1;
						border-radius: 4px;
						color: #356ffd;
						background: #e6f0ff;
					}
				}

				.rereportNum_dev {
					width: 44px;
					margin-right: 16px;

					.u-button[data-v-3bf2dba7] {
						height: 40px;
						opacity: 1;
						border-radius: 4px;
						color: #356ffd;
						background: #e6f0ff;
					}
				}

				.rereportStatus_dev {
					width: 100px;
					height: 40px;
					background: #fff6e9;
					color: #ffa023;
					text-align: center;
					line-height: 28px;

					.u-button[data-v-3bf2dba7] {
						//   width: 118px;
						height: 36px;
						background: #4c4c4c;
						box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
						opacity: 1;
						border-radius: 4px;
					}

					.u-cell__body[data-v-913eaa32] {
						display: flex;
						flex-direction: row;
						box-sizing: border-box;
						padding: 4px 15px;
						font-size: 14px;
						color: #303133;
						align-items: center;
					}
				}
			}
		}
	}
</style>
