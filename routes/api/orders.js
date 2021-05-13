const express = require('express')
const router = express.Router()
const passport = require('passport')

const Order = require('../../models/Order')

// $route GET api/profiles/test
// @desc 返回请求的json数据
// @access public
router.get('/test', (req, res) =>{
  res.json({msg: "order works"})
})

// $route GET api/order/add
// @desc 创建信息接口
// @access private
router.post('/add', passport.authenticate('jwt', {session: false}), (req, res) => {
  console.log('niah')
  console.log(req.query)
  console.log(req.body)
  const orderFields = {}
  if(req.body.name) {orderFields.name = req.body.name}
  if(req.body.goods) {orderFields.goods = req.body.goods}

  Order.findOne({name: orderFields.name})
  .then(o => {
    console.log('kkkks')
    console.log(o)
    if (o) {
      console.log('推进的订单');
      Order.findOneAndUpdate({name: orderFields.name}, {$push: {"goods": orderFields.goods}})
               .then(order => {
                 res.json(order)
               })
    } else {
      console.log('新的订单');
      new Order(orderFields).save()
             .then(order => {
               if(!order) {
               res.status(404).json('没有任何内容')
               }
               res.json(order)
             })
             .catch(err => console.log(err))
    }
  })
      //  .then(() => {
      //     Order.findOneAndUpdate({name: orderFields.name}, {$push: {"goods": orderFields.goods}})
      //          .then(order => {
      //            console.log(order)
      //            res.json(order)
      //          })
      //  })
      //  .catch(() => {
      //    console.log('dfafasfafas')
      //    new Order(orderFields).save()
      //        .then(order => {
      //          if(!order) {
      //          res.status(404).json('没有任何内容')
      //          }
      //          return res.json(order)
      //        })
      //        .catch(err => console.log(err))
      //  })
})

// $route GET api/order/currentUserOrder 根据?name=test01 返回相对应的订单商品 params => req.query
// @desc 创建信息接口
// @access private
router.get('/currentUserOrder', passport.authenticate('jwt', {session: false}), (req, res) => {
  // console.log(req.query.name, 'sadf')
  Order.find({name: req.query.name})
       .then((orders) => {
         res.send(orders)
       })
       .catch(err => {
         res.send('订单为空')
       })
})

// $route GET api/order/delete/orderGood 删除当前用户单个商品订单
// @desc 创建信息接口
// @access private
router.delete('/delete/orderGood', passport.authenticate('jwt', {session: false}), (req, res) => {
  console.log(req.query.iid)
  console.log(req.query.name)
  Order.findOneAndUpdate({name: req.query.name}, {$pull: {"goods": {iid: req.query.iid}}})
        .then(orders => {
          if(!orders) {
          res.status(404).json('没有任何内容')
          }
          res.json(orders)
        })
        .catch(err => console.log(err))
})

// $route GET api/order/delete/allOrderGood 删除当前用户所有商品订单
// @desc 创建信息接口
// @access private
router.delete('/delete/allOrderGood', passport.authenticate('jwt', {session: false}), (req, res) => {
  console.log(req.query.name)
  Order.findOneAndUpdate({name: req.query.name}, {$set: {"goods": []}})
        .then(() => {
          console.log('sda')
          res.send('删除成功')
        })
        .catch(err => console.log(err))
})

// $route GET api/order/allOrders 获取所有商品信息
// @desc 创建信息接口
// @access private
router.get('/allOrders', passport.authenticate('jwt', {session: false}), (req, res) => {
  Order.find()
       .then((orders) => {
         res.json(orders)
       })
})

module.exports = router