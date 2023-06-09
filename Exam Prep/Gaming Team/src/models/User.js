const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        minLength: [5, 'Username is too short!']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        minLength: [10, 'Email is too short!']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [4, 'Password is too short!']
    },


});

userSchema.virtual('repeatPassword')
    .set(function (value) {
        if (value !== this.password) {
            throw new Error('Passwords don\'t match');
        }
    });

userSchema.pre('save', async function(){
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
});

userSchema.method('validatePassword', function(password){
    return bcrypt.compare(password,this.password);
});


const User = mongoose.model('User', userSchema);

module.exports = User;