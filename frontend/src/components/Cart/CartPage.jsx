import React from "react";
import { useCart } from "../../contexts/CartContext.jsx";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";

export default function CartPage() {
  const { cart, total, removeFromCart, clearCart } = useCart();

  return (
    <section className="min-h-screen bg-gradient-to-b from-black via-blue-950 to-black text-white pt-28 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-blue-400">Tu carrito</h1>

        {cart.length === 0 ? (
          <div className="text-center mt-16">
            <p className="text-gray-400 text-lg mb-4">Tu carrito está vacío.</p>
            <Link
              to="/product"
              className="inline-block bg-blue-500 hover:bg-blue-600 transition text-white px-6 py-3 rounded-full font-medium"
            >
              Ver colección
            </Link>
          </div>
        ) : (
          <div className="bg-black/40 rounded-2xl shadow-lg p-6 backdrop-blur-sm">
            {/* Lista de productos */}
            <ul className="divide-y divide-blue-800/40">
              {cart.map((item, index) => (
                <li key={index} className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image || "https://via.placeholder.com/80x80?text=NFT"}
                      alt={item.name}
                      className="w-16 h-16 rounded-md object-cover border border-blue-700/50"
                    />
                    <div>
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="text-sm text-gray-400">${item.price.toFixed(2)}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(index)}
                    className="text-red-500 hover:text-red-400 transition"
                    aria-label="Eliminar del carrito"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </li>
              ))}
            </ul>

            {/* Total y acciones */}
            <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
              <h2 className="text-2xl font-semibold text-blue-300">
                Total: ${total.toFixed(2)}
              </h2>

              <div className="flex gap-4">
                <button
                  onClick={clearCart}
                  className="bg-red-600 hover:bg-red-700 transition text-white px-5 py-2 rounded-full"
                >
                  Vaciar carrito
                </button>

                <Link
                  to="/checkout"
                  className="bg-blue-500 hover:bg-blue-600 transition text-white px-6 py-2 rounded-full font-semibold"
                >
                  Ir a pagar
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
