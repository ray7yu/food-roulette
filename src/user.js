const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const UserSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

UserSchema.pre('save', function(next) {
    //check if doc is new or password is set
    if (this.isNew || this.isModified('password')) {
        //save ref to 'this' because of changing scopes
        const document = this;
        bcrypt.hash(this.password, saltRounds,
            function(err, hashedPassword) {
                if(err){
                    next(err);
                } else {
                    document.password = hashedPassword;
                    next();
                }
            }
        );
    } else {
        next();
    }
})
UserSchema.methods.isCorrectPassword = function(password, callback){
    bcrypt.compare(password, this.password, function(err, same) {
        if (err) {
            callback(err);
        } else {
            callback(err, same);
        }
    })
}
module.exports = mongoose.model('User', UserSchema);