<template>
	<view class="login">
		<!-- <image
      class="school-title"
      src="../../static/school-login.png"
      mode="scaleToFill"
    ></image> -->
		<view class="card">
			<view class="card-tilte">
				<text class="text">欢迎登录</text>
				<view><image class="login2" src="../../static/login2.png" mode="scaleToFill"></image></view>
				<view>
					<!-- 注意，如果需要兼容微信小程序，最好通过setRules方法设置rules规则 -->
					<u--form :model="model" :rules="rules" ref="form">
						<u-form-item leftIcon="../../static/username.png" prop="username">
							<u--input v-model="model.username" border="none" placeholder="请输入账号 "></u--input>
						</u-form-item>
						<u-form-item leftIcon="../../static/userpassword.png" prop="password">
							<u--input :type="seen ? type_text : type_password" v-model="model.password" placeholder="请输入密码" border="none"></u--input>
							<view class="" @click="changeSeen"><u-icon size="40" name="../../static/look.png"></u-icon></view>
						</u-form-item>
						<view class="verification-code">
							<view class="verification">
								<u-form-item leftIcon="../../static/verification-code.png" prop="verification" :errorType="errorType">
									<u--input v-model="model.verification" placeholder="请输入验证码" border="none"></u--input>
								</u-form-item>
							</view>
							<view class="authCode" @click="changeCode">{{ authCode }}</view>
						</view>

						<u-checkbox-group>
							<u-checkbox v-model="model.rememberPsw" shape="circle" @change="model.rememberPsw = !model.rememberPsw" label="记住密码"></u-checkbox>
						</u-checkbox-group>
						<u-button @click="submit" class="appear">上报</u-button>
					</u--form>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { login } from '@/api/index.js';
import { getRandomNunmer } from '@/utils/index.js';
import { validateCode2 } from '@/utils/validate';
export default {
	data() {
		return {
			showSex: false,
			look: true,
			model: {
				username: '',
				password: '',
				verification: '',
				rememberPsw: false
			},
			authCode: '',
			errorType: '',
			rules: {
				username: {
					type: 'string',
					required: true,
					message: '请输入账号',
					trigger: ['blur', 'change']
				},
				password: {
					type: 'string',
					required: true,
					message: '请输入密码',
					trigger: ['blur', 'change']
				},
				verification: [
					{
						type: 'string',
						required: true,
						len: 4,
						message: '请输入验证码',
						trigger: ['blur']
					},
					
				]
			},
			seen: false,
			type_text: 'text',
			type_password: 'password',
			Token: '',
			radio: '',
			switchVal: false,
			ticket: '',
			token: null,
			originLogin: null,
			projectInfo: {}
		};
	},
	mounted() {
		this.authCode = getRandomNunmer();
	},
	methods: {
		// 查看密码
		changeSeen() {
			this.seen = !this.seen;
		},
		// 刷新验证码
		changeCode() {
			this.authCode = getRandomNunmer();
		},
		//上报
		// 注意：async 方法无法在onload()方法中使用
		submit() {
			this.$refs.form
				.validate()
				.then(res => {
					if (this.model.verification.toUpperCase() == this.authCode.toUpperCase()) {
						login(this.model).then(res => {
							uni.setStorageSync('token', "Bearer "+res.token);
							uni.navigateTo({
								url: '/pages/home/home'
							});
						});

						if (this.model.rememberPsw) {
							uni.setStorage({
								key: 'REMEMBER-KEY',
								data: JSON.stringify(this.model),
								success: function() {
									console.log('success');
								}
							});
						}
					}if (this.model.verification.toUpperCase() !== this.authCode.toUpperCase()){
						uni.$u.toast('验证码错误')
					}
				})
				.catch(err => {
					this.authCode = getRandomNunmer();
					console.log(err);
				});
		}
	}
};
</script>

<style lang="scss" scoped>
.login {
	background: url('../../static/login.png') no-repeat;
	height: 100vh;
	background-size: 100% 100%;
	padding: 0px 15px;

	.school-title {
		padding: 21px 6px;
		width: 151px;
		height: 48px;
	}
	.card {
		background: #ffffff;
		box-shadow: 0px 0px 8px rgba(98, 112, 149, 0.16);
		border-radius: 8px;
		.card-tilte {
			padding: 24px 0px;
			text-align: center;
			.text {
				font-size: 18px;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #575764;
			}
			.login2 {
				margin-top: 0.75rem;
				width: 12rem;
				height: 1.625rem;
			}
			.verification-code {
				display: flex;
				height: 48px;
				align-items: center;
				.verification {
					width: 210px;
					height: 48px;
				}
				.verification-img {
					// margin-left: 15px;
					padding: 10px 22px 9px 22px;
					background: #f9fafc;
					border-radius: 4px;
				}
				.authCode {
					// width: 96px;
					// height: 48px;
					padding: 10px 22px 9px 22px;
					margin-left: 15px;
					text-align: center;
					color: #356ffd;
					font-family: Segoe Script;
					font-weight: 400;
					background: #f9fafc;
				}
			}

			::v-deep .u-form {
				margin: 1rem;
			}
			::v-deep .u-form-item {
				background: #f9fafc;
				margin-bottom: 1rem;
			}
			::v-deep .u-checkbox-group .u-checkbox-group--row {
				margin-top: 16px;
				font-size: 0.875rem;
			}
			::v-deep .u-checkbox-group uni-text {
				line-height: normal !important;
			}
			.appear {
				margin-top: 2.75rem;
				height: 48px;
				background: linear-gradient(270deg, #356ffd 0%, #62a4fe 100%);
				box-shadow: 0px 0px 8px rgba(98, 112, 149, 0.16);
				color: #ffffff;
				border-radius: 4px;
			}
		}
	}
}
</style>
