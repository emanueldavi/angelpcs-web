import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { HiStar } from "react-icons/hi2";

import { getProductById } from "@/api/products";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ProductPage = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const getLink = (laptop) => {
    const domain = "https://api.whatsapp.com/send?";
    const phone = "phone=584121236079&";
    const text = `text=%C2%A1Hola!%20Estoy%20interesad%40%20en%20la%20laptop%20${laptop}%2C%20%C2%BFMe%20podr%C3%ADas%20dar%20informaci%C3%B3n%20acerca%20de%20ella%3F`;
    return `${domain}${phone}${text}`;
  };
  const reviews = { href: "#", average: 4, totalCount: 117 };
  // const product = {
  //   name: "Basic Tee 6-Pack",
  //   price: "$192",
  //   href: "#",
  //   breadcrumbs: [
  //     { id: 1, name: "Men", href: "#" },
  //     { id: 2, name: "Clothing", href: "#" },
  //   ],
  //   images: [
  //     {
  //       src: "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
  //       alt: "Two each of gray, white, and black shirts laying flat.",
  //     },
  //     {
  //       src: "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
  //       alt: "Model wearing plain black basic tee.",
  //     },
  //     {
  //       src: "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg",
  //       alt: "Model wearing plain gray basic tee.",
  //     },
  //     {
  //       src: "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-featured-product-shot.jpg",
  //       alt: "Model wearing plain white basic tee.",
  //     },
  //   ],
  //   colors: [
  //     {
  //       id: "white",
  //       name: "White",
  //       classes: "bg-white checked:outline-gray-400",
  //     },
  //     {
  //       id: "gray",
  //       name: "Gray",
  //       classes: "bg-gray-200 checked:outline-gray-400",
  //     },
  //     {
  //       id: "black",
  //       name: "Black",
  //       classes: "bg-gray-900 checked:outline-gray-900",
  //     },
  //   ],
  //   sizes: [
  //     { name: "XXS", inStock: false },
  //     { name: "XS", inStock: true },
  //     { name: "S", inStock: true },
  //     { name: "M", inStock: true },
  //     { name: "L", inStock: true },
  //     { name: "XL", inStock: true },
  //     { name: "2XL", inStock: true },
  //     { name: "3XL", inStock: true },
  //   ],
  //   description:
  //     'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  //   highlights: [
  //     "Hand cut and sewn locally",
  //     "Dyed with our proprietary colors",
  //     "Pre-washed & pre-shrunk",
  //     "Ultra-soft 100% cotton",
  //   ],
  //   details:
  //     'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
  // };
  useEffect(() => {
    getProductById(id)
      .then((data) => {
        const prod = Array.isArray(data) ? data[0] : data;
        // Si specifications es string, parsea a array
        if (prod && typeof prod.specifications === "string") {
          try {
            prod.specifications = JSON.parse(prod.specifications);
          } catch {
            prod.specifications = [];
          }
        }
        setProduct(prod);
      })
      .catch(() => {
        setProduct(null);
      });
  }, [id]);
  if (!product) {
    return <div className="p-8 text-center">Cargando producto...</div>;
  }

  return (
    <>
      <div className="bg-white min-h-screen">
        <div className="container mx-auto px-2 py-8 flex flex-col items-center">
          <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-10 bg-white rounded-lg shadow lg:p-10 p-2">
            {/* Columna izquierda: imágenes + info extendida */}
            <div className="w-full lg:w-[55%] flex flex-col gap-6 min-w-[350px]">
              {/* Galería de imágenes */}
              <div className="rounded border border-gray-200 flex justify-center items-center bg-gray-50 w-full">
                <img
                  alt={product.images[0]?.alt || product.name}
                  className="object-contain max-h-[500px] max-w-full"
                  src={
                    product.images && product.images.length > 0
                      ? product.images[0].image_url || product.images[0].src
                      : "/1.svg"
                  }
                />
              </div>
              {/* Miniaturas */}
              <div className="flex gap-2 mt-2">
                {product.images &&
                  product.images.slice(1).map((img, idx) => (
                    <img
                      key={idx}
                      src={img.image_url || img.src}
                      alt={img.alt || product.name}
                      className="h-16 w-16 object-cover rounded border border-gray-200"
                    />
                  ))}
              </div>
              {/* Descripción y detalles debajo de las imágenes */}
              <div className="mt-6">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Descripción
                  </h3>
                  <p className="text-base text-gray-700">{product.description}</p>
                </div>
                {product.highlights && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Highlights
                    </h3>
                    <ul className="list-disc space-y-2 pl-4 text-sm">
                      {product.highlights.map((highlight) => (
                        <li key={highlight} className="text-gray-600">
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {product.details && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Detalles
                    </h3>
                    <p className="text-base text-gray-700">{product.details}</p>
                  </div>
                )}
                {product.specifications && typeof product.specifications === "object" && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Características
                    </h3>
                    <ul className="divide-y divide-gray-300 border border-gray-300 rounded overflow-hidden">
                      {(Array.isArray(product.specifications)
                        ? product.specifications
                        : Object.entries(product.specifications).map(([key, value]) => ({
                            key,
                            value,
                          }))
                      ).map((spec, idx) => (
                        <li
                          key={spec.key || idx}
                          className={classNames(
                            idx % 2 === 0
                              ? "bg-gray-50"
                              : "bg-gray-200",
                            "flex justify-between px-4 py-2"
                          )}
                        >
                          <span className="font-medium text-gray-700">{spec.key}</span>
                          <span className="text-gray-900">{spec.value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Columna derecha: info principal */}
            <div className="w-full lg:w-[45%] flex flex-col gap-4">
              {/* Breadcrumb */}
              <nav aria-label="Breadcrumb">
                <ol className="flex items-center space-x-2 mb-2">
                  {product.breadcrumbs?.map((breadcrumb) => (
                    <li key={breadcrumb.id} className="flex items-center">
                      <a
                        href={breadcrumb.href}
                        className="text-sm font-medium text-gray-900"
                      >
                        {breadcrumb.name}
                      </a>
                      <span className="mx-2 text-gray-400">/</span>
                    </li>
                  ))}
                  <li className="text-sm text-gray-500">{product.name}</li>
                </ol>
              </nav>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.name || product.model}
              </h1>
              <h2 className="text-lg text-gray-500">{product.brand}</h2>
              <p className="text-2xl font-semibold text-clientPrimary mb-4">
                {product.price}
              </p>
              {/* Reviews */}
              <div className="flex items-center mb-2">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <HiStar
                    key={rating}
                    aria-hidden="true"
                    className={classNames(
                      reviews.average > rating
                        ? "text-yellow-400"
                        : "text-gray-200",
                      "size-5 shrink-0"
                    )}
                  />
                ))}
                <a
                  href={reviews.href}
                  className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  {reviews.totalCount} reviews
                </a>
              </div>
              {/* Colores */}
              {product.colors && (
                <div className="mb-2">
                  <span className="font-semibold text-gray-700 mr-2">
                    Colores:
                  </span>
                  <div className="flex gap-2 mt-1">
                    {product.colors.map((color) => (
                      <span
                        key={color.id}
                        className={`inline-block w-6 h-6 rounded-full border-2 border-gray-300 ${color.classes}`}
                        title={color.name}
                      ></span>
                    ))}
                  </div>
                </div>
              )}
              {/* Tallas */}
              {product.sizes && (
                <div className="mb-2">
                  <span className="font-semibold text-gray-700 mr-2">Tallas:</span>
                  <div className="flex gap-2 mt-1">
                    {product.sizes.map((size) => (
                      <span
                        key={size.name}
                        className={`px-2 py-1 rounded border text-sm ${
                          size.inStock
                            ? "bg-gray-100 text-gray-900 border-gray-300"
                            : "bg-gray-200 text-gray-400 border-gray-200 line-through"
                        }`}
                      >
                        {size.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {/* Botón de WhatsApp */}
              <div className="flex gap-4 mt-4">
                <a
                  href={getLink(
                    (product.brand || "") + " " + (product.model || product.name)
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2 bg-green-700 text-white rounded hover:bg-green-800 transition"
                >
                  Ordenar en WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
