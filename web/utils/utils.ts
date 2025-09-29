export const base_url = 'http://szzxs.code55.cn/'
export const upload_path = 'files/'

// 生成图片URL地址
export const genImgUrl = (path: String, name: String) => {
    return `${base_url}${upload_path}${path}/${name}`
}