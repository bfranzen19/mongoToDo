var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')

var app = express()

app.use(express.static('./public/'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

mongoose.connect('mongodb://localhost:27017/mongoToDo', {useMongoClient:true}, function(mongooseERR) {
  if(mongooseERR) {console.log(mongooseERR)}  // connection error message
  else {console.log('mongoose initialized, yo!')}
})
mongoose.Promise = global.Promise;

  var ItemSchema = new mongoose.Schema({
    itemText: {type:String, required:true},
    isDone: {type:Boolean, default:false},
  })

  var ItemModel = mongoose.model('item', ItemSchema)

// homepage route
  app.get('/', function(req,res) {
    res.sendFile('/public/html/index.html', {root:'./'})
  })

// postNewItem
app.post('/newItem', function(req,res) {
  console.log(req.body)
  // res.send(req.body.itemText)

  new ItemModel(req.body).save(function(err, addedItem) {
    if(err) {
      console.log('save error - ', err)
      res.send('error saving')
    } else {
      console.log('item added - ', addedItem)
      res.send(addedItem)
    }
  })
}) // end of post/newItem

app.get('/currentList', function(req,res) {
  ItemModel.find({}, function(err, toDoItems) {
    if(err) {
      res.send('something is wrong.')
      return console.log('current list error - ', err)
    }
    res.send(toDoItems)
  })
})

app.post('/removeItem', function(req,res) {
  ItemModel.findByIdAndRemove(req.body._id, function(err,rmItem) {
    if(err) {
      console.log(err)
      res.status(500).send(err)
    }
    console.log('deleted: ', rmItem)
    res.send(rmItem)
  })
})


app.post('/crossOut', function(req,res) {
  ItemModel.updateOne({_id:req.body.id}, {$set: {isDone: req.body.isChecked === 'false' ? true : false}}, {new: true}, function(error, info) {
    if(error) {
      console.log(error)
      res.send('error')
    }
    console.log('checked --- ', info)
    res.send(info)
  })
})






/* -=-=-=-=-=-=-=-=- running on port 8080  -=-=-=-=-=-=-=-=- */
app.listen(8080, function() {
  console.log('running on port 8080')
})
