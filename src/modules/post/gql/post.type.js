import { GraphQLBoolean, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { attachmentType } from "../../../utils/attachment.js";
import { User } from "../../../models/user.model.js";
import { UserType } from "../../user/gql/user.type.js";

export const PostType=new GraphQLObjectType({
    name:"post",
    fields:{
    content:{type:GraphQLString},
    attachment:{type:new GraphQLList(attachmentType)},
    publisher:{type:UserType,resolve:async(parent)=>{
        const user=await User.findById(parent.publisher);
        return user;
    }
},
    likes:{type:new GraphQLList(UserType),resolve:async(parent)=>{
    const users= await User.find({_id:{$in:parent.likes}})
    return users
    }},
    isDeleted:{type:GraphQLBoolean},
    },
}
)