const express = require('express');
const mongoose = require('mongoose');
    const userModel = require('./model/login');


 
 const app = express()
 const port = 3000;
 
if (process.env.NODE_ENV !== 'test') {
  async function createDefaultAdmin() {
  try {
    const admin = await userModel.findOne({ username: 'admin' });
    if (!admin) {
      await userModel.create({
        userId: 0,
        username: 'admin',
        password: 'admin123',
        role: 'admin'
      });
      console.log('✅ Default admin created');
    } else {
      console.log('✔️ Admin already exists');
    }
  } catch (err) {
    console.error('❌ Failed to create admin:', err.message);
  }
}
 
 
 
 
 mongoose.connect('mongodb+srv://Mohana:%40Mohana2004@cluster0.wemrs4h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
 .then(()=>{
    console.log("MongoDB conncted successfully");
   
 })
 .catch( ()=>{
    console.log( 'connection error');
   
 })
createDefaultAdmin();
 
 app.listen(300, ()=>{
    console.log(`server is running on http://localhost:${port}` );
   
 })
}