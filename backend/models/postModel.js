import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    postedBy:{
        // it generates id that connects with user it indicates user
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    text:{
        type:String,
        maxLength:500
    },
    img:{
        type:String,
    },
    likes:{
        // array of user id's
        type:[mongoose.Schema.Types.ObjectId],
        ref:'User',
        default:[],
    },

    // created object to gainmore access
    replies:[
        {
        userId:{

            type:mongoose.SchemaTypes.ObjectId,
           ref:'User',
           required:true
        },
            
        text:{
            type:String,
            required:true,
        },
        userProfilePic:{
            type:String,
        },
        username:{
            type:String,
        }

        }
    ]
},{
    timestamps:true
}
)


const Post = mongoose.model("Post",postSchema)

export default Post;