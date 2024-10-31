import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function Details() {
  const [product, setProduct] = useState([]);
  const [color, setColor] = useState("");
  const [count, setCount] = useState(1);
  const state = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    fetch(`https://strapi-store-server.onrender.com/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleAddToCart = () => {
    const data = {
      id: product.id,
      color: color,
      count: count,
      product: product,
    };
    dispatch({ type: "ADD_TO_CART", payload: data });
  };

  return (
    <section className="max-w-[1088px] mx-auto py-20">
      {product.id && (
        <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16">
          <img
            className="w-96 h-96 object-cover rounded-lg lg:w-full"
            src={product.attributes.image}
          />
          <div>
            <h1 className="capitalize text-3xl font-bold">
              {product.attributes.title}
            </h1>
            <h4 className="text-xl text-neutral-content font-bold mt-2">
              {product.attributes.company}
            </h4>
            <p className="mt-3 text-xl">${product.attributes.price}</p>
            <p className="mt-6 leading-8">{product.attributes.description}</p>
            <div className="mt-6">
              <h4 className="text-md font-medium tracking-wider capitalize">
                colors
              </h4>
              {product.attributes.colors.length > 0 &&
                product.attributes.colors.map((colorProduct) => {
                  return (
                    <span
                      key={colorProduct}
                      onClick={() => setColor(colorProduct)}
                      style={{
                        backgroundColor: colorProduct,
                        border: color === colorProduct ? "2px solid black" : "none",
                      }}
                      className="badge w-6 h-6 mr-2 border-2 border-secondary cursor-pointer mt-2"
                    ></span>
                  );
                })}
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label" htmlFor="amount">
                <h4 className="text-md font-medium -tracking-wider capitalize">
                  Amount
                </h4>
              </label>
              <select
                className="select select-secondary select-bordered select-md"
                value={count}
                id="amount"
                onChange={(e) => {
                  setCount(e.target.value);
                }}
              >
                {[...Array(6)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
            </div>
            <button
              onClick={handleAddToCart}
              className="btn btn-secondary btn-md mt-10"
            >
              ADD TO BAG
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default Details;
