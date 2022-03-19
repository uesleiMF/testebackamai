const jwt = require("jsonwebtoken");

let verificarToken = (req, res, next) => {
  let token = req.get("Authorization");//headers

  jwt.verify(token, "secret", (err, decoded) => {
    if (err) {
      return res.status(401).json({
        ok: false,
        err:'Token no válido'
      });
    }

    req.usuariobd = decoded.usuariobd;

    next();
  });

};

let verificaRol = (req, res, next)=>{
  let usuario = req.usuariobd
  if(usuario.rol === 'ADMIN'){
    next()
  }else{
    return res.json({
      ok: false,
      mensaje:'El usuario debe ser administrador'
    });
  }
  
}

module.exports = {
  verificarToken,
  verificaRol
};
