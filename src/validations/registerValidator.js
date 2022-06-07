const {check,body} = require ('express-validator');
const users = require('../data/usersDataBase.json');
const path =require('path')

module.exports =[

    check("name")
        .isLength({min : 2})
        .withMessage("Minimo 2 caracteres")
        .bail()
        .isAlpha()
        .withMessage("Sólo letras permitidas"),
    
    check("surname")
        .isLength({min : 2 })
        .withMessage("Mínimo 2 caracteres")
        .bail()
        .isAlpha()
        .withMessage("Sólo letras permitidas"),
    
    check("email")
        .notEmpty()
        .withMessage("ingresá tu email")
        .bail()
        .isEmail()
        .withMessage("Email no válido").bail()
       .custom((value)=>{
            
            const user = users.find(user=>user.email === value);
            
            if(user){ // si existe un usuario  registrado con ese mail 
           
                return false // no lo dejo registrarse
        
            }else{ // si no tengo un usuario con ese mail
            
            return true // lo dejo registrarse

            }

        })
        .withMessage("El email ya se encuentra registrado"),
        
       
    check("password")
        .isLength({min: 6 ,max: 12})
        .withMessage("Debe tener un mínimo de 6  y 12 caracteres."),
    
   check("password2")// validacion de igualdad de contraseñas, campos que estan dentro del formulario (body)
        .custom((value,{req})=>{ // la validacion custom la usamos cuando ninguna de las validaciones personalizadas se ajusta a lo que queremos validar.
            if(value !== req.body.password){// si el valor de password es diferente al valor de password 2 = false

             return false
            }
        return true
        })
        .withMessage("Las contraseñas no coinciden"),
    
        check('avatar').custom((value, {req}) => {
            let file = req.file;
            let extensionsAccepted = ['.jpg' , '.png' , '.gif' ]
    
            if (!file) {
                throw new Error ('Tienes que subir una Imagen');
    
            } else {
    
                let fileExtension = path.extname(file.originalname);
            if (!extensionsAccepted.includes(fileExtension)) {
                throw new Error (`Las extensiones de archivos permitidas son ${extensionsAccepted.join(', ')}`);
            }
        }
    
            return true;
        }),

    check("terms")
    .isString("on")
    .withMessage("Debes aceptar los términos y condiciones")
 

]