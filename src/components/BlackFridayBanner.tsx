import { getActiveSaleByCouponCode } from "../sanity/lib/sales/getActiveSaleByCouponCode";
import { COPON_CODES } from "@/sanity/lib/sales/couponCodes";


async function BlackFridayBanner() {
    const sale = await getActiveSaleByCouponCode(COPON_CODES.BFRIDAY);
    if (!sale?.isActive) {
        return null;
    }

    return (
        <div className="bg-gradient-to-r from-red-600 to-black text-white px-6 py-10 mx-4 mt-2 rounded-lg shadow-lg">
        <div className="container mx-auto flex items-center justify-between">
            <div className="flex">
            <h2 className="text-2xl sm:text-5xl font-extrabold text-left md-4">
                {sale.title}
            </h2>
            <p className="text-xl sm:text-3xl font-semibold text-left md-6">{sale.description}</p>
            
            <div className="flex">
              <div className="bg-white text-black py-4 px-6 rounded-full shadow-md transform hover:scale-105
              transition duration-300"> 
                  <span>Use code:{""}
                      <span className="font-bold">{sale.couponCode}</span>
                  </span>
                  <span className="ml-2 font-bold text-base sm:text-xl">
                    for {sale.discountAmount}% OFF 
                  </span>
              </div>
            </div>
            </div>
        </div>
        </div>
    );
}

export default BlackFridayBanner;
{/* <h1 className="text-2xl font-bold">Black Friday Sale</h1>
<p className="mt-2">Get 50% off on all products</p>
<p className="mt-2">couponCodes: {sale?.CoponCodes}</p> */}