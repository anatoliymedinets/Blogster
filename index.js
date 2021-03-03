const mongoose = require('mongoose')
const keys = require('./config/keys')
const app = require('./app')

const port = process.env.port || 5000

async function start(){
    try{
        await mongoose.connect(keys.mongoURI, {
            useCreateIndex: true,
            useFindAndModify: false,
            useNewUrlParser: true,
            useUnifiedTopology: true
          })
        app.listen(port, ()=>{
            console.log(`Server run on port ${port}`);
        })
    }catch(ex){
        console.log(ex)
    }
}

start()