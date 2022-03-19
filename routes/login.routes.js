const express = require("express");
const app = express();
const Usuarios = require("../models/usuarios");
const bcrypt = require("bcryptjs");
//const crypto = require('crypto')
const jwt = require('jsonwebtoken');

app.post('/', (req,res)=>{
    let {correo,clave} = req.body

    Usuarios.findOne({correo},(err,usuario)=>{

        if(!usuario){
            return res.status(400).send({
                ok:false,
                err:{
                    message:'Usuario y/o clave no válida' //user
                }
            })
        }

        //con bcrypt y sin salt
        if(!bcrypt.compareSync(clave,usuario.clave)){
            return res.status(400).send({
                ok:false,
                err:{
                    message:'Clave no válida'
                }
            })
        }
        /*crypto.pbkdf2(clave,usuario.salt, 1000, 64, 'sha1',(err,key)=>{
            const encryptedPassword = key.toString('base64')
            if(usuario.clave !== encryptedPassword){
                return res.status(400).send({
                    ok:false,
                    err:{
                        message:'Usuario y/o clave no válida' //pass
                    }
                })
            } 
        })*/



        let token = jwt.sign({
            usuariobd:usuario
        },'secret',{expiresIn:'24h'})

        res.json({
            ok:true,
            usuariobd:usuario,
            token
        })



    })
})


module.exports = app