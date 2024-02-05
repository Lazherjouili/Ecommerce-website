import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

const ShowOne = () => {
  const [oneProduct, setOneProduct] = useState(null);
  const [q, setQ] = useState(1);
  const { id } = useParams();
  //   const nav=useNavigate()
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/Product/${id}`)
      .then((one) => setOneProduct(one.data))
      .catch((err) => console.log(err));
  }, [id]);

  const favorite = (oneProduct) => {
    const update = {
      ...oneProduct,
      favorite: !oneProduct.favorite,
    };
    axios
      .patch(`http://localhost:8000/api/Product/${oneProduct._id}`, update)
      .then((res) => {
        axios
          .get("http://localhost:8000/api/Product")
          .then((allProducts) => setProducts(allProducts.data))
          .catch((err) => console.log(err));
      });
  };
  const getCard = () => {
    let card = localStorage.getItem('card');
    console.log("=========", card);

    if (!card) {
      let card = [];
      card = JSON.stringify(card);
      localStorage.setItem('card', card);
      console.log("+++++++++++++++", JSON.parse(localStorage.getItem('card')));
      return JSON.parse(localStorage.getItem('card'));
    }

    return JSON.parse(card);
  };

  const incQ = ()=>{
    if (q<oneProduct.quantity) {
      setQ(q+1)
    }}
  const decQ = ()=>{
    if (q>1) {
    setQ(q-1)
  }}


  const addToCard = async (obj) => {
    let card = await getCard();
    const existingProductIndex = card.findIndex((prod) => prod.productId === obj._id);

    if (existingProductIndex === -1) {
      // Product not in the cart, add it with quantity 1
      card.push({ ...obj, quantity: 1, productId: obj._id });
    } else {
      // Product is already in the cart, increment the quantity
      card[existingProductIndex].quantity += 1;
    }

    card = JSON.stringify(card);
    localStorage.setItem('card', card);
    return JSON.parse(card);
  };
  return (
    <section class="overflow-hidden bg-white py-11 font-poppins dark:bg-gray-800 ">
      {oneProduct && (
        <div class="max-w-6xl px-4 py-4 mx-auto lg:py-8 md:px-6 ">
          <div class="flex ">
            <div class="w-full px-4 md:w-1/2 ">
              <div class="sticky top-0 z-50 overflow-hidden ">
                <div class="relative mb-6 h-auto border border-1 ">
                  <img
                    src={oneProduct.image[0]}
                    alt={oneProduct.type}
                    class="object-contain w-full h-[32rem] "
                  />
                </div>
                <div class="flex-wrap hidden md:flex ">
                  <div class="w-1/2 p-2 sm:w-1/2">
                    <a
                      href="#"
                      class="block border border-1 dark:border-transparent dark:hover:border-red-300 hover:border-red-300"
                    >
                      <img
                        src={oneProduct.image[1]}
                        alt={oneProduct.type}
                        class=" w-full  lg:h-20 object-contain"
                      />
                    </a>
                  </div>
                  <div class="w-1/2 p-2 sm:w-1/2">
                    <a
                      href="#"
                      class="block border border-1 dark:border-transparent dark:hover:border-red-300 hover:border-red-300"
                    >
                      <img
                        src={oneProduct.image[2]}
                        alt={oneProduct.type}
                        class="object-contain w-full  lg:h-20"
                      />
                    </a>
                  </div>
                  
                 
                </div>
              </div>
            </div>
            <div class="w-full px-4 md:w-1/2  ">
            
              <div class="lg:pl-20 ">
                <div class="mb-8 ">
                  <span class="text-lg font-medium text-rose-500 dark:text-rose-200">
                    New
                  </span>
                  <h2 class="max-w-xl mt-2 mb-6 text-2xl font-bold dark:text-gray-400 md:text-4xl uppercase">
                    {oneProduct.type}
                  </h2>

                  <p class="max-w-md mb-8 text-gray-700 dark:text-gray-400">
                    {oneProduct.description}
                  </p>
                  <p class="inline-block mb-8 text-4xl font-bold text-gray-700 dark:text-gray-400 ">
                    <span>{oneProduct.price}$</span>
                  </p>
                </div>

                <div class="w-32 mb-8 ">
                  <label
                    for=""
                    class="w-full text-xl font-semibold text-gray-700 dark:text-gray-400"
                  >
                    Quantity
                  </label>
                  <div class="relative flex flex-row w-full h-10 mt-4 bg-transparent rounded-lg">
                    <button onClick={()=>decQ()} class="w-20 h-full text-gray-600 bg-gray-300 rounded-l outline-none cursor-pointer dark:hover:bg-gray-700 dark:text-gray-400 hover:text-gray-700 dark:bg-gray-900 hover:bg-gray-400">
                      <span class="m-auto text-2xl font-thin">-</span>
                    </button>
                    <input
                      type="text"
                      class="flex items-center w-full font-semibold text-center text-gray-700 placeholder-gray-700 bg-gray-300 outline-none dark:text-gray-400 dark:placeholder-gray-400 dark:bg-gray-900 focus:outline-none text-md hover:text-black"
                      placeholder="1"
                      value={q}
                    />
                    <button onClick={()=>incQ()} class="w-20 h-full text-gray-600 bg-gray-300 rounded-r outline-none cursor-pointer dark:hover:bg-gray-700 dark:text-gray-400 dark:bg-gray-900 hover:text-gray-700 hover:bg-gray-400">
                      <span class="m-auto text-2xl font-thin">+</span>
                    </button>
                  </div>
                </div>
                <div class="flex flex-wrap items-center -mx-4 ">
                  <div class="w-full px-4 mb-4 lg:w-1/2 lg:mb-0">
                  
                    <button onClick={async () => {
                    const updatedCard = await addToCard(oneProduct);
                    console.log(updatedCard);
                    return updatedCard;
                  }} class="flex items-center justify-center w-full p-4 text-red-500 border border-red-500 rounded-md dark:text-gray-200 dark:border-red-600 hover:bg-red-600 hover:border-red-600 hover:text-gray-100 dark:bg-red-600 dark:hover:bg-red-700 dark:hover:border-red-700 dark:hover:text-gray-300">
                      Add to Cart
                    </button>
                  </div>
                  <div class="w-full px-4 mb-4 lg:mb-0 lg:w-1/2">
                    <button
                      onClick={() => favorite(oneProduct)}
                      class="flex items-center justify-center w-full p-4 text-red-500 border border-red-500 rounded-md dark:text-gray-200 dark:border-red-600 hover:bg-red-600 hover:border-red-600 hover:text-gray-100 dark:bg-red-600 dark:hover:bg-red-700 dark:hover:border-red-700 dark:hover:text-gray-300"
                    >
                      Add to wishlist
                    </button>
                  </div>
                </div>
              </div>
           
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ShowOne;
