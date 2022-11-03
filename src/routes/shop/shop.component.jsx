import { useContext } from "react";
import ProductCard from "../../components/product-card/productCard.container";

import { ProductContext } from "../../context/products.context";
import './shop.style.scss'

const Shop = () => {
    const {products}=useContext(ProductContext);
  return (
    <div className="products-container">
        {products.map((product)=>(
            <ProductCard key={product.id} product={product}/>
        ))}
    </div>
  )
}

export default Shop;