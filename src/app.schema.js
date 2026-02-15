import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { PostQuery } from "./modules/post/gql/post.query.js";


const query=new GraphQLObjectType({
    name:"RootQuery",
    fields:{
        /**
         * get post
         * get posts
         * get user
         * get users
         * get comment
         * get comments
         */
        ...PostQuery
        
    },
})
export const schema=new GraphQLSchema({
    query,
    // mutation,

})