"use client"

import { ClerkLoaded, SignInButton, UserButton, useUser, SignedIn } from "@clerk/nextjs"
import Link from "next/link";
import Form from "next/form";  
import { PackageIcon, TrolleyIcon } from "@sanity/icons";
import useBasketStore from "../../store/store";

function Header() {
  const { user } = useUser();
  const itemCount = useBasketStore((state) => 
    state.items.reduce((total, item) => total + item.quantity, 0));

  const CreateClerkPasskey = async () => {
    try {
      const response = await user?.createPasskey();
      console.log(response);  
    } catch (err) {
      console.error("Error", JSON.stringify(err, null, 2));
    }
  };

  return (
    <header className="flex flex-wrap items-center justify-between px-4 py-2">
      {/* top row */}
      <div className="flex w-full flex-wrap items-center justify-between">
        {/* logo Icon */}
        <Link href="/" className="text-2xl font-bold text-blue-500 hover:opacity-50 cursor-pointer mx-auto sm:mx-0">
          Shopr
        </Link>

        <Form action="/search" className="w-full sm:w-auto sm:flex-1 sm:mx-4 mt-2 sm:mt-0">
          <input
            type="text"
            name="query"
            placeholder="Search products..."
            className="bg-gray-100 text-gray-800 border border-gray-300 rounded py-2 px-4 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:border-transparent max-w-4xl"
          />
        </Form>

        <div className="flex items-center space-x-4 mt-4 sm:mt-0 flex-1 sm:flex-none">
          <Link
            href="/basket"
            className="flex flex-1 relative justify-center items-center space-x-2 font-bold px-4 py-2 rounded text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none sm:justify-start sm:flex-none"
          >
            <TrolleyIcon className="w-6 h-6" />
            <span className="absolute top-0 right-0 bg-red-500
             text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
              {itemCount}
            </span>
            <span >MY Basket</span>
          </Link>

          {/* user area */}
          <ClerkLoaded>
            <SignedIn>
              <Link
                href="/orders"
                className="flex flex-1 relative justify-center items-center space-x-2 font-bold px-4 py-2 rounded text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none sm:justify-start sm:flex-none"
              >
                <PackageIcon className="w-6 h-6" />
                <span>My Orders</span>
              </Link>
            </SignedIn>

            {user ? (
              <div className="flex items-center space-x-2">
                <UserButton />
                <div className="hidden sm:block text-xs">
                  <p className="text-gray-400">Welcome Back</p>
                  <p className="font-bold">{user.fullName}</p>
                </div>
              </div>
            ) : (
              <div className="bg-white hover:bg-blue-700 hover:text-white animate-pulse text-blue-500 font-bold py-2 px-4 rounded border border-blue-300">
                <SignInButton mode="modal" />
              </div>
            )}

            {user?.passkeys.length === 0 && (
              <button
                onClick={CreateClerkPasskey}
                className="bg-white hover:bg-blue-700 hover:text-white animate-pulse text-blue-500 font-bold py-2 px-4 rounded border border-blue-300"
              >
                Create passkey
              </button>
            )}
          </ClerkLoaded>
        </div>
      </div>
    </header>
  );
}

export default Header;