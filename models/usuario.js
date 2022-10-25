
const { Schema, model } = require('mongoose');

// el required me permite mandar un arreglo en el que la primera poiscion va a ser si es requerido y el segundo un mensaje
// de error en caso de que no sea enviado
const UsuarioSchema = Schema({
    nombre: { 
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: { 
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: { 
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: { 
        type: String
    },
    rol: { 
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: { 
        type: Boolean,
        default: true
    },
    google: { 
        type: Boolean,
        default: false
    }
});

UsuarioSchema.methods.toJSON = function() {
    const { __v, password, ...usuario } = this.toObject();
    return usuario;
}

module.exports = model( 'Usuario', UsuarioSchema );