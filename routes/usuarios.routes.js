const express = require("express");
const app = express();
const Usuarios = require("../models/usuarios");
const bcrypt = require("bcryptjs");
const crypto = require('crypto')
const { verificarToken , verificaRol } = require("../middlewares/autenticacion");

app.get("/", [verificarToken,verificaRol], async (req, res) => {
    await Usuarios.find((err, usuarios) => {
        res.json({
            usuarios
        });
    });
});

app.post("/", async (req, res) => {
    let {nombre, correo, rol,clave} = req.body;
    
    /*crypto.randomBytes(16, (err,salt)=>{
        const newSalt = salt.toString('base64')
        crypto.pbkdf2(clave,newSalt,1000,64,'sha1',(err,key)=>{
            const encryptedPassword = key.toString('base64')
            Usuarios.findOne({correo}).then(user=>{
                if(user){
                    return res.send('Usuario ya existe')
                }
                Usuarios.create({
                    nombre,
                    correo,
                    rol,
                    clave: encryptedPassword,
                    salt: newSalt
                }).then((usuario)=>{
                    res.send({mensaje:'usuario creado', usuario})
                }).catch(err=>{
                   
                    return res.status(500).json({
                        err
                    });
                    
                })
            })
        })
    })*/

    //con bcrypt y sin salt
    let nuevousuario = new Usuarios({
        nombre,
        correo,
        rol,
        clave: bcrypt.hashSync(clave, 10)
    });

    await nuevousuario.save((err, usuario) => {
        if (err) {
            return res.status(500).json({
                err
            });
        }
        
        res.json({
            usuario
        });
    });
});

module.exports = app;
