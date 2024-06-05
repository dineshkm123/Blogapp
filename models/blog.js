const {Schema,model}=require("mongoose")
const  mongoose=require("mongoose")


const blogSchema=new Schema({
    title:{
        type:String,
        required:true,
    },
    body:{
        type:String,
        required:true
    },
        coverImage:{
            type:String
        },
        createdby:{
            type:Schema.Types.ObjectId,
            ref:'user'
        },
},{timestamps:true});



const Blog=mongoose.model('blog',blogSchema)
module.exports=Blog