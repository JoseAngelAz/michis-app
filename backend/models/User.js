const {Schema,model} = require('mongoose');
const bcrypt= require('bcryptjs');
const UserSchema = new Schema({
    name:{type:String, required: true},
    last_name:{type:String, required: true},
    email:{type:String, required: true},
    password:{type:String, required: true},
    dui:{type:String, required:true}
},{
    timestamps:true
});
//metodo para encriptar el password
UserSchema.methods.encryptPassword = async password =>{
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password,salt);
};

//comparar la pass cifrada, usamos function para que tenga alcance a this.password
UserSchema.methods.matchPassword = function(password){
   return bcrypt.compare(password, this.password);
}


module.exports = model('Users',UserSchema);