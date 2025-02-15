// import { defineQuery } from "next-sanity";
// import { sanityFetch } from "../live";


// export const getAllProducts = async () => {
//     const ALL_PRODUCTS_QUERY = defineQuery(`
//     *[_type == "product" ] 
//     | order(name asc )
//         `)

//         try{
//             //use sanity fetch to send the query
//             const products = await sanityFetch(
//                 { query: ALL_PRODUCTS_QUERY,
//                 });
//                 //return the list of products, or an empty array if none are found
//                 return products.data || [];
//         } catch (error) {
            
//             console.error("Error fetching all products:", error);
//             return [];
//         }
        
// }; 

import { sanityFetch } from "../live";

// Define the query for fetching all products
const ALL_PRODUCTS_QUERY = `
  *[_type == "product"] | order(name asc)
`;

export const getAllProducts = async () => {
  try {
    // Use sanityFetch to send the query
    const products = await sanityFetch({
      query: ALL_PRODUCTS_QUERY,
    });

    // Return the list of products, or an empty array if none are found
    return products.data || [];
  } catch (error) {
    console.error("Error fetching all products:", error);
    return [];
  }
};