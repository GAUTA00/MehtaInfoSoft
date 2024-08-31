import React, { useState } from "react";

// Sample product data
const product = [
    { id: 1, Name: 'Product 1', price: 100 },
    { id: 2, Name: 'Product 2', price: 200 },
    { id: 3, Name: 'Product 3', price: 300 },
];

const Form = () => {
    // State to store user input
    const [user, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [currentProduct, setCurrentProduct] = useState("");
    const [quantity, setQuantity] = useState(0);
    
    // Calculation-related states
    const [grossAmount, setGrossAmount] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [shippingCharges, setShippingCharges] = useState(0);
    const [roundOff, setRoundOff] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);

    // Add item function
    const addItem = async (e) => {
        e.preventDefault();
        
        const selectedProduct = product.find(
            (product) => product.id === parseInt(currentProduct)
        );
        const productAmount = selectedProduct.price * quantity;
        
        // Update Gross Amount and Total Amount
        const newGrossAmount = grossAmount + productAmount;
        setGrossAmount(newGrossAmount);
        
        const newRoundOff = Math.round(newGrossAmount - discount + shippingCharges);
        setRoundOff(newRoundOff);
        
        const newTotalAmount = newGrossAmount - discount + shippingCharges + newRoundOff;
        setTotalAmount(newTotalAmount);
        
        const userData = {
            name: user,
            email: email,
            products: [
                {
                    productName: selectedProduct.Name,
                    quantity: quantity,
                    price: selectedProduct.price,
                },
            ],
            totalPrice: newTotalAmount,
        };

        // Send data to the server
        try {
            const response = await fetch('http://localhost:3000/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                console.log('Data saved successfully');
            } else {
                console.error('Failed to save data');
            }
        } catch (error) {
            console.error('Error:', error);
        }

        // Reset form fields
        setUser("");
        setEmail("");
        setCurrentProduct("");
        setQuantity(0);
        setGrossAmount(0);
        setDiscount(0);
        setShippingCharges(0);
        setRoundOff(0);
        setTotalAmount(0);
    };

    return (
        <div className="max-w-lg mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Order Form</h2>
            <form onSubmit={addItem} className="space-y-6">
                <div className="form-group">
                    <label className="block text-gray-700 text-sm font-medium mb-2">Name</label>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="form-group">
                    <label className="block text-gray-700 text-sm font-medium mb-2">Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="form-group">
                    <label className="block text-gray-700 text-sm font-medium mb-2">Select Product</label>
                    <select
                        value={currentProduct}
                        onChange={(e) => setCurrentProduct(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="" disabled>Select a product</option>
                        {product.map((product) => (
                            <option key={product.id} value={product.id}>
                                {product.Name} - Rs {product.price}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label className="block text-gray-700 text-sm font-medium mb-2">Quantity</label>
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                        placeholder="Enter quantity"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                    Add Item
                </button>
            </form>
            <div className="mt-8 space-y-4">
                <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Gross Amount</span>
                    <span className="text-gray-800">Rs {grossAmount}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Discount</span>
                    <input
                        type="number"
                        value={discount}
                        onChange={(e) => setDiscount(parseInt(e.target.value))}
                        placeholder="Enter discount"
                        className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Shipping Charges</span>
                    <input
                        type="number"
                        value={shippingCharges}
                        onChange={(e) => setShippingCharges(parseInt(e.target.value))}
                        placeholder="Enter shipping charges"
                        className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Round Off</span>
                    <input
                        type="text"
                        value={`Rs ${roundOff}`}
                        readOnly
                        className="w-32 px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
                    />
                </div>
                <div className="flex justify-between font-bold text-gray-800">
                    <span>Total Amount</span>
                    <span>Rs {totalAmount}</span>
                </div>
            </div>
        </div>
    );
};

export default Form;
