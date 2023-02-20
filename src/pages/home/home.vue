<template>
	<view class="home">
		<image class="school-title" src="../../static/school-login.png" mode="scaleToFill"></image>
		<view class="card">
			<view class="card-tilte">
				<text class="manage">车辆日常管理</text>
				<view class="daily-management">
					<view class="park" @click="parkingViolation">
						<image class="parking-violation" src="../../static/parking-violation.png" mode="scaleToFill"></image>
						<view class="parking-violation-text">违停上报</view>
					</view>
					<view class="record" @click="record">
						<image class="record-img" src="../../static/record-img.png" mode="scaleToFill"></image>
						<view class="record-text">上报记录</view>
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
					};
		},
		methods: {
			// 违停上报
			parkingViolation(){
				uni.navigateTo({
				       url: "/pages/report/report",
				     });
			},
			// 上报记录
			record(){
				uni.navigateTo({
				       url: "/pages/reportRecord/reportRecord",
				     });
				// this.$router.push({
				// 	path: '../reportRecord/reportRecord'
				// });
			}
		}
	}
</script>

<style lang="scss" scoped>
	.home{
		background: url('../../static/home-logo.png') no-repeat;
		height:  158px;
		background-size: 100% 100%;
		padding: 0px 15px;
		
		.school-title{
			padding: 21px 6px;
			width: 151px;
			height: 48px;
		}
		.card{
			background: #FFFFFF;
			height: 32.1875rem;
			background: #FFFFFF;
			box-shadow: 0px 0px 8px rgba(98,112,149,0.16);
			border-radius: 4px;
			opacity: 1;
			.card-tilte{
				padding: 16px 12px 0 12px;
				.manage{
					font-size: 16px;
					font-family: Source Han Sans CN;
					font-weight: bold;
					color: #000000;
				}
				.daily-management{
					display: flex;
					margin-top: 18px;
					.park{
						margin-right: 8px;
						width: 75px;
						height: 94px;
						text-align: center;
						.parking-violation{
							width: 46px;
							height: 48px
						}
						.parking-violation-text{
							font-size: 12px;
							font-family: Source Han Sans CN;
							font-weight: 400;
							color: #000000;
						}
					}
					
					.record{
						width: 75px;
						height: 94px;
						text-align: center;
						.record-img{
							width: 46px;
							height: 48px
						}
						.record-text{
							font-size: 12px;
							font-family: Source Han Sans CN;
							font-weight: 400;
							color: #000000;
						}
					}
				}
				
			
				
			}
			
			
		}
		
	}
</style>
