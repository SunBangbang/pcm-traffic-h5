/*
 * @Author: sxw sunxiaoweizpy@163.com
 * @Date: 2023-02-02 18:33:53
 * @version: 1.0
 * @LastEditors: sxw sunxiaoweizpy@163.com
 * @LastEditTime: 2023-02-03 16:37:28
 * @Descripttion: your project
 */
import {
	request
} from '@/utils/request.js'



// export const login2 = (page, rows) => request({url: '/crmUser/login',method: 'post',data: {page,rows}})
export const login = (data) => request({
	url: 'crmUser/login',
	method: 'post',
	data
})
// 违停地点列表
export const tbStopLocationList = () => request({
	url: 'tbStopLocation/list',
	method: 'get',
})
// 上传图片
export const upload = (data) => request({
	url: 'crmUser/login',
	method: 'post',
	header: {
		'Content-Type': 'multipart/form-data'
	},
	data
})
// 上报记录
export const reportRecord = (data) => request({
	url:'tbReportRecord/reportRecordPage',
	method:'post',
	data
})
