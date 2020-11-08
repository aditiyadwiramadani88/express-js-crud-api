const express = require('express')
const app = express()
const port = 3000
const models = require('./models')
const product = models.product
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());


app.get('/', (req, res) => {
    product.findAll({
        attributes: ['id', 'price', 'name_product']
    }).then(data => {
        const data1 = []
        data.forEach(elem => {
            data1.push(elem.dataValues)
        })
         res.jsonp(data1)
    })
})
app.post('/', (req, res) => {
    console.log(req.body);
    const data = {name_product: req.body["name_product"], price: req.body["price"]}
    console.log(data);
    product.create(data)
    res.jsonp(data)
})


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
       res.jsonp({msg: "error"})
   })
})


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
           }else{ 
                res.send(data1)  
           }
        }).catch(data => { 
            res.jsonp({msg: 'error'})
        })
})

app.delete('/:id([0-9+])', (req, res) => {
    const id = req.params.id
    
    product.destroy({
        where: {
            id: id
        }
    }).then(data => {
        if(!data){
           res.jsonp({"msg": "error "})
        }else{
            res.jsonp({msg: "success Delete data"})
        }
    }).catch(data => {
        console.log(data);
        res.jsonp({msg: "error "});
    })
})


app.listen(port ,() => {
    console.log('runnig in localhost:3000');
})