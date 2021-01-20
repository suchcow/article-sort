const express = require('express');

// 得到一个路由器
let router = express.Router();

//  导入控制器
let Sortcontroller = require('../controller/Sortcontroller.js');
// console.log(Sortcontroller);

// 在路由器身上绑定路由
router.get(/^\/$|^\/admin$/, Sortcontroller.admin); // admin页面

router.get('/article', Sortcontroller.article); // layui-article 页面

router.get('/sort', Sortcontroller.sort); // layui-sort 页面

router.get('/add', Sortcontroller.add); // layui-add 页面

router.get('/getSort', Sortcontroller.getSort); // 获取分类表数据

router.post('/deleteSort', Sortcontroller.deleteSort); // 删除数据

router.get('/addSortTable', Sortcontroller.addSortTable); // addSortTable 添加分类表格页面 

router.post('/insertSortTable', Sortcontroller.insertSortTable); // 添加 sort 表格

router.get('/updateSortTable', Sortcontroller.updateSortTable); // 展示updateSortTable 编辑分类表格页面 

router.get('/getSingleData', Sortcontroller.getSingleData); // 编辑分类表,获取单条表数据 

router.post('/editSingData', Sortcontroller.editSingData); // 添加 sort 表格



// 暴露路由器
module.exports = router;