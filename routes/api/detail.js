const express = require('express')
const router = express.Router()
const passport = require('passport')

const Detail = require('../../models/Detail')

// $route GET api/profiles/test
// @desc 返回请求的json数据
// @access public
router.get('/test', (req, res) =>{
  res.json({msg: "Detail works"})
})

router.get('/', passport.authenticate('jwt', {session: false}), (req, res) =>{
  console.log(req.query)
  Detail.findOne({iid: req.query.iid})
  .then((msg) => {
    res.json(msg)
  })
})

module.exports = router