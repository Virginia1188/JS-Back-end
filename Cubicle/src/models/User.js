const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 3,
    },
    password: {
        type: String,
        // validate: {
        //     validator: function(value){
        //         return this.repeatPassword === value;
        //     },
        //     message: 'Passwords don\'t match',
        // },
        required: true,
        minLength:[ 6, 'Password is too short!'],
    }
});

userSchema.virtual('repeatPassword')
    .set(function(value){
        if(value !== this.password){
            throw new mongoose.MongooseError('Passwords don\'t match');
        }
    });

userSchema.pre('save', function(next){
    bcrypt.hash(this.password, 10)
    .then(hash =>{
        this.password = hash;

        next();
    });

});

userSchema.method('validatePassword', function (password){
    return bcrypt.compare(password,this.password);
});

const User = mongoose.model('User', userSchema);

module.exports = User;