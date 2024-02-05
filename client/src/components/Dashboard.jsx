import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/product")
      .then((allProducts) => setProducts(allProducts.data))
      .catch((err) => console.log(err));
  }, []);
  const nav = useNavigate();
  const editProduct = (id) => {
    nav(`/product/${id}/edit`);
  };
  const viewProduct = (id) => {
    nav(`/product/${id}/admin`);
  };
  const createProduct = () => {
    nav("/product/new");
  };
  const deleteProduct=((id)=>{
    axios
.delete(`http://localhost:8000/api/Product/${id}`)
.then((res) => {
  console.log(res);
  const filteredProducts = products.filter((eachProduct) => {
    return eachProduct._id !== id;
  });
  setProducts(filteredProducts);
})
.catch((err) => console.log(err));
})
  return (
    <div className="p-10">
        <div className="w-full flex justify-end">
      <button
        onClick={() => createProduct()}
        className="  font-bold py-1 px-8 border rounded "
      >
        Create
      </button>
      </div>
      
      
      <table className=" border-collapse  md:table     mt-5 w-full min-h-screen">
        <thead className="block md:table-header-group">
          <tr className=" border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative w-full">
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Type
            </th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Image
            </th>

            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Quantity
            </th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Price
            </th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Description
            </th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="block md:table-row-group ">
          {products.map((oneProduct) => {
            return (
              <tr
                key={oneProduct._id}
                className=" border border-grey-500 md:border-none block md:table-row"
              >
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell">
                  {oneProduct.type}
                </td>

                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell  w-10">
                  <img src={oneProduct.image[0]} alt={oneProduct.type} />
                </td>
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell ">
                  {oneProduct.quantity}
                </td>
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell ">
                  {oneProduct.price}
                </td>
                <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell ">
                  {oneProduct.description}
                </td>

                <td className="p-2 md:border md:border-grey-500 text-left md:table-cell  ">
                  <div className="flex gap-2 justify-center">
                  <button
                    onClick={() => editProduct(oneProduct._id)}
                    className="bg-blue-500 text-white font-bold py-1 px-4 border rounded "
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProduct(oneProduct._id)}
                    className="bg-purple-700 text-white font-bold py-1 px-4 border rounded "
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => viewProduct(oneProduct._id)}
                    className="bg-purple-700 text-white font-bold py-1 px-4 border rounded "
                  >
                    View
                  </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
        
      </table>
      
    </div>
  );
};

export default Dashboard;
