import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
function Products() {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("https://strapi-store-server.onrender.com/api/products/")
      .then((res) => res.json())
      .then((products) => setProducts(products.data));
  }, []);
  return (
    <div className="flex flex-col items-center">
      <h1>{t("note")}</h1>
      <ul className="flex gap-5 mt-10 flex-wrap">
        {products.length > 0 &&
          products.map((product) => {
            return (
              <Link
                to={`/products/${product.id}`}
                className="card w-96 shadow-xl hover:shadow-2xl transition duration-300"
                key={product.id}
                onClick={() => handleRedirect(product.id)}
              >
                <img
                  src={product.attributes.image}
                  className="rounded-xl h-64 md:h-48 w-full object-cover"
                />
                <div className="card-body items-center text-center">
                  <h3 className="card-title capitalize tracking-wider">
                    {product.attributes.title}
                  </h3>
                  <p className="text-secondary">${product.attributes.price}</p>
                </div>
              </Link>
            );
          })}
      </ul>
    </div>
  );
}

export default Products;
