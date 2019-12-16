var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var http = require('http').Server(app)
var io = require('socket.io')(http)
var mongoose = require('mongoose')
mongoose.set('useFindAndModify', false);

var dbUrl = 'mongodb+srv://Muktha:user@cluster0-iqffj.mongodb.net/test?retryWrites=true&w=majority'

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

var Product = mongoose.model('product', {
    id: Number,
    product: {
        productid: Number,
        category: String,
        price: Number,
        name: String,
        instock: Boolean
    }
})

app.get('/product/get', (req, res) => {
    Product.find({}, (err, products) => {
        res.send(products)
    })
})

app.post('/product/create', (req, res) => {
    var product = new Product(req.body)
    product.save((err) => {
        if (err) {
            res.sendStatus(500)
        } else {
            io.emit('product', req.body)
            res.sendStatus(200)
        }
    })
})

app.delete('/product/delete/:id', function (req, res) {
    Product.deleteOne({ id: req.params.id }, function(err) {
        res.sendStatus(204)
  })
})

app.put('/product/update/:id', function (req, res) {
    Product.findOneAndUpdate({ id: req.params.id }, req.body, function(err) {
        if(err){
            return res.status(500).send(err);
        }
        res.sendstatus(200)
  })
})



io.on('connection', (socket) => {
    console.log('a user is connected')
})

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    console.log('mongodb connection', err)
})

var server = http.listen(3001, () => {
    console.log('server is listening on port', server.address().port)
})