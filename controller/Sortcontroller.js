// 引入 mysql 数据库 query
let sqlQuery = require('../util/query.js');
let {
    message_err,
    delete_success,
    delete_fail,
    delete_abnormal,
    insert_success,
    insert_fail,
    getData_fail,
    update_success,
    update_fail
} = require('../util/resMesssge.js');

let Sortcontroller = {
    // 展示 admin页面
    admin: (req, res) => {
        res.render('layui-admin.html');
    },
    // 展示 layui-article 页面
    article: (req, res) => {
        res.render('layui-article.html');
    },
    // 展示 layui-sort 页面
    sort: (req, res) => {
        res.render('layui-sort.html');
    },
    // 展示 layui-add 页面
    add: (req, res) => {
        res.render('layui-add.html');
    },
    // 获取分类表数据
    getSort: async(req, res) => {
        let sql = 'select * from article_sort order by rank';
        let result = await sqlQuery(sql);
        res.json(result);
    },
    // 删除数据
    deleteSort: async(req, res) => {
        var response;
        let { sort_id } = req.body;
        // console.log(sort_id);
        if (!sort_id) {
            res.json(message_err);
        } else {
            let mysql = `delete from article_sort where sort_id=${sort_id}`;
            try {
                var result = await sqlQuery(mysql);
                if (result.affectedRows) {
                    response = delete_success;
                } else {
                    response = delete_fail;
                }
            } catch (err) {
                console.log(err);
                response = delete_abnormal;
            }
        };
        res.json(response);
    },
    // 展示 addSortTable 添加分类表格页面
    addSortTable: (req, res) => {
        res.render('layui-addSortTable.html');
    },
    // 添加 sort 表格 updateSortTable
    insertSortTable: async(req, res) => {
        let { category, rank, add_time } = req.body;
        let sql = `insert into article_sort(category,rank,add_time) values('${category}',${rank},'${add_time}')`;
        try {
            var result = await sqlQuery(sql);
            if (result.affectedRows) {
                response = insert_success;
            } else {
                response = insert_fail;
            }
        } catch (err) {
            console.log(err);
            response = delete_abnormal;
        }
        res.json(response);
    },
    // 展示updateSortTable 编辑分类表格页面 
    updateSortTable: (req, res) => {
        res.render('layui-updateSortTable.html');
    },
    // 编辑分类表,获取单条表数据
    getSingleData: async(req, res) => {
        let { sort_id } = req.query;
        if (!sort_id) {
            res.json(message_err);
            return;
        }
        let sql = `select * from article_sort where sort_id=${sort_id}`;
        let result = await sqlQuery(sql);
        if (result.length) {
            result[0].errcode = 0;
            res.json(result[0]);
        } else {
            res.json(getData_fail);
        }
    },
    // 编辑分类表,存入表数据
    editSingData: async(req, res) => {
        // console.log(req.body);
        let { category, rank, add_time, sort_id } = req.body;
        if (!sort_id) {
            res.json(message_err);
            return;
        }
        let sql = `update article_sort set category='${category}',rank=${rank},add_time='${add_time}' where sort_id=${sort_id}`;
        try {
            var result = await sqlQuery(sql);
            if (result.affectedRows) {
                response = update_success;
            } else {
                response = update_fail;
            }
        } catch (err) {
            console.log(err);
            response = delete_abnormal;
        }
        res.json(response);
    }
};

// 暴露控制器
module.exports = Sortcontroller;