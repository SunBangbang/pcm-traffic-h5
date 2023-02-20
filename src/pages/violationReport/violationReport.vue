<template>
	<view class="report">
		<view class="card">
			<view class="card-tilte">
				<!-- 注意，如果需要兼容微信小程序，最好通过setRules方法设置rules规则 -->
				<u--form labelPosition="left" :model="model1" :rules="rules" ref="form1">
					<u-form-item label="上传照片：" labelPosition="top" required labelWidth="auto" prop="userInfo.upload" borderBottom ref="item1">
						<text class="text-image">(2/3)</text>
						<u-upload :fileList="fileList4" width="99px" height="68px" @afterRead="afterRead" @delete="deletePic" name="4" multiple :maxCount="3">
							<view class="upload">
								<view class="image-logo">
									<image src="../../static/upload.png" mode="widthFix" class="upload-img"></image>
									<view class="image-text">上传图片</view>
								</view>
							</view>
						</u-upload>
					</u-form-item>

					<u-form-item label="车牌号：" required labelWidth="auto" prop="userInfo.name" borderBottom ref="item1">
						<u--input placeholder="请输入" v-model="model1.userInfo.name" border="none" @change="change"></u--input>
					</u-form-item>
					<u-form-item label="违停地点：" prop="userInfo.sex" required labelWidth="auto" borderBottom @click="show = true" ref="item1">
						<u--input v-model="model1.userInfo.sex" disabled disabledColor="#ffffff" placeholder="请选择" border="none"></u--input>
						<u-icon slot="right" name="arrow-right"></u-icon>
					</u-form-item>
					<u-form-item label="违停详情：" prop="userInfo.sex" required labelWidth="auto" borderBottom @click="showSex = true" ref="item1">
						<u--input v-model="model1.userInfo.sex" disabled disabledColor="#ffffff" placeholder="请选择" border="none"></u--input>
						<u-icon slot="right" name="arrow-right"></u-icon>
					</u-form-item>
				</u--form>
				<u-action-sheet :show="showSex" :actions="actions" title="违停地点选择" @close="showSex = false" @select="sexSelect"></u-action-sheet>
				<!-- 上传图片 -->
				<!-- <u-popup :show="show" :round="10" mode="top" @close="close" @open="open">
							<view>
					            <text>人生若只如初见，何事秋风悲画扇</text>
							</view>
					</u-popup> -->
				<u-picker
					title="违停地点选择"
					:show="show"
					ref="uPicker"
					itemHeight="120"
					:columns="columns"
					@cancel="cancel"
					@confirm="confirm"
					@change="changeHandler"
				></u-picker>
			</view>
		</view>
		<view class="popup">
			<u-popup :closeable="true" :show="isShow" mode="bottom" @close="close" @open="open">
				<view class="title">
					<u-image src="../../static/组 3996.png" width="24px" height="22px"></u-image>
					<span>确定要上报吗</span>
				</view>
				<view class="main">
					<view class="top"><span>沪A 66688</span></view>
					<view class="body">
						<u-row customStyle="margin-bottom: 3px">
							<u-col span="3">
								<view class="demo-layout bg-purple-light"><span>违章地点：</span></view>
							</u-col>
						</u-row>
						<u-row customStyle="margin-bottom: 8px">
							<u-col span="12">
								<view class="demo-layout bg-purple"><span>东南大学九龙湖校区两江东路南侧</span></view>
							</u-col>
						</u-row>
						<u-row customStyle="margin-bottom: 3px">
							<u-col span="3">
								<view class="demo-layout bg-purple-light"><span>违章类型：</span></view>
							</u-col>
						</u-row>
						<u-row customStyle="margin-bottom: 8px">
							<u-col span="12">
								<view class="demo-layout bg-purple"><span>违停</span></view>
							</u-col>
						</u-row>
						<u-row customStyle="margin-bottom: 3px">
							<u-col span="3">
								<view class="demo-layout bg-purple-light"><span>违章详情：</span></view>
							</u-col>
						</u-row>
						<u-row customStyle="margin-bottom: 8px">
							<u-col span="12">
								<view class="demo-layout bg-purple"><span>阻塞消防通道</span></view>
							</u-col>
						</u-row>
					</view>
				</view>
				<view class="buttom_dev">
					<u-button @click="handleCancel">取消</u-button>
					<u-button type="primary" :color="$u.color.primary" @click="handleSubmit">确定</u-button>
				</view>
			</u-popup>
		</view>
		<u-button @click="submit" class="read-agree">上报</u-button>
	</view>
</template>

<script>
import EnvProvider from 'jvjr-docker-env';
import { tbStopLocationList } from '@/api/index.js';
export default {
	data() {
		return {
			showSex: false,
			show: false,
			isShow: false,
			model1: {
				userInfo: {
					name: '',
					sex: ''
				}
			},
			actions: [
				{
					name: '男'
				},
				{
					name: '女'
				},
				{
					name: '保密'
				}
			],
			// columns: [['中国', '美国'], ['深圳', '厦门', '上海', '拉萨']],
			columns:[],
			columnData: [],
			// columnData: [['深圳', '厦门', '上海', '拉萨'], ['得州', '华盛顿', '纽约', '阿拉斯加']],
			rules: {
				// 车牌号
				'userInfo.name': {
					type: 'string',
					required: true,
					message: '请输入',
					trigger: ['blur', 'change']
				},
				'userInfo.sex': {
					type: 'string',
					max: 1,
					required: true,
					message: '请选择男或女',
					trigger: ['blur', 'change']
				}
			},
			action: 'file/upload',
			fileList4: [],
			// show: false,
			radio: '',
			switchVal: false
		};
	},
	async mounted() {
		const res = await tbStopLocationList();

		let temp = [];
		res.forEach(v => {
			let index = temp.findIndex(v1 => v1.campusName === v.campusName);
			if (index >= 0) {
				temp[index].children.push({id:v.id,name:v.name});
			} else {
				temp.push({
					campusName: v.campusName,
					campus:v.campus,
					children: [{id:v.id,name:v.name}]
				});
			}
		});
		const columns2=[]
		const columnData2=[]
		temp.forEach(item=>{
			columns2.push(item.campusName)
			let temp2=[]
			item.children.forEach(v2=>{
				temp2.push(v2.name)
			})
			columnData2.push(temp2)
		})
		this.columns.push(columns2)
		this.columns.push(columnData2[0])
		this.columnData=(columnData2)
		console.log(columnData2);
		console.log(this.columns,'this.columns');
		console.log(this.columnData,'this.columnData');
		console.log(temp);
	},
	methods: {
		submit() {
			this.isShow = true;
			// uni.navigateTo({
			// 	url: '/pages/violationReport/violationReport'
			// });
		},
		sexSelect(e) {
			this.model1.userInfo.sex = e.name;
			this.$refs.form1.validateField('userInfo.sex');
		},
		// 删除图片
		deletePic(event) {
			this[`fileList${event.name}`].splice(event.index, 1);
		},
		// 新增图片
		async afterRead(event) {
			// 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
			let lists = [].concat(event.file);
			let fileListLen = this[`fileList${event.name}`].length;
			lists.map(item => {
				this[`fileList${event.name}`].push({
					...item,
					status: 'uploading',
					message: '上传中'
				});
			});
			for (let i = 0; i < lists.length; i++) {
				const result = await this.uploadFilePromise(lists[i].url);
				let item = this[`fileList${event.name}`][fileListLen];
				this[`fileList${event.name}`].splice(
					fileListLen,
					1,
					Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					})
				);
				fileListLen++;
			}
		},
		uploadFilePromise(url) {
			const baseURL = EnvProvider.value('BASE_URL');
			return new Promise((resolve, reject) => {
				let a = uni.uploadFile({
					url: baseURL + this.action, // 仅为示例，非真实的接口地址
					filePath: url,
					name: 'file',
					header: {
						Authorization: uni.getStorageSync('token'), //自定义请求头信息
						grandType: '02',
						user_name: 'lspcptest'
					},
					formData: {
						user: 'test'
					},
					success: res => {
						setTimeout(() => {
							resolve(res.data.data);
						}, 1000);
					}
				});
			});
		},
		// 违停地点
		changeHandler(e) {
			console.log(e);
			const {
				columnIndex,
				value,
				values, // values为当前变化列的数组内容
				index,
				// 微信小程序无法将picker实例传出来，只能通过ref操作
				picker = this.$refs.uPicker
			} = e;
			console.log(index);
			// 当第一列值发生变化时，变化第二列(后一列)对应的选项
			if (columnIndex === 0) {
				// picker为选择器this实例，变化第二列对应的选项
				picker.setColumnValues(1, this.columnData[index]);
			}
		},
		// 回调参数为包含columnIndex、value、values
		confirm(e) {
			console.log('confirm', e);
			this.show = false;
		},
		cancel(e) {
			console.log('cancel', e);
			this.show = false;
		},
		open() {},
		close() {
			this.isShow = false;
			// console.log('close');
		},
		//取消
		handleCancel() {
			this.isShow = false;
		},
		//确定
		handleSubmit() {
			uni.navigateTo({
				url: '/pages/stopReport/stopReport'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.report {
	background: #f2f4f8;
	height: 100vh;
	padding: 16px 15px 0px 15px;
	.usage-notice {
		margin: 28px 140px 16px 140px;
		width: 80px;
		height: 27px;
	}
	.card {
		background: #ffffff;
		box-shadow: 0px 0px 8px rgba(98, 112, 149, 0.16);
		border-radius: 4px;
		.card-tilte {
			padding: 16px 12px 48px 12px;
			::v-deep .u-upload {
				margin-top: 20px;
			}
			::v-deep .u-form-item__body {
				flex-direction: column !important;
			}
			::v-deep .u-icon__icon {
				font-size: 10px !important;
				line-height: 10px !important;
			}
			::v-deep .u-upload__deletable {
				width: 12px;
				height: 12px;
				background: #ff4a4a;
				box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.16);
				border-radius: 50%;
			}
			.text-image {
				position: absolute;
				top: 42px;
				left: 105px;
				font-size: 14px;
				color: #c1c6ce;
				font-family: Source Han Sans CN;
			}
			.upload {
				width: 50px;
				background: #f8f9fb;
				padding: 10px 25px 10px 26px;
				border-radius: 2px;
				.image-logo {
					width: 48px;
					height: 48px;
					text-align: center;
					.upload-img {
						width: 24px;
						height: 24px;
					}

					.image-text {
						font-size: 12px;
						text-align: center;
						font-family: Source Han Sans CN;
						font-weight: 400;
						color: #575764;
					}
				}
			}
		}
	}
	.popup {
		display: flex;
		.title {
			margin-top: 25px;
			display: flex;
			justify-content: center;
			span {
				margin-left: 12px;
				font-size: 16px;
				font-family: Source Han Sans CN;
				font-weight: bold;
				color: #000000;
				opacity: 1;
			}
		}
		.main {
			background-image: url('../../static/card_parting1.png.png');
			margin: 20px auto 20px;
			width: 350px;
			height: 266px;
			.top {
				margin-left: 30px;
				margin-top: 22px;
				span {
					font-size: 20px;
					font-family: Source Han Sans CN;
					font-weight: bold;
					color: #ffffff;
				}
			}
			.body {
				margin-left: 24px;
				margin-top: 28px;
				.bg-purple-light {
					font-size: 14px;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #89909a;
					opacity: 1;
				}
				.bg-purple {
					font-size: 14px;
					font-family: Source Han Sans CN;
					font-weight: 500;
					color: #575764;
					opacity: 1;
				}
			}
		}
		.buttom_dev {
			display: flex;
			.u-button {
				border-bottom-left-radius: 3px;
				border-bottom-right-radius: 3px;
				border-top-left-radius: 3px;
				border-top-right-radius: 3px;
				width: 165px;
				margin-bottom: 20px;
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
