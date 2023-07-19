import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input } from "@material-tailwind/react";
function ProductSearch() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:2030/api/v1/products');
        const fetchedProducts = response.data.products;
        setProducts(fetchedProducts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (searchTerm.trim() !== '') {
      setSearchResults(filteredProducts);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm, products]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="lg:w-[400px]  mx-auto my-[10px] relative" >
      <Input type="text" label="Seach Product" value={searchTerm} onChange={handleSearchChange} icon={<i className="fas fa-heart" />} />
      <ul className='overflow-y-auto h-[200px]'>
        {searchResults.map((product) => (
          <a href={`/products/${product.id}`} key={product.id} className='text-black flex my-2 p-2 shadow-sm shadow-neutral-300 hover:bg-blue-200 '>
            <img
              src={product.images[0]}
              alt={product.name}
              className="h-[30px] w-[30px] object-cover object-center rounded-lg my-auto  mr-[10px]"
            />
            <p >{product.name}</p>

          </a>
        ))}
      </ul>
    </div>
  );
}

export default ProductSearch;
