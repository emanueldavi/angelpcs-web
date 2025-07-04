import ProductItem from "../components/ProductItem.jsx";
import { getProducts } from "@/api/products.js";
import { useState, useEffect } from "react";
import { HiOutlineArrowRight } from "react-icons/hi";
import { Link } from 'react-router-dom'

// This component renders a section of products, specifically laptops, with a navigation bar and product items.

const PrincipalPage = () => {
  const [products, setProducts] = useState([]);
  const maxPerPage = 8;
  const visibleProducts = products.slice(0, maxPerPage);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);
  return (
    <>
      <section className=" py-5">
        <div className="container mx-auto flex items-center flex-wrap pt-4 pb-5 border-y border-clientSecondary">
          <nav id="store" className="w-full z-30 top-0 px-6 py-1">
            <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3">
              <a
                className="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl "
                href="#"
              >
                Laptops
              </a>

              <div className="flex items-center" id="store-nav-content">
                <a
                  className="pl-3 inline-block no-underline hover:text-black"
                  href="#"
                >
                  <svg
                    className="fill-current hover:text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7 11H17V13H7zM4 7H20V9H4zM10 15H14V17H10z" />
                  </svg>
                </a>

                <a
                  className="pl-3 inline-block no-underline hover:text-black"
                  href="#"
                >
                  <svg
                    className="fill-current hover:text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M10,18c1.846,0,3.543-0.635,4.897-1.688l4.396,4.396l1.414-1.414l-4.396-4.396C17.365,13.543,18,11.846,18,10 c0-4.411-3.589-8-8-8s-8,3.589-8,8S5.589,18,10,18z M10,4c3.309,0,6,2.691,6,6s-2.691,6-6,6s-6-2.691-6-6S6.691,4,10,4z" />
                  </svg>
                </a>
              </div>
            </div>
          </nav>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {visibleProducts.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}

          </div>
          <div className="w-full flex justify-end mt-8">
              <Link
                to="/categoria/laptops"
                className="px-6 py-2 gap-2 text-clientSecondary rounded hover:bg-clientPrimary-dark transition flex items-center"
              >
                Ver todos  <HiOutlineArrowRight />
              </Link>
            </div>
        </div>
      </section>
    </>
  );
};

export default PrincipalPage;
