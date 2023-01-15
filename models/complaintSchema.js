const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    user_id: String,
    timestamp: { type: Date, default: Date.now },
    message_body: String,
    response:{type:String,default:""},
    answered: { type: Boolean, default: false }
  });
  
const Message = mongoose.model('newcomplaint', messageSchema);
module.exports = Message;
  