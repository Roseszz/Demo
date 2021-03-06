const express = require('express')
const async = require('hbs/lib/async')
const { ObjectId } = require('mongodb')
const { insertObject, getAllFromCollection, getDocumentById, updateCollection, deleteDocumentById,} = require('./databaseHandler')
const app = express()


app.set('view engine','hbs')
app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.render('index')
})

app.post('/insert',async (req,res)=>{
    const name = req.body.txtName
    const price = req.body.txtPrice
    const picURL = req.body.txtPictureURL
    
    const newP = {
        'name' : name,
        'price': price,
        'pic' : picURL
    }
    if ((newP.price >100)||(newP.price <0)){
        const errorPrice = "Price below 0 or over 100"
        res.render('index',{"priceError": errorPrice})
        return
    }
    const collectionName = 'SanPham'
    await insertObject(collectionName,newP)
    res.render('index')
})

app.get('/all', async (req,res)=>{
    const collectionName = 'SanPham'
    const result = await getAllFromCollection(collectionName)
    res.render('all',{products:result})
})

app.get('/edit',async (req,res)=>{
    const id = req.query.id
    const collectionName = 'SanPham'
    const document = await getDocumentById(collectionName,id)
    res.render('edit',{product:document})
})

app.post('/edit', async (req,res)=>{
    const updateId = req.body.txtId
    const name = req.body.txtName
    const price = req.body.txtPrice
    const picURL = req.body.txtPictureURL

    const newvalues = { $set: {'name': name, 'price': price,'pic':picURL } }
    const myQuery = {_id: ObjectId(updateId)}
    const collectionName = 'SanPham'
    await updateCollection(collectionName,myQuery,newvalues)
    res.redirect('/all')
})

app.get('/delete',async (req,res) =>{
    const id = req.query.id
    const collectionName = 'SanPham'
    await deleteDocumentById(collectionName,id)
    res.redirect('/all')
})

const PORT = process.env.PORT || 5000
app.listen(PORT)
console.log('Server is running!')


