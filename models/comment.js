const {Schema,model}=require("mongoose")

const commentSchema= new Schema({
    content:{
        type :String
    },
    blogid:{
        type:Schema.Types.ObjectId,
        ref:"blog",
    },
    createdby:{
        type:Schema.Types.ObjectId,
        ref:"user",
    }
},{timestamps:true})
const comment=model("comment",commentSchema);
module.exports=comment;