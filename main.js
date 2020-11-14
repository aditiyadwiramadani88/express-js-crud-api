const express = require('express')
const app = express()
const models = require('./models')
const product = models.product
const bodyParser = require('body-parser');
const user = models.user
const jwt = require('jsonwebtoken')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// Reister
app.post('/register', (req, res) => {
    const data1 = req.body
    const form_data = {username: data1["username"], password: data1["password"]}
    user.create(form_data)
    .then(data => {
         console.log(data);
         res.send('sucesss')
    }).catch(err => {
        console.log(err);
        res.send('error')
    })    
})


//  Create token

app.post('/token', (req, res) => { 
    const data1 = req.body
    user.findAll({
        where: {
            username: data1["username"]
        }
    }).then(data => {
        if(! data[0]){ 
            res.jsonp({msg: 'User not fout'})
        }
        const user = data[0].dataValues
        if(data1["password"] == user.password){ 
            const token = jwt.sign({ token: user.username }, 'node')
            res.jsonp({ token: token })
        }
            res.status(404)
            res.jsonp({msg: 'wrong password'})
    })
})

// Verifiy Token

app.use((req, res, next) => {
    const token = req.header('token')
  if (!token) {
      return res.jsonp({msg: "not token "})
  }
    const jwt_decode = jwt.verify(token, 'node', (err, decode) => {
        console.log(err);
        if(err){ 
            res.status(404)
            res.jsonp({msg: "Token Errror"})
        }
        user.findAll({ 
            where: { 
                username: decode.token
            }
        }).then(d => { 
            if(! d[0]){ 
                res.jsonp({msg: 'erorr Token'})
            }
            next()
        })
    })
 
})

// Read Data
app.get('/', (req, res) => {
    product.findAll({
        attributes: ['id', 'price', 'name_product']
    }).then(data => {
        const data1 = []
        data.forEach(elem => {
            data1.push(elem.dataValues)
        })
         res.jsonp(data1)
    }).catch(data =>{ 
        res.status(402)
        res.json({msg: 'Erorr'})
    })
})

//  Create Data
app.post('/', (req, res) => {
    console.log(req.body);
    const data = {name_product: req.body["name_product"], price: req.body["price"]}
    console.log(data);
    product.create(data).catch(err => { 
        res.jsonp({msg: 'error Create data '})
    }).then(row => { 
        res.jsonp(data) 
    })
  
})

//  details
app.get('/:id([0-9+])', (req, res) => {
   const id = req.params.id
   product.findAll({
       where:{
           id: id
       }, 
       attributes: ['id', 'price', 'name_product']
   }).then(data => {
       res.jsonp(data[0].dataValues)
   }).catch(data => {
       res.status(404)
       res.jsonp({msg: "error"})
   })
})

// edit 
app.put('/:id([0-9+])', (req, res) => {
    const id = req.params.id
    const data1 = { name_product: req.body["name_product"], price: req.body["price"] }
    product.update(data1, {
            where:{
                id: id
            }
        }).then(data => {
           if(data == [0]){ 
                  res.jsonp({msg: "error"})
           }
                res.send(data1)  
        }).catch(data => { 
            res.status(402)
            res.jsonp({msg: 'error'})
        })
})

// delete

app.delete('/:id([0-9+])', (req, res) => {
    const id = req.params.id
    product.destroy({
        where: {
            id: id
        }
    }).then(data => {
        if(!data){
            res.status(402)
           res.jsonp({"msg": "error "})
        }
            res.status(202)
            res.jsonp({msg: "success Delete data"})
        
    }).catch(data => {
        res.status(402)
        res.jsonp({msg: "error "});
    })
})


app.listen(3000) 