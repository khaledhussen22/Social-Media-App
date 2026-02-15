
import { getPost, getPosts } from "./post.service.gql.js";
import { getPostResponse, getPostsResponse } from "./post.response.js";
import { GraphQLID, GraphQLInt } from "graphql";

export const PostQuery={
    getPosts:{
        type:getPostsResponse,
        resolve:getPosts,
 },
 getPost:{
    type:getPostResponse,
    args:{id: {type:GraphQLID}}, 
    resolve:getPost,
},
 
}