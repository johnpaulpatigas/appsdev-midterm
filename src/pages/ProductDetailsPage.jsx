import { useParams } from "react-router-dom";

function ProductDetailsPage() {
  const { id } = useParams();

  return (
    <div className="p-4 text-center">
      <h1 className="mb-4 text-3xl font-bold">Product Details Page</h1>
      <p>Details for product ID: {id}</p>
    </div>
  );
}

export default ProductDetailsPage;
