import { graphql, GraphQLBoolean, GraphQLInt, GraphQLList, GraphQLObjectType } from "graphql";
import { PostType } from "./post.type.js";

export const getPostsResponse=new GraphQLObjectType({
    name:"getPostsRespnse",
    fields:{
        success:{type:GraphQLBoolean},
        statusCode:{type:GraphQLInt},
        data:{type:new GraphQLList(PostType)},
    }
});

export const getPostResponse=new GraphQLObjectType({
    name:"getSingleResponse",
    fields:{
        success:{type:GraphQLBoolean},
        statusCode:{type:GraphQLInt},
        data:{type:PostType},
    }
})
