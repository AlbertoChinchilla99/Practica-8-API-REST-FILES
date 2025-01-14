const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    password: { type: String, required: true },
    rol: {
      type: String,
      required: true,
      enum: ['admin', 'user'],
      default: 'user'
    },

    juegos: [
      { type: mongoose.Types.ObjectId, ref: 'juegos', required: false } // Asegúrate de que este campo exista
    ]
  },
  {
    timestamps: true,
    collection: 'users'
  }
)
userSchema.pre('save', function () {
  this.password = bcrypt.hashSync(this.password, 10)
})
const User = mongoose.model('users', userSchema, 'users')
module.exports = User
