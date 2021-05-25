const express = require('express')
const router = express.Router()
const passport = require('passport')

const Multidata = require('../../models/Multidata')

// $route GET api/profiles/test
// @desc 返回请求的json数据
// @access public
router.get('/test', (req, res) =>{
  res.json({msg: "Multidata works"})
})

router.get('/multidata', passport.authenticate('jwt', {session: false}), (req, res) =>{
  Multidata.find()
  .then((msg) => {
    res.json(msg)
  })
})

module.exports = router