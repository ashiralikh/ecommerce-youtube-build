import ProductGrid from "@/components/ProductGrid";
import { searchProductsByName } from "@/sanity/lib/products/seachProductsByName";

async function SearchPage({
  searchParams,
}: {
  searchParams: {
    query: string;
  };
}) {
  const { query } = searchParams; // Correctly destructure searchParams
  const products = await searchProductsByName(query);

  if (!products.length) {
    // If no products are found, display a message
    return (
      <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4">
        <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-4xl">
          <h1 className="text-2xl font-bold">No products found for: {query}</h1>
          <p className="text-gray-600 text-center">
            Try searching for a different keyword.
          </p>
        </div>
      </div>
    );
  }

  // If products are found, display them
  return (
    <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Search results for: {query}
        </h1>
        <ProductGrid products={products} />
      </div>
    </div>
  );
}

export default SearchPage;