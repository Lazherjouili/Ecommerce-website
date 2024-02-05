import { useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios'

const Update = () => {
  const [type, setType] = useState("")
  const [image, setImage] = useState("")
  const [quantity, setQuantity] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")

  const [errors, setErrors] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    TransformFileData(file);
  };

  const TransformFileData = (file) => {
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage(reader.result);
      };
    } else {
      setImage("");
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/Product/${id}`)
      .then((res) => {
        setType(res.data.type);
        setImage(res.data.image);
        setQuantity(res.data.quantity);
        setPrice(res.data.price);
        setDescription(res.data.description);



      })
      .catch((err) => console.log(err));
  }, [id]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const UpdateProduct = {
      type,
      image,
      quantity,
      price,
      description



    };
    axios
      .patch(`http://localhost:8000/api/Product/${id}`, UpdateProduct)
      .then((res) => {
        navigate(`/admin`);
      })
      .catch(err => {
        const errorResponse = err.response.data.errors; // Get the errors from err.response.data
        const errorArr = []; // Define a temp error array to push the messages in
        for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
          errorArr.push(errorResponse[key].message)
        }
        // Set Errors
        setErrors(errorArr);
      })
    setType("")
    setImage("")
    setQuantity("")
    setPrice("")
    setDescription("")

  };

  return (
    <div className='pl-10 pr-10 flex items-center justify-between'>
      <form
        onSubmit={handleSubmit}
        className="p-8 rounded-lg shadow-lg w-2/4 mt-10 "
      >
        <h1 className="text-xl font-semibold mb-4">Add A New Product:</h1>
        {errors.map((err, index) => <p key={index} className="text-red-600 mb-6">{err}</p>)}

        <div className="mb-4">
          <label>Type:</label>
          {/* <p  className="text-red-600 mb-6">{nameerror}</p> */}
          <input
            onChange={(e) => { setType(e.target.value) }}
            type="text"
            value={type}
            className="text-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label>Image:</label>


          <input
            onChange={handleImageUpload}
            type="file"
            accept="image/*"
            // value={image}
            className="text-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label>Quantity:</label>
          {/* <p  className="text-red-600 mb-6">{nameerror}</p> */}
          <input
            onChange={(e) => { setQuantity(e.target.value) }}
            type="text"
            value={quantity}
            className="text-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label>Price:</label>
          {/* <p  className="text-red-600 mb-6">{nameerror}</p> */}
          <input
            onChange={(e) => { setPrice(e.target.value) }}
            type="text"
            value={price}
            className="text-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label>Description:</label>
          {/* <p  className="text-red-600 mb-6">{nameerror}</p> */}
          <textarea
            onChange={(e) => { setDescription(e.target.value) }}
            type="text"
            value={description}
            className="text-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:border-blue-500"
          ></textarea>
        </div>
        <div className="flex justify-around gap-5">

          <button className="w-32 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none">
            Submit
          </button>
        </div>
      </form>
      <div className='border-1  justify-end'>
        {image ? (
          <>
            <img className='w-60' src={image[0]} alt="error!" />
          </>
        ) : (
          <p>Product image upload preview will appear here!</p>
        )}
      </div>
    </div>
  )
}

export default Update