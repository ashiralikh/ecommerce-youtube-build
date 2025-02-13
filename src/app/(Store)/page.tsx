import { getAllProducts } from "@/sanity/lib/products/getAllProducts";
import ProductsView from "@/components/ProductsView";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import BlackFridayBanner from "@/components/BlackFridayBanner";

export const dynamic = "force-static";
export const revalidate = 60;  // revalidate this page every 60 seconds 

export default async function Home() {
  const prodects = await getAllProducts();
  const categories = await getAllCategories(); 
 
  return (
    <div>
    <BlackFridayBanner/>
      {/* <h1>Ashir Ali Khan </h1> */}
      {/* render all the products */}

<div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4">
  
  <ProductsView products={prodects} categories={categories} />
</div>

      {/* <Button>Click Me </Button> */}
    </div>
  );
}
