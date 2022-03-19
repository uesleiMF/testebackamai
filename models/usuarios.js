const mongoose = require('mongoose')

let Schema = mongoose.Schema

let roles = {
    values:['ADMIN', 'USER'],
    message: '{VALUE} no es un rol válido'
}
let usuarioSchema = new Schema({
    nombre:{
        type:String,
        required: [true,'El nombre es necesario']
    },
    correo:{
        type:String,
        required: [true,'El correo es necesario'],
        unique:true
    },
    clave:{
        type:String,
        required:[true,'La clave es necesaria']
    },
    rol:{
        type:String,
        required:true,
        enum:roles
    },
    salt:{
        type:String
    }
})

usuarioSchema.methods.toJSON = function(){
    let user = this;
    let userObject = user.toObject();
    delete userObject.clave;

    return userObject
}

module.exports = mongoose.model('Usuarios',usuarioSchema)