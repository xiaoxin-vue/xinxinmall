const express = require('express')
const router = express.Router()
const passport = require('passport')

const RecommendData = require('../../models/Recommend')

// $route GET api/profiles/test
// @desc 返回请求的json数据
// @access public
router.get('/test', (req, res) =>{
  res.json({msg: "RecommendData works"})
})

router.get('/', passport.authenticate('jwt', {session: false}), (req, res) =>{
  RecommendData.findOne()
  .then((msg) => {
    res.json(msg)
  })
})

module.exports = router