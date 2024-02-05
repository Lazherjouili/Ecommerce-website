import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import Swal from "sweetalert2";
import axios from "axios";



const Card = ({lengthCard}) => {
    const [card, setCard] = useState([]);
    const [oneProduct, setOneProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const lengthCar=(card)=>{
        // setCard(card)
lengthCard(card)
    }
    useEffect(() => {
        const storedCard = JSON.parse(localStorage.getItem("card")) || [];
        setCard(storedCard);
    }, []);

    const getCard = () => {
        let card = localStorage.getItem("card");
        try {
            card = JSON.parse(card) || [];
        } catch (error) {
            console.error('Error parsing card:', error);
            card = [];
        }
        return card;
    };

    const removeFromCard = (id) => {
        let card = getCard();
        const productIndex = card.findIndex((prod) => prod.productId === id);
        if (productIndex !== -1) {
            card.splice(productIndex, 1);
            localStorage.removeItem(`product_${id}`);
            localStorage.setItem('card', JSON.stringify(card));
            setCard([...card]); // Update state to trigger a re-render
        }
    };

    const incrementQuantity = (id) => {
        let card = getCard();
        const productIndex = card.findIndex((prod) => prod.productId === id);
        if (productIndex !== -1) {

            axios
                .get(`http://localhost:8000/api/Product/${id}`)
                .then((one) => { setOneProduct(one.data); console.log(one.data); })
                .catch((err) => console.log(err));

            if (card[productIndex].quantity == oneProduct.quantity) {
                console.log("reached max q");
            } else {
                card[productIndex].quantity += 1;
                localStorage.setItem('card', JSON.stringify(card));
                setCard([...card]); // Update state to trigger a re-render
            }
        }
    };

    const decrementQuantity = (id) => {
        let card = getCard();
        const productIndex = card.findIndex((prod) => prod.productId === id);
        if (productIndex !== -1) {
            if (card[productIndex].quantity > 1) {
                card[productIndex].quantity -= 1;
                localStorage.setItem('card', JSON.stringify(card));
                setCard([...card]); // Update state to trigger a re-render
            }
        }
    };
    // const nav = useNavigate()
    // const toCheckOut = () => {
    //     nav('/product/cart/checkout')
    // }
    const onToken = async (e) => {
        console.log(e);
        try {
            setLoading(false);
            Swal.fire(
                "Congratulations",
                "Payment done Successfully",
                "success"
            ).then(() => {
                window.location.href = "/";
            });
        } catch (error) {
            console.log(error);
            Swal.fire("Opps", "Error:" + error, "error");
        }
        setLoading(false);
    };
    return (
        <div className=" h-screen py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="md:w-3/4">
                        <div className="rounded-lg shadow-md p-6 mb-4">
                            <table className="w-full">
                                <thead>
                                    <tr>
                                        <th className="text-left font-semibold">Product</th>
                                        <th className="text-left font-semibold">Price</th>
                                        <th className="text-left font-semibold">Quantity</th>
                                        <th className="text-left font-semibold">Total</th>
                                        <th className="text-left font-semibold">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {card.map((cartItem) => (
                                        <tr key={cartItem.productId}>
                                            <td className="py-4">
                                                <div className="flex items-center">
                                                    <img
                                                        className="h-16 w-16 mr-4 rounded"
                                                        src={cartItem.image[0]}
                                                        alt={cartItem.type}
                                                    />
                                                    <span className="font-semibold">{cartItem.id}</span>
                                                </div>
                                            </td>
                                            <td className="py-4">{cartItem.price}</td>
                                            <td className="py-4">
                                                <div className="flex items-center">
                                                    <button
                                                        onClick={() => decrementQuantity(cartItem.productId)}
                                                        className="border rounded-md py-2 px-4"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="text-center w-8">{cartItem.quantity}</span>
                                                    <button
                                                        onClick={() => incrementQuantity(cartItem.productId)}
                                                        className="border rounded-md py-2 px-4"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="py-4">{cartItem.price * cartItem.quantity}</td>
                                            <td className="py-4">
                                                <button
                                                    onClick={() => removeFromCard(cartItem.productId)}
                                                    className=" font-bold py-1 px-4 border rounded"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                    </svg>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="md:w-1/4">
                        <div className=" rounded-lg shadow-md p-6">
                            <h2 className="text-lg font-semibold mb-4">Summary</h2>
                            <div className="flex justify-between mb-2">
                                <span>Subtotal</span>
                                <span>{calculateSubtotal()}</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span>Taxes</span>
                                <span>$1.99</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span>Shipping</span>
                                <span>$7.99</span>
                            </div>
                            <hr className="my-2" />
                            <div className="flex justify-between mb-2">
                                <span className="font-semibold">Total</span>
                                <span>{calculateTotal()}</span>
                            </div>

                            <StripeCheckout
                                amount={calculateTotal() * 100}
                                currency="USD"
                                token={onToken}
                                stripeKey="pk_test_51NVUJMLnKGfzbvT6B5I6r9a7KUp6JB81UxojSBHflk5KuLRRLJpUrbt5YguVMLgLk2fVqBvKl2j4jxfOWWltg4Yy005loYB1Bo"
                            >
                                <button className="bg-green-500 text-white w-full px-4 py-2 rounded-lg hover:bg-teal-700 dark:bg-teal-600 dark:text-white dark:hover:bg-teal-900">Pay Now</button>
                            </StripeCheckout>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    function calculateSubtotal() {
        return card.reduce(
            (total, cartItem) => total + cartItem.price * cartItem.quantity,
            0
        );
    }

    function calculateTotal() {
        return calculateSubtotal() + 1.99; // Assuming fixed taxes for now
    }
};

export default Card;
