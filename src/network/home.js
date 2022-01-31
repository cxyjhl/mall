import { request } from "./request";

// 单独对页面的网络请求进行提取,方便到时候进行管理

export function getHomeMultidata(){
  return request({
    url: '/home/multidata'
  })
}

export function getHomeGoods(type, page){
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}