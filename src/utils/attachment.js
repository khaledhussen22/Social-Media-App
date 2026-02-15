import { graphql, GraphQLObjectType, GraphQLString } from "graphql";

export const attachmentType=new GraphQLObjectType({
    name:"attachemnt",
    fields:{
        secure_url:{type:GraphQLString},
        public_id:{type:GraphQLString},

    },
})