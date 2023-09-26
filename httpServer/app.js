const uuid = require('uuid');
const express = require('express')
const app = express()
app.use(express.json())  
   
const dotenv = require('dotenv').config();
const mongoose = require("mongoose");
const port = 3000
let books = [
  {
    key: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name: 'First Item',
    class:1
  },
  {
    key: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    name: 'Second Item',
    class:2
  },
  {
      key: '3ac68afc-c605-48d3-a4f8-fbd91aa97f62',
      name: 'Third Item',
      class:3
    },
    {
      key: '3ac68afc-c605-48d3-a4f8-fbd91aa97f65',
      name: 'Fourth Item',
      class:4
    }
];

const contactSchema = {
  email: String,
  query: String,
}; 
const Contact = mongoose.model("FistApp", contactSchema);

app.get('/', async (req, res) =>  {
    
      try {
 
      const uri = "mongodb://adminUser:adminUser@127.0.0.1:27017/?authMechanism=DEFAULT";
  
      mongoose.connect(uri, {}).then(()=>console.log('connected')).catch(e=>console.log(e));

      const person = await Contact.findOne({ 'email': 'emails1' }, 'email query');
           
      const tt=10
    
    } catch (e) {
        console.error(e);
    } 

    res.json(books)
    console.log(JSON.stringify(books))

})
app.post('/create', async function(req, res) {
  console.log('start to create')
  console.log(req)
  const newBook = {   
    key:uuid.v4(),
    name: req.body.name,
    class: req.body.email,
  };

  try {
 
    const uri = "mongodb://adminUser:adminUser@127.0.0.1:27017/?authMechanism=DEFAULT";

    mongoose.connect(uri, {}).then(()=>console.log('connected')).catch(e=>console.log(e));
   
    const contact = new Contact({
      email: req.body.name,
      query: req.body.email,
    });
  
     
   const output = await  contact.save();
   const tt=10
  
  } catch (e) {
      console.error(e);
  } 


  books.push(newBook);
  console.log(books);
  res.json(books)
});

app.listen(port, () => {
console.log(`App is running http://localhost:${port}`)
})