export const base_url = 'http://szzxs.code55.cn/'
export const upload_path = 'files/'

// 获取语言标题
export const getLocaleTitle = (locale: string, meta: any) => {
  try {
    if (isCnLocale(locale)) {
      return meta?.title;
    } else {
      const idx = locale.indexOf('-');
      const lang = locale.substring(0, idx);
      return meta[`${lang}_title`];
    }
  } catch (error) {
    console.log(error);
  }
}

// 是否中文
export const isCnLocale = (locale: string) => {
  return locale.indexOf('zh') !== -1;
}

// 格式化树结构
export const toTree = (data: Array<any>, id: string, parentId: string) => {
  // 删除所有 children,以防止多次调用
  data.forEach(function(item: any) {
    delete item.children;
  });

  // 将数据存储为 以 id 为 KEY 的 map 索引数据列
  var map: any = {};
  data.forEach(function(item: any) {
    map[item[id]] = item;
  });
  
  var val: any = [];
  data.forEach(function(item: any) {
    // 以当前遍历项的parentId,去map对象中找到索引的id
    var parent = map[item[parentId]];
    // 如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
    if (parent) {
      (parent.children || (parent.children = [])).push(item);
    } else {
      //如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
      val.push(item);
    }
  });
  
  return val;
}

// 拼装图片URL
export const genImgUrl = (path: String, name: String) => {
    return `${base_url}${upload_path}${path}/${name}`
}