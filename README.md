## 项目文档

## App.vue根组件
####  1. Header区域，固定在顶部，返回按钮，由Mint-UI中的Header组件实现
####  2. 中间区域，router-view展示路由匹配到的组件
####  3. Tabbar区域，固定在底部，由MUI中的底部选项卡tabbar实现
######   每个选项是router-link to
######   linkActiveClass实现路由被激活时的样式
######   实现路由组件切换功能
####  4. 组件切换时的动画

## Home.vue组件
####  1. 轮播图，由Mint-UI中的Swipe组件实现
######   从后台获取轮播图数据vue-resource
######   设置轮播图背景v-for和key
####  2. 六宫格，MUI的grid-default
####  3. NewsList组件，新闻资讯
######   布局新闻列表，MUI的media-list图文列表
######   从后台获取新闻列表数据vue-resource，并渲染到列表中
######   NewsInfo组件，新闻详情（布局和渲染、加载内容、插入Comments组件）
####  4. PhotoList组件，图片分享
######   布局滑动条，MUI的tab-top-webview-main，移除严格模式，处理兼容问题
######   获取滑动条数据并加载
######   获取图片列表，Mint-UI懒加载lazy-load（需完整引入）
######   PhotoInfo组件，设置图片及内容摘要样式，将图片改为路由
######   布局图片详情，包括缩略图vue-preview
####  5. GoodsList组件，商品购买
######   商品列表，经典两列布局，加载更多
######   GoodsInfo组件，MUI的cart布局，插入Swiper组件，获取数据
######   MUI的numbox封装GoodsInfo_numbox组件，设置商品数量的最大值（watch），给父组件传递商品数量
######   图文介绍和商品评论组件
######   加入购物车动画，适配滚动条位置和分辨率（操作DOM、ref和原生）

## vuex与购物车
######   点击加入购物车，将商品数据提交至store
######   购物车商品的本地存储localStorage
######   徽标

## Cart.vue组件
######   布局商品列表，MUI的card，Mint-UI的Switch，封装Cart_numbox组件
######   获取并加载购物车页面数据
######   实现numbox数据正确显示，且numbox中数据改变同步到store中，同步是否选中，删除商品
######   布局结算，显示选中商品数量和总价

## 定义全局过滤器实现日期格式化

## Comments组件封装
###### 评论布局
###### 获取评论数据加载至页面（父组件向子组件传值）
###### 加载更多
###### 发表评论（v-model、校验输入内容不为空、发表评论、post请求、刷新列表）

## Swiper组件封装
###### 包括html和style，props接收数据
###### isFull属性设置图片是宽高100%还是宽自适应高100%