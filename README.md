# 项目文档

## App.vue根组件
### 1. Header区域，固定在顶部，由Mint-UI中的Header组件实现
### 2. 中间区域，router-view展示路由匹配到的组件
### 3. Tabbar区域，固定在底部，由MUI中的底部选项卡tabbar实现
###    每个选项是router-link to
###    linkActiveClass实现路由被激活时的样式
###    实现路由组件切换功能

## Home.vue组件
### 1. 轮播图，由Mint-UI中的Swipe组件实现
###    从后台获取轮播图数据vue-resource，包括点击轮播图链接到的url地址及背景图地址
###    设置轮播图背景v-for和key
### 2. 六宫格，MUI的grid-default

## 组件切换时的动画
