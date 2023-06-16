const mongoose = require('mongoose');

function getFirstError(error){
    const errors = Object.keys(error.errors).map(x => error.errors[x].message);
    return errors[0];
}

exports.getErrorMessage = (error) =>{
       
    if(error instanceof mongoose.MongooseError ){
        return getFirstError(error);
    }else if(error instanceof mongoose.Error.ValidationError){
        return getFirstError(error);
    }else{
        return error.message;;
    }
};