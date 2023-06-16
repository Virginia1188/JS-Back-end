const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        // match: [/[A-Za-z]+@[A-Za-z]+.[A-Za-z]+/gi, 'Invalid email format!'],
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    bookedHotels: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Item'
        }
    ],
    offeredHotels: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Item'
        }
    ]


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