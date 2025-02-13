import { sanityFetch } from "../live";
import { CoponCodes } from "./couponCodes"
import { defineQuery } from "next-sanity"

export const getActiveSaleByCouponCode = async (couponCode:CoponCodes) => {
    
    const ACTIVE_SALE_BY_COUPON_QUERY = defineQuery(`
    *[
        _type == "sale" 
    && isActive == true
    && couponCode == $couponCode
    ]  | order(_createdAt desc)[0]
    `);
    try {
        const activeSale = await sanityFetch({
            query: ACTIVE_SALE_BY_COUPON_QUERY,
            params: {
                couponCode,
            },// Pass the couponCode as a parameter
        });
        return activeSale ? activeSale.data : null;
    } catch (error) {
        console.error("Error fetching active sale:", error);
        return null;
    }
}






// _id,
// title,
// description,
// discountAmount,
// couponCode,
// validFrom,
// validUntil,
// isActive,