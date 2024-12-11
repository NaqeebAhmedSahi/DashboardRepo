import { useState, useEffect } from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";
import TableHOC from "../components/TableHOC";
import { Column } from "react-table";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

interface DataType {
  photo: React.ReactElement;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  brand: string;
  averageRating: number;
  numOfReviews: number;
  createdAt: string;
  action: React.ReactElement;
}

const columns: Column<DataType>[] = [
  { Header: "Photo", accessor: "photo" },
  { Header: "Name", accessor: "name" },
  { Header: "Description", accessor: "description" },
  { Header: "Price", accessor: "price" },
  { Header: "Stock", accessor: "stock" },
  { Header: "Category", accessor: "category" },
  { Header: "Brand", accessor: "brand" },
  { Header: "Rating", accessor: "averageRating" },
  { Header: "Reviews", accessor: "numOfReviews" },
  { Header: "Created At", accessor: "createdAt" },
  { Header: "Action", accessor: "action" },
];

const Products = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/getProducts");
        console.log(response.data);

        const products = response.data.products.map((product: any) => ({
          photo: <img src={product.photoUrl} alt={product.name} />,
          name: product.name,
          description: product.description,
          price: product.price,
          stock: product.stock,
          category: product.category,
          brand: product.brand,
          averageRating: product.averageRating,
          numOfReviews: product.numOfReviews,
          createdAt: new Date(product.createdAt).toLocaleDateString(),
          action: <Link to={`/admin/product/${product._id}`}>Manage</Link>,
        }));

        setData(products);
      } catch (err) {
        setError("Failed to fetch products");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const Table = TableHOC<DataType>(columns, data, "dashboard-product-box", "Products", true);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="products">
        <Table /> {/* Corrected here */}
      </main>
      <Link to="/admin/product/new" className="create-product-btn">
        <FaPlus />
      </Link>
    </div>
  );
};

export default Products;
