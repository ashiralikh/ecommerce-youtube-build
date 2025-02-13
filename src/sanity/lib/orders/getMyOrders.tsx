import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export async function getMyOrders(userId: string) {
    if (!userId) {
        throw new Error("No user ID provided"); 
    }


    // Define the query
      const MY_ORDERS_QUERY = defineQuery(`
    *[_type == "order" && clerkUserId == $userId] | order(orderDate desc){
    ...,
    products[]{
        ...,
        product->
       }
    }
    `);

   try {
        // Fetch the orders for the user
        const orders = await sanityFetch({
            query: MY_ORDERS_QUERY,
            params: {
                userId,
            },
        });

        // Return the orders
        return orders.data || [];
    
    } catch (error) {
        console.error("Error fetching orders:", error);
        throw new Error("Error fetching orders");
    }

    }  