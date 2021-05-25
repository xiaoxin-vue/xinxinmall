const express = require('express')
const router = express.Router()
const passport = require('passport')

const Home = require('../../models/Home')

// $route GET api/profiles/test
// @desc 返回请求的json数据
// @access public
router.get('/test', (req, res) =>{
  res.json({msg: "Home works"})
})

router.get('/data', passport.authenticate('jwt', {session: false}), (req, res) =>{
  console.log(req.query)
  Home.find({type: req.query.type})
  .then((msg) => {
    res.json(msg)
  })
})

module.exports = router