const express = require('express')
const router = express.Router()
const passport = require('passport')

const Profile = require('../../models/Profile')

// $route GET api/profiles/test
// @desc 返回请求的json数据
// @access public
router.get('/test', (req, res) =>{
  res.json({msg: "profile works"})
})

// $route GET api/profiles/add
// @desc 创建信息接口
// @access private
router.post('/add', passport.authenticate('jwt', {session: false}), (req, res) => {
  const profileFields = {}
  if(req.body.type) {profileFields.type = req.body.type}
  if(req.body.describe) {profileFields.describe = req.body.describe}
  if(req.body.income) {profileFields.income = req.body.income}
  if(req.body.expend) {profileFields.expend = req.body.expend}
  if(req.body.cash) {profileFields.cash = req.body.cash}
  if(req.body.remark) {profileFields.remark = req.body.remark}

  // 添加数据保存到User01数据库中的profile集合中
  new Profile(profileFields).save()
                            .then(profile => {
                              res.json(profile)
                            })
})

// $route GET api/profiles
// @desc 获取所有信息
// @access private
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
  Profile.find()
         .then(profile => {
           if(!profile) {
            res.status(404).json('没有任何内容')
           }
           res.json(profile)
         })
         .catch(err => console.log(err))
})

// $route GET api/profiles:id   url中 : 必加
// @desc 获取单个信息
// @access private
router.get('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  Profile.findOne({_id: req.params.id})
         .then(profile => {
           if(!profile) {
             res.status(404).json('没有任何内容')
           }
           res.json(profile)
         })
         .catch(err => console.log(err))
})

// $route GET api/profiles/edit:id
// @desc 编辑信息接口
// @access private
router.post('/edit/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  const profileFields = {}
  if(req.body.type) {profileFields.type = req.body.type}
  if(req.body.describe) {profileFields.describe = req.body.describe}
  if(req.body.income) {profileFields.income = req.body.income}
  if(req.body.expend) {profileFields.expend = req.body.expend}
  if(req.body.cash) {profileFields.cash = req.body.cash}
  if(req.body.remark) {profileFields.remark = req.body.remark}

  // 新获取到的信息保存到带有这个_id标志的User01数据库中的profile集合中
  // Model.findOneAndUpdate() moogose对数据库实现查询并且更新的方法
  Profile.findOneAndUpdate(
    {_id: req.params.id},
    {$set: profileFields},
    {new: true}
  ).then(profile => res.json(profile))
})

// $route delete api/profiles/delete
// @desc 编辑信息接口
// @access private
router.delete('/delete/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  Profile.findOneAndRemove({_id: req.params.id})
         .then(profile => {
           if(profile) {
            res.json(profile)
           } else {
             res.json('已删除')
           }
         })
         .catch(err => res.status(404).json('删除失败'))
})

module.exports = router