<template>
	<view class="report">
		<image class="usage-notice" src="../../static/report-title.png" mode="scaleToFill"></image>
		<view class="card">
			<view class="card-tilte">
				<view class="word">
					<text class="text">
						1. 违停上报指对登记在学校智慧交通管理平台中的校内车辆，以及校内停放的社会车辆进行违停上报。
						2. 违章停车行为包括占用消防通道、禁停路段停车、道路交叉口停车、绿化地停车、非停车区域及人行通道停车等。
						3. 填写违停上报信息时，请您拍摄能够清晰显示车辆号牌信息和现场全景的照片。
						4. 针对乱用、恶意使用违停上报的，一经举报且核实，按校方有关规定处理。
					</text>
				</view>
			</view>
		</view>
		<u-button @click="submit" class="read-agree" :disabled="disabled">
			阅读并同意
			<view class="tiem" v-if="disabled == true">({{ tiem }}s)</view>
		</u-button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			disabled: true,
			tiem: 5,
			timer: null //倒计时
		};
	},

	methods: {
		submit() {
			uni.navigateTo({
				url: '/pages/violationReport/violationReport'
			});
		}
	},
	mounted() {
		this.timer = setInterval(() => {
			if (this.tiem === 1) {
				this.tiem = '';
				this.disabled = false;
				clearInterval(this.timer);
			} else {
				this.tiem--;
			}
		}, 1000);
	}
};
</script>

<style lang="scss" scoped>
.report {
	background: url('../../static/report-logo.png') no-repeat;
	height: 158px;
	background-size: 100% 100%;
	padding: 0px 15px;
	.usage-notice {
		margin: 28px 140px 16px 140px;
		width: 80px;
		height: 27px;
	}
	.card {
		background: #ffffff;
		// height: 32.1875rem;
		background: #ffffff;
		box-shadow: 0px 0px 8px rgba(98, 112, 149, 0.16);
		border-radius: 4px;
		opacity: 1;
		.card-tilte {
			padding: 16px 12px 48px 12px;
			.word {
				.text {
					width: 313px;
					height: 496px;
					font-size: 14px;
					font-family: Source Han Sans CN;
					font-weight: 400;
					line-height: 0px;
					color: #575764;
					opacity: 1;
				}
			}
		}
	}

	.read-agree {
		position: fixed;
		width: calc(100% - 30px);
		text-align: center;
		bottom: 40px;
		height: 48px;
		background: linear-gradient(270deg, #356ffd 0%, #62a4fe 100%);
		box-shadow: 0px 0px 8px rgba(98, 112, 149, 0.16);
		color: #ffffff;
		border-radius: 4px;
		.tiem {
			margin-left: 9px;
		}
	}
}
</style>
