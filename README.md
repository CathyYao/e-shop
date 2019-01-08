## 项目文档

## App.vue根组件
####  1. Header区域，固定在顶部，由Mint-UI中的Header组件实现
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
##### 3.1 NewsInfo组件，新闻详情
######   路由组件传参this.$route.params.id
######   新闻详情布局和渲染
######   插入Comments组件

## 定义全局过滤器实现日期格式化

## Comments组件封装
######（1）评论布局
######（2）获取评论数据加载至页面（父组件向子组件传值）
######（3）加载更多
######（4）发表评论（v-model、校验输入内容不为空、发表评论、post请求、刷新列表）