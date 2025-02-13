import { sanityFetch } from "../live"
import { defineQuery } from "next-sanity"

export const getProductByCategory = async (categorySlug: string) => {
    const PRODUCT_BY_CATEGORY_QUERY = defineQuery(`
    *[
    _type == "product" 
    && references(*[_type == "category" && slug.current == $categorySlug]._id) 
    ] | order(name asc) 
    `);

    try {
        //use sanity fetch to send the query and passs the search parameter with a wildcard
        const products = await sanityFetch({
            query: PRODUCT_BY_CATEGORY_QUERY,
            params: {
                categorySlug,
            },  
    });

        // return the list of products, or an empty array if none are found 
        return products.data || []
    } catch (error) {
        console.error("Error fetching products by category:", error);
        return []
    }
}