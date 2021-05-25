const express = require('express')
const router = express.Router()
const passport = require('passport')

const Category = require('../../models/Category')

// $route GET api/profiles/test
// @desc 返回请求的json数据
// @access public
router.get('/test', (req, res) =>{
  res.json({msg: "Category works"})
})

router.get('/', passport.authenticate('jwt', {session: false}), (req, res) =>{
  Category.find()
  .then((msg) => {
    res.json(msg)
  })
})

module.exports = router