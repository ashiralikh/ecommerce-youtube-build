"use client"
import { useEffect, useState } from "react";
import { Product } from "../../sanity.types"
import useBasketStore from "../../store/store";
 
interface AddToBasketButtonProps{
product: Product;
disabled:boolean
}

 function AddToBasketButton  ({product,disabled} : AddToBasketButtonProps)  {
    const {addItem,removeItem,getItemCount} =useBasketStore()
    const itemCount = getItemCount(product._id);
    const[isClient,setIsClient] = useState(false);
    //useEffect to  set isClient to true after componet mounts
    //this ensures that the componet only renders on the client-side,
    // preventing hydration erorrs due to server/client mismatch

    useEffect(() =>{
        setIsClient(true)
    },[]);
    if(!isClient){
        return null
    }
   return (
     <div className="flex items-center justify-center space-x-2">
        <button 
        onClick={() => removeItem(product._id)} 
        className={`w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center
         hover:bg-blue-600 transition-colors duration-200 ${
         itemCount === 0 
         ?"bg-blue-400-600 cursor-not-allowed"
         :"bg-blue-500 hover:bg-gray-300"
        }`  }
         
         disabled={itemCount === 0 || disabled }
          >
            <span
            className={`text-xl font-bold ${itemCount === 0 ? "text-gray-400" : "text-gray-600"}`}>-</span>
          </button>
                <span className="w-8 text-center font-semibold">{itemCount}</span>
                <button 
                onClick={() => addItem(product)}
                className={`w-8 h-8 rounded-full  flex items-center justify-center
                 hover:bg-blue-300 transition-colors duration-200 ${
                 disabled 
                 ?" cursor-not-allowed"
                 :"bg-blue-500 hover:bg-blue-600"
                }`  }
                
                disabled={ disabled }
                 >
                  <span
                  className={`text-xl font-bold ${itemCount === 0 ? "text-gray-400" : "text-gray-600"}`}>+</span>
                </button>
        </div>
   )
 }
 
 export default AddToBasketButton