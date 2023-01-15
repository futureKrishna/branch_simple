const express = require('express');
const app = express();
const Message=require('./models/complaintSchema.js')
app.use(express.json());
const db=require('./models/dbconnect')
const bodyparser=require('body-parser');
app.use(express.urlencoded({ extended: true }));
app.use(bodyparser.urlencoded({extended:true}));

app.post('/newcomplaints', async (req, res) => {
  const { customer, message } = req.body;
  const newMessage = new Message({ customer, message });
  await newMessage.save();
  res.send('Message received');
});

app.get('/answered', async (req, res) => {
    const messages = await Message.find({ answered: true });
    res.json(messages);
});

app.get('/unanswered', async (req, res) => {
    const messages = await Message.find({ answered: false });
    res.json(messages);
});  

app.patch('/newcomplaints/:id/:response', async (req, res) => {
    const { id } = req.params;
    const { response } = req.params;
    await Message.updateOne({ _id: id }, { $set: {answered: true } });
    await Message.updateOne({ _id: id }, { $set: {response: response } });
    res.send('Complaint answered');
});

app.listen(8081,(err)=>{if(!err) console.log("Listeneing on 8081 port")});