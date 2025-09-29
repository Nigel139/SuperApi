export const base_url = 'http://szzxs.code55.cn/'
export const upload_path = 'files/'

// ��ȡ���Ա���
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

// �Ƿ�����
export const isCnLocale = (locale: string) => {
  return locale.indexOf('zh') !== -1;
}

// ��ʽ�����ṹ
export const toTree = (data: Array<any>, id: string, parentId: string) => {
  // ɾ������ children,�Է�ֹ��ε���
  data.forEach(function(item: any) {
    delete item.children;
  });

  // �����ݴ洢Ϊ �� id Ϊ KEY �� map ����������
  var map: any = {};
  data.forEach(function(item: any) {
    map[item[id]] = item;
  });
  
  var val: any = [];
  data.forEach(function(item: any) {
    // �Ե�ǰ�������parentId,ȥmap�������ҵ�������id
    var parent = map[item[parentId]];
    // ����ҵ���������ô˵������ڶ�������,��ô��Ҫ�Ѵ�����ӵ�������Ӧ�ĸ�����
    if (parent) {
      (parent.children || (parent.children = [])).push(item);
    } else {
      //���û����map���ҵ���Ӧ������ID,��ôֱ�Ӱ� ��ǰ��item��ӵ� val������У���Ϊ����
      val.push(item);
    }
  });
  
  return val;
}

// ƴװͼƬURL
export const genImgUrl = (path: String, name: String) => {
    return `${base_url}${upload_path}${path}/${name}`
}