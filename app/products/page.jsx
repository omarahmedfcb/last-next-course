import Card from "@/components/Card";

export const metadata = {
  title: "Products",
  description: "View all products",
};

async function Products() {
  let products = [];

  try {
    const res = await fetch("https://fakestoreapi.com/products");
    products = await res.json();
  } catch (e) {
    throw new Error(e);
  }
  return (
    <section>
      <div className="w-9/10 mx-auto">
        <h1 className="text-5xl text-center py-8">Explore out products</h1>
        <div className="grid grid-cols-3 gap-8 py-8">
          {products.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Products;
