const {Schema, model} = require('mongoose');
const CatSchema = new Schema({

    cat_name:{type:String, required: true},
    cat_race:{type:String, required: true},
    cat_yrs:{type:Number, required: true},
    cat_mth:{type:Number, required: true},
    cat_sick:{type:String, required: true},
    cat_treament:{type:String, required: true},
    cat_color:{type:String, required: true},
    cat_length:{type:String, required: true},
    cat_vacune:{type:String, required: true},
    create_at:{type:Date, default: Date.now}
});

module.exports = model('Cats',CatSchema);