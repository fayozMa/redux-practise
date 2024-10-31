import {useState, useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
function Cart() {
  const [allPrice, setAllPrice] = useState(0);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  console.log(cartItems);
  useEffect(() => {
    const totalPrice = cartItems.reduce(
      (sum, value) => sum + value.count * value.product.attributes.price,
      0
    );
    setAllPrice(totalPrice);
    
  }, [cartItems]);

  const handleRemove = (id, color) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: { id, color } });
  };

  const handleCount = (id, color, count) => {
    dispatch({ type: "CHANGE_COUNT", payload: { id, color, count } });
  };

  return (
    <section className="max-w-[1088px] mx-auto py-20">
      <div className="border-b border-base-300 pb-5">
        <h2 className="text-3xl font-medium tracking-wider capitalize">
          Shopping Cart
        </h2>
      </div>
      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          {cartItems.length > 0 &&
            cartItems.map((value) => (
              <div
                key={value.id + value.color}
                className="mb-12 flex flex-col gap-y-4 sm:flex-row flex-wrap border-b border-base-300 pb-6 last:border-b-0"
              >
                <img
                  className="h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover"
                  src={value.product.attributes.image}
                />
                <div className="sm:ml-16 sm:w-48">
                  <h3 className="capitalize font-medium">
                    {value.product.attributes.title}
                  </h3>
                  <h4 className="mt-2 capitalize text-sm text-neutral-content">
                    {value.product.attributes.company}
                  </h4>
                  <p className="mt-4 text-sm capitalize flex items-center gap-x-2">
                    Color :{" "}
                    <span
                      className="badge badge-sm"
                      style={{ backgroundColor: value.color }}
                    ></span>
                  </p>
                </div>
                <div className="sm:ml-12">
                  <div className="form-control max-w-xs">
                    <label htmlFor="amount" className="label p-0">
                      <span className="label-text">Amount</span>
                    </label>
                    <select
                      className="mt-2 select select-base select-bordered select-xs"
                      name="amount"
                      id="amount"
                      onChange={(e) =>
                        handleCount(value.id, value.color, e.target.value)
                      }
                      value={value.count}
                    >
                      {[...Array(6).keys()].map((i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    onClick={() => handleRemove(value.id, value.color)}
                    className="mt-2 link link-primary link-hover text-sm"
                  >
                    remove
                  </button>
                </div>
                <p className="font-medium sm:ml-auto">
                  ${value.product.attributes.price}
                </p>
              </div>
            ))}
        </div>
        <div className="lg:col-span-4 lg:pl-4">
          <div className="card bg-base-200">
            <div className="card-body">
              <p className="flex justify-between text-xs border-b border-base-300 pb-2">
                <span>Subtotal</span>
                <span className="font-medium">${allPrice}</span>
              </p>
              <p className="flex justify-between text-xs border-b border-base-300 pb-2">
                <span>Shipping</span>
                <span className="font-medium">$5.00</span>
              </p>
              <p className="flex justify-between text-xs border-b border-base-300 pb-2">
                <span>Tax</span>
                <span className="font-medium">${allPrice/100*10}</span>
              </p>
              <p className="flex justify-between text-sm mt-4 pb-2">
                <span>Order Total</span>
                <span className="font-medium">
                  ${allPrice + (allPrice / 100 * 10)}
                </span>
              </p>
            </div>
          </div>
          <button
            className="btn btn-primary btn-block mt-8 uppercase"
          >
            proceed to checkout
          </button>
        </div>
      </div>
    </section>
  );
}

export default Cart;
