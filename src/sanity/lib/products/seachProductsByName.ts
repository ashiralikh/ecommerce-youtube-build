import { sanityFetch } from "../live";
import { defineQuery } from "next-sanity";


export  const searchProductsByName = async (serchParam:string) => {
    const PRODUCTS_SEARCH_QUERY = defineQuery(`
    *[
        _type == "product"
     && name match $searchParam
     ] | order(name asc)
    `)
    try{
        //use sanity fetch to send the query and passs the search parameter with a wildcard
        const products = await sanityFetch({
            query:PRODUCTS_SEARCH_QUERY,
             params:{
                searchParam:`*${serchParam}*`,// Append a wildcard to the search parameter
             },
            });
            
            // return the list of products, or an empty array if none are found
            return products.data || [];
        } catch (error) {
            console.error("Error searching products by name:", error);
            return [];
    }

}