import httpRequest from './request';


// 全部视频信息
export const allVideoInfo = () => {
  return httpRequest.get('/zxsapi/video/all', {});
}
// 全部新闻类型
export const allNewsTypes = () => {
  return httpRequest.get('/zxsapi/news/allTypes', {});
}
// 获取新闻摘要信息
export const getNewsList = (data: any) => {
  return httpRequest.get('/zxsapi/news/getNews', data);
}
// 获取新闻详情
export const getNewsDetails = (data: any) => {
  return httpRequest.get('/zxsapi/news/getDetails', data);
}
// 全部产品信息
export const allProds = () => {
  return httpRequest.get('/zxsapi/prod/all', {});
}
// 获取产品详情
export const getProdDetails = (data: any) => {
  return httpRequest.get('/zxsapi/prod/getDetails', data);
}
// 获取验证码
export const getCapcha = () => {
  return httpRequest.get('/FixedApi/GenVerifyCode');
}
// 写入客户咨询
export const createCounsel = (data: any) => {
  return httpRequest.post('/zxsapi/cust/counsel', data);
}
// 全部应用案例信息
export const allAppInfo = () => {
  return httpRequest.get('/zxsapi/app/all', {});
}
// 全部质保信息
export const allSupportInfo = () => {
  return httpRequest.get('/zxsapi/support/all', {});
}
// 获取基础信息
export const getBaseInfo = () => {
  return httpRequest.get('/zxsapi/baseInfo/getInfo', null);
}