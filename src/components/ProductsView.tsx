"use client";
import { Category, Product } from "../../sanity.types";
import ProductGrid from "@/components/ProductGrid";
import { CategorySelectorComponent } from "./ui/category-selector";
interface productsViewerProps {
    products: Product[];
    categories: Category [];
}

const productsViewer = ({ products , categories}:  productsViewerProps ) => {
    // console.log(categories);
    // console.log(products);
    return (

        <div className="flex flex-col sm:flex-row">
        {/* categories */}
<div className="w-full sm:w-[200px]">   
    <CategorySelectorComponent categories={categories} />
</div>

        {/* products */}
        <div className="flex-1">
            <div className=""> 
                <ProductGrid products={products} />

                <hr className="w-1/2 sm:w-3/4" />
            </div>
        </div>

    </div>

) 
};

export default productsViewer;

        // <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        //     {products.map((product: any) => (
        //         <div
        //             key={product._id}
        //             className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg shadow-md"
        //         >
        //             <img
        //                 src={product.image}
        //                 alt={product.name}
        //                 className="w-full h-48 object-cover"
        //             />
        //             <h2 className="mt-2 text-lg font-semibold">{product.name}</h2>
        //             <p className="mt-1 text-gray-600">${product.price}</p>
        //         </div>

        //     ))}
        // </div>