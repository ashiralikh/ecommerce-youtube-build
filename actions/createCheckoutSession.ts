"use server"

import stripe from "@/lib/stripe";
import { imageUrl } from "@/lib/imageUrl";
import { BasketItem } from "../store/store";
 
export type Metadata = {
    orderNumber: string;
    customerName: string;
    customerEmail: string;
    clerkUserId: string;
      
};
export type GroupedBasketItem = {
    product: BasketItem["product"];
    quantity: number;
}
     
    export async function createCheckoutSession(
        items: GroupedBasketItem[],
        metadata: Metadata
    )   {
        try {
            // filter out items that don't have a price
         const itemsWithoutPrice = items.filter((item) => !item.product.price);
         if (itemsWithoutPrice.length > 0) {
          throw new Error("some items do not have a price");
        }
        // search for exsiting customer by email
        const customers =  await stripe.customers.list({
           email: metadata.customerEmail,
           limit: 1,
       })

       let customerId: String | undefined;
       if (customers.data.length > 0) {
          customerId = customers.data[0].id
       }
       // vercel

     const baseUrl = process.env.NODE_ENV === "production" 
    ? `https://${process.env.VERCEL_URL}` 
    : `${process.env.NEXT_PUBLIC_BASE_URL}`;

const successUrl = `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`;

const cancel_url = `${baseUrl}/basket`;
    

    
         const session = await stripe.checkout.sessions.create({
        customer: customerId as string, //yah mana add kiy hai "as string"
           customer_creation: customerId ? undefined:"always",
           customer_email: !customerId ? metadata.customerEmail:undefined,
           metadata,
           mode:"payment",
           allow_promotion_codes:true,

           success_url:successUrl,
           cancel_url:cancel_url,
           
           line_items: items.map((item) => ({
            price_data: {
              currency:"gbp",
              unit_amount: Math.round(item.product.price!*100),
              product_data:{
                name: item.product.name || "Unnamed Product",
                description:`Product ID: ${item.product._id}`,
                metadata: {
                    id:item.product._id
                },
                images:item.product.image
                ?[imageUrl(item.product.image).url()]
                :undefined,
              },  
            },
            quantity: item.quantity,
          })),      
        })
return session.url;

    } catch (error) {
        console.error("Error creating checkout session",error);
        throw error;
    }
}




   