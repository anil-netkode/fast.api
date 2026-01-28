import React, { useState } from 'react';
import { Package, Search, Pencil, Trash2 } from 'lucide-react';

function App() {
    // State for the list of products
    const [products, setProducts] = useState([
        { id: 1, name: 'Phone', description: 'A smartphone', price: 699.99, quantity: 50 },
        { id: 2, name: 'Laptop', description: 'A powerful laptop', price: 999.99, quantity: 30 },
        { id: 3, name: 'Table', description: 'A wooden table', price: 199.99, quantity: 20 },
        { id: 4, name: 'Pen', description: 'A ballpoint pen', price: 10.00, quantity: 20 },
        { id: 5, name: 'Asus Laptop', description: 'Budget Laptop', price: 999.00, quantity: 12 },
    ]);

    // State for the form input
    const initialFormState = { id: '', name: '', description: '', price: '', quantity: '' };
    const [formData, setFormData] = useState(initialFormState);
    const [isEditing, setIsEditing] = useState(false);

    // State for search
    const [searchQuery, setSearchQuery] = useState('');

    // Derived state for filtered products
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.id.toString().includes(searchQuery)
    );

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Add a new product
    const handleAdd = () => {
        if (!formData.id || !formData.name || !formData.price) {
            alert("Please fill in ID, Name, and Price");
            return;
        }

        // Check if ID already exists
        if (products.some(p => p.id == formData.id)) {
            alert("ID already exists!");
            return;
        }

        const newProduct = {
            ...formData,
            id: Number(formData.id),
            price: Number(formData.price),
            quantity: Number(formData.quantity) || 0
        };

        setProducts([...products, newProduct]);
        setFormData(initialFormState);
    };

    // Populate form for editing
    const handleEdit = (product) => {
        setFormData(product);
        setIsEditing(true);
    };

    // Update existing product
    const handleUpdate = () => {
        const updatedProducts = products.map((product) =>
            product.id === Number(formData.id) ? {
                ...formData,
                id: Number(formData.id),
                price: Number(formData.price),
                quantity: Number(formData.quantity) || 0
            } : product
        );

        setProducts(updatedProducts);
        setFormData(initialFormState);
        setIsEditing(false);
    };

    // Delete a product
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            setProducts(products.filter(product => product.id !== id));
        }
    };

    // Cancel edit mode
    const handleCancel = () => {
        setFormData(initialFormState);
        setIsEditing(false);
    };

    return (
        <div className='min-h-screen pb-10'>
            {/* Header */}
            <header className='w-full p-6 flex justify-between items-center text-white'>
                <div className='flex items-center gap-2'>
                    <Package size={28} className="text-yellow-200" style={{ color: '#fbbf24' }} />
                    <h1 className='text-2xl font-bold'>Telusko Trac</h1>
                </div>
                <button className='btn-refresh' onClick={() => window.location.reload()}>Refresh</button>
            </header>

            <div className='container grid grid-cols-1 md:grid-cols-3 gap-8'>

                {/* Left Column (Main Content) */}
                <div className='md:col-span-2 flex flex-col gap-6'>

                    {/* Total Badge */}
                    <div>
                        <span className='badge'>Total: {filteredProducts.length}</span>
                    </div>

                    {/* Add/Edit Product Form */}
                    <div className='card'>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className='text-xl font-bold'>{isEditing ? 'Edit Product' : 'Add Product'}</h2>
                            {isEditing && <button onClick={handleCancel} className="text-sm text-red-500">Cancel</button>}
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                            <input
                                name="id"
                                value={formData.id}
                                onChange={handleInputChange}
                                type="number"
                                placeholder="ID"
                                className={`bg-gray-50 ${isEditing ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={isEditing}
                            />
                            <input
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                type="text"
                                placeholder="Name"
                                className='bg-gray-50'
                            />
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                            <input
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                type="text"
                                placeholder="Description"
                                className='bg-gray-50'
                            />
                            <input
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                type="number"
                                placeholder="Price"
                                className='bg-gray-50'
                            />
                        </div>

                        <div className='mb-4'>
                            <input
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleInputChange}
                                type="number"
                                placeholder="Quantity"
                                className='w-1/2 bg-gray-50'
                            />
                        </div>

                        <button
                            className='btn-primary mt-2'
                            onClick={isEditing ? handleUpdate : handleAdd}
                        >
                            {isEditing ? 'Update' : 'Add'}
                        </button>
                    </div>

                    {/* Products List */}
                    <div className='card'>
                        <h2 className='text-xl font-bold mb-4'>Products</h2>

                        <div className='table-container'>
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID <span style={{ fontSize: '0.6em' }}>↑</span></th>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredProducts.map((product) => (
                                        <tr key={product.id}>
                                            <td>{product.id}</td>
                                            <td className='font-bold'>{product.name}</td>
                                            <td className='text-gray-500'>{product.description}</td>
                                            <td className='price'>${Number(product.price).toFixed(2)}</td>
                                            <td>
                                                <span className='quantity-badge'>{product.quantity}</span>
                                            </td>
                                            <td>
                                                <div className='flex'>
                                                    <button
                                                        className='btn-edit flex items-center gap-1'
                                                        onClick={() => handleEdit(product)}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className='btn-delete flex items-center gap-1'
                                                        onClick={() => handleDelete(product.id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {filteredProducts.length === 0 && (
                                <p className="text-center p-4 text-gray-500">No products found.</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column (Sidebar) */}
                <div className='flex flex-col gap-6'>

                    {/* Search Bar */}
                    <div className='relative'>
                        <input
                            type="text"
                            placeholder="Search by id, name or description..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{ borderRadius: '0.5rem', padding: '1rem', width: '100%', border: 'none' }}
                        />
                    </div>

                    {/* Promo Card */}
                    <div className='card text-center flex flex-col items-center justify-center p-8' style={{ minHeight: '300px' }}>
                        <h2 className='text-2xl font-bold text-indigo-700 mb-2' style={{ color: '#4f46e5' }}>Track. Manage. Grow.</h2>
                        <p className='text-gray-500 mb-8 italic'>
                            Streamline your inventory with smart product management that scales with your business.
                        </p>

                        <div className='bg-gray-50 rounded-lg px-6 py-3 shadow-sm border border-gray-100'>
                            <span className='text-gray-400 text-sm font-semibold tracking-wider'>POWERED BY</span>
                            <span className='text-yellow-500 font-bold ml-2' style={{ color: '#f59e0b' }}>TELUSKO</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default App
