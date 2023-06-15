const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({

    email: {
        type: String,
        required: [true, 'Email is required!']
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        minLength: [5, 'Password is too short!'],
    },
    firstName: {
        type: String,
        required: [true, 'First name is required!'],
        minLength: [1, 'First name is too short!'],
        match: [/[A-Za-z]+@[A-Za-z]+.[A-Za-z]+/g, 'Invalid email format!'],
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required!'],
        minLength: [1, 'Last name is too short!'],
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