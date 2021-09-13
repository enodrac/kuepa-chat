import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    fullName: String,
    user: String,
    password: String,
    type: String,
});

var userSchema = mongoose.model('userSchema', userSchema);

export default userSchema;
