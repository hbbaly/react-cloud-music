# 添加api

[点击这里](../src/api/index.js 'api')

`api`文件夹内recommend.js

```js
import http from '../utils/http'
const getBannerList = () => {
  return http.get('banner/get')
}
const getRecommendSingers = () => {
  return http.get('/personalized')
}
export default {
  getBannerList,
  getRecommendSingers
}
```
`index.js`

```js
import recommendApi from './recommend'

export default {
  recommendApi
}
```