import { getProductBySlug } from "@/sanity/lib/products/getProductBySlug";
import { notFound } from "next/navigation";
import Image from "next/image";
import { imageUrl } from "@/lib/imageUrl";
import { PortableText } from "next-sanity";
import AddToBasketButton from "@/components/AddToBasketButton";

export const dynamic = "force-dynamic";

export const revalidate = 60; // revalidate this page every 60 seconds

async function productPage({
     params
     }:{ 
        params: Promise <{
             slug : string;
             }>;
    }) {
    const {slug} = await params;
    const product = await getProductBySlug(slug);
    

    console.log(
        crypto.randomUUID().slice(0, 5) +
        `>>>Reradering product page for product cache for slug: ${slug}`
    );

    if(!product){
        return notFound();
        
    }

    const isOutOfStock = product.stock != null && product.stock <= 0;
   return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-2 gap-4">
          <div 
          className={`relative aspect-square overflow-hidden rounded-lg
            shadow-lg ${isOutOfStock ? "opacity-50" : ""}` }
            >
                {product.image && (
                    <Image
                    src={imageUrl(product.image).url()}
                    alt={product.name || "Product image"}
                    fill
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                    className="object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                )}
                {isOutOfStock && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <span className="text-white font-bold text-lg">out of stock</span>
                    </div>
                )}
          </div>
             <div className="flex flex-col justify-between">
           <div>
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <div className="text-xl font-semibold mb-4">
                £{product.price?.toFixed(2)}
                </div>
                <div className="prose max-w-none mb-6">
                    {Array.isArray(product.description) &&(

                    <PortableText value={product.description} />
                    )}

                </div>
           </div>
           <div className="mt-6"> 
            <AddToBasketButton product={product} disabled={isOutOfStock} />
             {/* <Button>Add to basket</Button> */}
           </div>
        </div>
      </div>
    </div>
  )
}

export default productPage