"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import useBasketStore from "../../../../store/store";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function SuccessPage() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");
  const clearBasket = useBasketStore((state) => state.clearBasket);
  // const sessionId =searchParams.get("sessionId");

  useEffect(() => {
    if (orderNumber) {
      clearBasket();
    }
  }, [orderNumber, clearBasket]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-12 rounded-xl shadow-lg w-full max-w-2xl mx-4">
            <h1 className="text-4xl font-bold mb-6 text-center">Success</h1>
        <div className="flex justify-center mb-8">
          <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
            <svg
              className="h-8 w-8 text-green-600"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="green"
              width="48px"
              height="48px"
            >
              <path d="M9 16.2l-4.2-4.2-1.4 1.4L9 19l11-11-1.4-1.4z" />
            </svg>
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-6 text-center">
         Thank you for your order
        </h1>
       <div className="border-t border-b border-gray-200 py-6 mb-5">
        <p className="text-gray-700 text-lg mb-4">
          Your order  has  been confirmed and will be shipped to you shortly.
        </p>
        <div className="space-y-2">
            {orderNumber && (
              <p className="text-gray-600 flex items-center space-x-5">
                <span>
                 Order Number:
                </span>
                <span className="font-mono text-sm text-green-600">{orderNumber}</span>
              </p>
            )}
            {/* {sessionId && 
            <p className="text-gray-600 flex items-center space-x-5">
                <span>
                 transaction Id:
                </span>
                <span className="font-mono text-sm text-green-600">{sessionId}</span>
            </p>} 
            */}
        </div>
       </div>
       <div className="space-y-4">
             <p className="text-gray-600">
                A confirmation email has been sent to your email address.
             </p>
             <div className=" flex flex-col sm:flex-row gap-4 justify-center"> 
             <Button asChild className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md">
                <Link href="/orders">View Order Details</Link>
             </Button>
             <Button asChild variant={"outline"} className="bg-white hover:bg-gray-100 py-2 px-4 rounded-md">
                <Link href="/">Continue Shopping</Link>
             </Button>
             </div>
       </div>
      </div>
    </div>
  );
}

export default SuccessPage;
