"use client"
import AddToBasketButton from '@/components/AddToBasketButton';
import Loader from '@/components/Loader';
import { imageUrl } from '@/lib/imageUrl';
import useBasketStore from '../../../../store/store'
import { SignInButton, useAuth, useUser } from '@clerk/nextjs';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createCheckoutSession, Metadata } from '../../../../actions/createCheckoutSession';

function Basketpage() {
  const groupItems = useBasketStore((state) => state.getGroupedItems());
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect to set isClient to true after component mounts
  useEffect(() => {
    setIsClient(true);
  }, []); // Add an empty dependency array

  if (!isClient) {
    return <Loader />;
  }

  if (groupItems.length === 0) {
    return (
      <div className="container mx-auto flex flex-col items-center justify-center min-h-[50vh] bg-gray-100 p-4">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Your basket</h1>
        <p className="text-gray-600 text-lg">Your basket is empty.</p>
      </div>
    );
  }

  const handleCheckout = async () => {
    if (!isSignedIn) return;
    setIsLoading(true);

    try {
      const metadata: Metadata = {
        orderNumber: crypto.randomUUID(),
        customerName: user?.fullName ?? 'unknown',
        customerEmail: user?.emailAddresses[0].emailAddress ?? 'unknown',
        clerkUserId: user!.id,
      };

      const checkoutUrl = await createCheckoutSession(groupItems, metadata);

      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } catch (error) {
      console.log("Error creating checkout session", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='container mx-auto p-4 max-w-6xl'>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Your basket</h1>
      <div className="flex flex-col sm:flex-row md:flex-row gap-8">
        <div className='flex-grow'>
          {groupItems?.map((item) => (
            <div key={item.product._id} className="mb-4 p-4 border justify-between items-center border-gray-200 rounded-lg shadow-md">
              <div className="flex items-center cursor-pointer flex-1 min-w-0" onClick={() => router.push(`/product/${item.product.slug?.current}`)}>
                <div className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 mr-4">
                  {item.product.image && (
                    <Image
                      src={imageUrl(item.product.image).url()}
                      alt={item.product.name ?? "Product image"}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </div>
              <div className="min-w-0">
                <h2 className="text-lg sm:text-xl font-semibold truncate">
                  {item.product.name}
                </h2>
                <p className="text-sm sm:text-base">
                  Price: £{((item.product.price ?? 0) * item.quantity).toFixed(2)}
                </p>
              </div>
              <div className="flex items-center ml-4 flex-shrink-0">
                <AddToBasketButton product={item.product} disabled={!isSignedIn} />
              </div>
            </div>
          ))}
        </div>
        <div className="w-full lg:w-80 lg:sticky lg:top-4 h-fit bg-white p-6 border border-gray-200 rounded order-first lg:order-last fixed bottom-0 left-0 lg:left-auto">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
          <div className='mt-4 space-y-2'>
            <p className="flex justify-between text-sm">
              <span>Items:</span>
              <span>{groupItems.reduce((total, item) => total + item.quantity, 0)}</span>
            </p>
            <p className="flex justify-between border-t">
              <span className='font-bold justify-between flex text-2xl pt-2'>Total:</span>
              <span className='font-bold justify-between flex text-2xl pt-2'>£{groupItems.reduce((total, item) => total + (item.product.price ?? 0) * item.quantity, 0).toFixed(2)}</span>
            </p>
            <p className="flex justify-between border-t">
              <span className='font-bold justify-between flex text-2xl pt-2'>Subtotal:</span>
              <span className='font-bold justify-between flex text-2xl pt-2'>£{groupItems.reduce((total, item) => total + (item.product.price ?? 0) * item.quantity, 0).toFixed(2)}</span>
            </p>
          </div>
          {isSignedIn ? (
            <button
              onClick={handleCheckout}
              disabled={isLoading}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4">
              {isLoading ? "Processing..." : "Checkout"}
            </button>
          ) : (
            <SignInButton mode="modal">
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4">
                Sign in to checkout
              </button>
            </SignInButton>
          )}
        </div>
        <div className='h-64 lg:h-0'>
          {/*  */}
        </div>
      </div>
    </div>
  );
}

export default Basketpage;