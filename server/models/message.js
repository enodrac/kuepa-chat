import mongoose from 'mongoose';

const messageSchema = mongoose.Schema({
    date: String,
    user: String,
    content: String,
});

var messageSchema = mongoose.model('messageSchema', messageSchema);

export default messageSchema;
