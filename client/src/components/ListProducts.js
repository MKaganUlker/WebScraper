import React,{Fragment, useEffect, useState} from "react";

const ListProducts = () => {

    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        try {
            const response = await fetch("http://localhost:5000/products");
            const jsonData = await response.json();
        
            setProducts(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(()=>{
        getProducts();
    },[]);
    
    return <Fragment><table className="table table-striped mt-5 text-center">
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Image URL</th>
        <th>Price</th>
      </tr>
    </thead>
    <tbody>
      {products.map(product => (
          <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.image}</td>
              <td>{product.price}</td>
          </tr>
      ))}
    </tbody>
  </table></Fragment>;
};

export default ListProducts;