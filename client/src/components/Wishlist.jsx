import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { HeartIcon } from '@heroicons/react/solid';
const Wishlist = () => {
  const [products, setProducts] = useState([]);

  const favorite = (oneProduct) => {
    const update = {
      ...oneProduct,
      favorite: !oneProduct.favorite
    }
    axios
      .patch(`http://localhost:8000/api/Product/${oneProduct._id}`, update)
      .then((res) => {
        axios
          .get("http://localhost:8000/api/Product")
          .then((allProducts) => setProducts(allProducts.data))
          .catch((err) => console.log(err));

      })
  }
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/Product")
      .then((allProducts) => setProducts(allProducts.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="mt-14 mb-12 flex justify-center min-h-screen ">
      <div className="container">
        {/* Header section */}
        <div className="text-center mb-10 max-w-[600px] mx-auto">
          {/* <h1 data-aos="fade-up" className="text-3xl font-bold">
          PRODUCT OVERVIEW
          </h1> */}
        </div>
        {/* Body section */}
        <div>
          <div className="flex items-center flex-wrap justify-center gap-10 m-auto">
            {/* card section */}
            {products.map((oneProduct) => (<>{oneProduct.favorite &&
              // 
              <div class="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden my-10">
                <div class="px-4 py-2">
                  <div className="flex justify-between">
                    <h1 class="text-gray-900 font-bold text-3xl uppercase ">{oneProduct.type}</h1>
                    {oneProduct.favorite ?
                      <button onClick={() => favorite(oneProduct)}>

                        <HeartIcon className="h-6 w-6 text-red-500" />
                      </button>
                      : <button onClick={() => favorite(oneProduct)}>

                        <HeartIcon className="h-6 w-6 text-white-500" />
                      </button>}

                  </div>

                  <p class="text-gray-600 text-sm mt-1">{oneProduct.description}</p>
                </div>

                <img class="h-64 w-full object-cover mt-2" src={oneProduct.image[0]} alt={oneProduct.type} />
                <div class="flex items-center justify-between px-4 py-2 bg-gray-900">
                  <h1 class="text-gray-200 font-bold text-xl">${oneProduct.price}</h1>
                  <button class="px-3 py-1 bg-gray-200 text-sm text-gray-900 font-semibold rounded">Add to card</button>
                </div>
              </div>
            }</>))}
          </div>


        </div>
      </div>
    </div>
  )
}

export default Wishlist
