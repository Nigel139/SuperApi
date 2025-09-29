import httpRequest from './request';

// 系统会员、岗位、角色、部门量
export const statisticsSysCounts = () => {
  let data = {
    userCount: 1,
    deptCount: 2,
    roleCount: 3,
    postCount: 4
  }
  return {
    code: 200,
    data: data
  }
  // return httpRequest.get('/statistics/sysCounts');
}

// 咨询列表
export const queryCounsels = (data: any) => {
  return httpRequest.get('/zxsapi/counsel/list', data);
}
// 咨询删除
export const delCounsels = (data: any) => {
  return httpRequest.post('/zxsapi/counsel/delete', data);
}
/****************** 角色 start ************************/

// 全部角色
export const queryAllRoles = () => {
  return httpRequest.get('/zxsapi/role/all');
}

// 角色列表
export const queryRoles = (params: any) => {
  return httpRequest.get('/zxsapi/role/getList', params);
}

// 角色创建
export const roleCreate = (data: any) => {
  return httpRequest.post('/zxsapi/role/create', data);
}

// 角色更新
export const roleUpdate = (data: any) => {
  return httpRequest.post('/zxsapi/role/update', data);
}

// 角色删除
export const roleDelete = (params: any) => {
  return httpRequest.get('/zxsapi/role/delete', params);
}
/****************** 角色 end ************************/

/****************** 后台管理员 start ************************/
// 获取验证码
export const getCapcha = () => {
  return httpRequest.get('/FixedApi/GenVerifyCode');
}
// 登录
export const login = (data: any) => {
  return httpRequest.post('/zxsapi/admin/login', data);
}

// 查询用户信息
export const queryUserInfo = (params: any) => {
  return httpRequest.get('/zxsapi/admin/info', params);
}

// 用户列表
export const queryUsers = (params: any) => {
  return httpRequest.get('/zxsapi/admin/getList', params);
}

// 用户创建
export const userCreate = (data: any) => {
  return httpRequest.post('/zxsapi/admin/create', data);
}

// 用户更新
export const userUpdate = (data: any) => {
  return httpRequest.post('/zxsapi/admin/update', data);
}

// 用户删除
export const userDelete = (params: any) => {
  return httpRequest.get('/zxsapi/admin/delete', params);
}
// 用户删除
export const userResetpwd = (params: any) => {
  return httpRequest.get('/zxsapi/admin/resetpwd', params);
}

/****************** 后台管理员 end ************************/

/****************** 菜单 start ************************/
// 全部菜单
export const queryAllMenus = () => {
  return httpRequest.get('/zxsapi/menu/allData');
}

// 全部路由
export const queryAllRoutes = () => {
  return httpRequest.get('/zxsapi/menu/getByUser');
}

// 菜单列表
export const queryMenus = (params: any) => {
  return httpRequest.get('/zxsapi/menu/getList', params);
}

// 菜单创建
export const menuCreate = (data: any) => {
  return httpRequest.post('/zxsapi/menu/create', data);
}

// 菜单更新
export const menuUpdate = (data: any) => {
  return httpRequest.post('/zxsapi/menu/update', data);
}

// 菜单删除
export const menuDelete = (params: any) => {
  return httpRequest.get('/zxsapi/menu/delete', params);
}
/****************** 菜单 end ************************/

/****************** 图片标签 start ************************/
// 创建标签
export const imgtagCreate = (data: any) => {
  return httpRequest.post('/zxsapi/image/createTag', data);
}
// 获取标签列表-分页
export const imgtagList = (data: any) => {
  return httpRequest.post('/zxsapi/image/tagList', data);
}
// 获取所有标签
export const imgtagAll = () => {
  return httpRequest.post('/zxsapi/image/tagAll', null);
}
// 删除标签
export const imgtagDelete = (data: any) => {
  return httpRequest.post('/zxsapi/image/deltag', data);
}
// 更新标签基本信息
export const imgtagUpdate = (data: any) => {
  return httpRequest.post('/zxsapi/image/uptag', data);
}
// 更新标签图片数量
export const imgtagUpdateCount = (data: any) => {
  return httpRequest.post('/zxsapi/image/uptagcnt', data);
}
/****************** 图片标签 end ************************/


/****************** 图片管理 start ************************/
// 获取图片列表-分页
export const imgList = (data: any) => {
  return httpRequest.post('/zxsapi/image/imgList', data);
}
// 创建图片信息
export const imgCreate = (data: any) => {
  return httpRequest.post('/zxsapi/image/imgCreate', data);
}
// 删除图片信息
export const imgDelete = (data: any) => {
  return httpRequest.post('/zxsapi/image/imgDelete', data);
}
// 修改图片信息
export const imgUpdate = (data: any) => {
  return httpRequest.post('/zxsapi/image/imgUpdate', data);
}
// 获取图片URL
export const imgGetUrl = (data: any) => {
  return httpRequest.post('/zxsapi/image/getUrl', data);
}
/****************** 图片管理 End ************************/

/****************** 产品类型 start ************************/
// 全部产品类型
export const queryAllProdTypes = (data: any) => {
  return httpRequest.get('/zxsapi/ptype/allData', data);
}

// 产品类型创建
export const prodTypeCreate = (data: any) => {
  return httpRequest.post('/zxsapi/ptype/create', data);
}

// 产品类型更新
export const prodTypeUpdate = (data: any) => {
  return httpRequest.post('/zxsapi/ptype/update', data);
}

// 产品类型删除
export const prodTypeDelete = (params: any) => {
  return httpRequest.get('/zxsapi/ptype/delete', params);
}
/****************** 产品类型 end ************************/

/****************** 产品管理 start **********************/
// 获取图片列表-分页
export const prodList = (data: any) => {
  return httpRequest.post('/zxsapi/prod/list', data);
}
// 创建产品 
export const prodCreate = (data: any) => {
  return httpRequest.post('/zxsapi/prod/create', data);
}
// 更新产品 
export const prodUpdate = (data: any) => {
  return httpRequest.post('/zxsapi/prod/update', data);
}
// 删除产品 
export const prodDelete = (data: any) => {
  return httpRequest.post('/zxsapi/prod/delete', data);
}
/****************** 产品管理 End ************************/

/****************** 新闻管理 start ************************/
// 全部新闻类型
export const allNewsTypes = () => {
  return httpRequest.get('/zxsapi/news/allTypes', {});
}

// 新闻类型创建
export const newsTypeCreate = (data: any) => {
  return httpRequest.post('/zxsapi/news/createType', data);
}

// 新闻类型更新
export const newsTypeUpdate = (data: any) => {
  return httpRequest.post('/zxsapi/news/updateType', data);
}

// 新闻类型删除
export const newsTypeDelete = (params: any) => {
  return httpRequest.get('/zxsapi/news/deleteType', params);
}

// 查询新闻列表
export const allNews = (data: any) => {
  return httpRequest.get('/zxsapi/news/getList', data);
}
// 新闻创建
export const newsCreate = (data: any) => {
  return httpRequest.post('/zxsapi/news/create', data);
}

// 新闻更新
export const newsUpdate = (data: any) => {
  return httpRequest.post('/zxsapi/news/update', data);
}
// 新闻删除
export const newsDelete = (data: any) => {
  return httpRequest.post('/zxsapi/news/delete', data);
}
/****************** 新闻管理 end ************************/

/****************** 视频管理 start ************************/
// 全部视频类型
export const allVideoTypes = () => {
  return httpRequest.get('/zxsapi/media/allTypes', {});
}

// 视频类型创建
export const videoTypeCreate = (data: any) => {
  return httpRequest.post('/zxsapi/media/createType', data);
}

// 视频类型更新
export const videoTypeUpdate = (data: any) => {
  return httpRequest.post('/zxsapi/media/updateType', data);
}

// 视频类型删除
export const videoTypeDelete = (params: any) => {
  return httpRequest.get('/zxsapi/media/deleteType', params);
}

// 查询视频列表
export const allVideos = (data: any) => {
  return httpRequest.get('/zxsapi/media/getList', data);
}
// 视频创建
export const videoCreate = (data: any) => {
  return httpRequest.post('/zxsapi/media/create', data);
}

// 视频更新
export const videoUpdate = (data: any) => {
  return httpRequest.post('/zxsapi/media/update', data);
}
// 视频删除
export const videoDelete = (data: any) => {
  return httpRequest.post('/zxsapi/media/delete', data);
}
/****************** 视频管理 end ************************/

/****************** 应用案例 start ************************/
// 全部应用场景
export const allAppTypes = (data: any) => {
  return httpRequest.get('/zxsapi/app/allTypes', data);
}

// 应用场景创建
export const appTypeCreate = (data: any) => {
  return httpRequest.post('/zxsapi/app/createType', data);
}

// 应用场景更新
export const appTypeUpdate = (data: any) => {
  return httpRequest.post('/zxsapi/app/updateType', data);
}

// 应用场景删除
export const appTypeDelete = (params: any) => {
  return httpRequest.get('/zxsapi/app/deleteType', params);
}

// 应用展示列表
export const allAppShows = (data: any) => {
  return httpRequest.get('/zxsapi/app/getList', data);
}
// 应用展示创建
export const appShowCreate = (data: any) => {
  return httpRequest.post('/zxsapi/app/create', data);
}

// 应用展示更新
export const appShowUpdate = (data: any) => {
  return httpRequest.post('/zxsapi/app/update', data);
}
// 应用展示删除
export const appShowDelete = (data: any) => {
  return httpRequest.post('/zxsapi/app/delete', data);
}
/****************** 应用案例 end ************************/

/****************** 服务支持 start ************************/
// 创建常见问答
export const qaCreate = (data: any) => {
  return httpRequest.post('/zxsapi/qa/create', data);
}
// 修改常见问答
export const qaUpdate = (data: any) => {
  return httpRequest.post('/zxsapi/qa/update', data);
}
// 删除常见问答
export const qaDelete = (data: any) => {
  return httpRequest.post('/zxsapi/qa/delete', data);
}
// 常见问答列表-分页
export const qaList = (data: any) => {
  return httpRequest.get('/zxsapi/qa/getList', data);
}
// 创建质保详情
export const qualityCreate = (data: any) => {
  return httpRequest.post('/zxsapi/quality/create', data);
}
// 修改质保详情
export const qualityUpdate = (data: any) => {
  return httpRequest.post('/zxsapi/quality/update', data);
}
// 删除质保详情
export const qualityDelete = (data: any) => {
  return httpRequest.post('/zxsapi/quality/delete', data);
}
// 质保详情列表-分页
export const qualityList = (data: any) => {
  return httpRequest.post('/zxsapi/quality/getList', data);
}
// 获取质保介绍
export const qualityContent = () => {
  return httpRequest.post('/zxsapi/quality/get');
}
// 保存质保介绍
export const qualitySave = (data: any) => {
  return httpRequest.post('/zxsapi/quality/save', data);
}
/****************** 服务支持 start ************************/

/****************** 基础信息 start ************************/
// 获取基础信息
export const getBaseInfo = () => {
  return httpRequest.get('/zxsapi/baseInfo/get');
}
// 保存网站信息
export const saveSiteInfo = (data: any) => {
  return httpRequest.get('/zxsapi/baseInfo/saveSiteInfo', data);
}
// 保存联系方式
export const saveContacterInfo = (data: any) => {
  return httpRequest.get('/zxsapi/baseInfo/saveContacter', data);
}
// 保存客服二维码
export const saveServiceInfo = (data: any) => {
  return httpRequest.get('/zxsapi/baseInfo/saveService', data);
}
// 获取公司地址列表
export const getCorpAddrList = (data: any) => {
  return httpRequest.get('/zxsapi/baseInfo/allCorpAddr', data);
}
// 创建公司地址
export const createCorpAddr = (data: any) => {
  return httpRequest.get('/zxsapi/baseInfo/createAddr', data);
}
// 更新公司地址
export const updateCorpAddr = (data: any) => {
  return httpRequest.get('/zxsapi/baseInfo/updateAddr', data);
}
// 删除公司地址
export const deleteCorpAddr = (data: any) => {
  return httpRequest.get('/zxsapi/baseInfo/deleteAddr', data);
}
/****************** 基础信息 end ************************/

/****************** 首页 start ************************/
// 获取banner图片列表
export const bannerList = () => {
  return httpRequest.post('/zxsapi/banner/list', null);
}
// 创建banner图片
export const bannerCreate = (data: any) => {
  return httpRequest.post('/zxsapi/banner/create', data);
}
// 删除banner图片
export const bannerDelete = (data: any) => {
  return httpRequest.post('/zxsapi/banner/delete', data);
}
// 修改图片引用的链接信息
export const imgRefUpdate = (data: any) => {
  return httpRequest.post('/zxsapi/imgref/upLink', data);
}
/****************** 首页 End ************************/