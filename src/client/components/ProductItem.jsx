import { Link } from "react-router-dom";

const ProductItem = ({ product }) => {
  return (
    <>
      <div
        key={product.id}
        className="aspect-square w-full p-7 rounded-lg object-cover group-hover:opacity-75 xl:aspect-7/8 transition-transform duration-200 hover:scale-105 hover:shadow-lg"
      >
        
        <Link to={`/product/${product.id}`}>
          <div className="flex min-h-[272px]">
            <img
              key={product.id}
              className="w-auto max-h-[272px] object-cover m-auto px-1 transition-transform duration-200 hover:scale-105"
              src={
                product.images && product.images[0]
                  ? product.images[0].image_url
                  : "/1.svg"
              }
              loading="lazy"
            />
          </div>

          <div className="pt-3 flex items-center justify-between">
            <p className="">{product.brand + product.name} </p>
            <svg
              className="h-6 w-6 fill-current text-gray-500 hover:text-black"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M12,4.595c-1.104-1.006-2.512-1.558-3.996-1.558c-1.578,0-3.072,0.623-4.213,1.758c-2.353,2.363-2.352,6.059,0.002,8.412 l7.332,7.332c0.17,0.299,0.498,0.492,0.875,0.492c0.322,0,0.609-0.163,0.792-0.409l7.415-7.415 c2.354-2.354,2.354-6.049-0.002-8.416c-1.137-1.131-2.631-1.754-4.209-1.754C14.513,3.037,13.104,3.589,12,4.595z M18.791,6.205 c1.563,1.571,1.564,4.025,0.002,5.588L12,18.586l-6.793-6.793C3.645,10.23,3.646,7.776,5.205,6.209 c0.76-0.756,1.754-1.172,2.799-1.172s2.035,0.416,2.789,1.17l0.5,0.5c0.391,0.391,1.023,0.391,1.414,0l0.5-0.5 C14.719,4.698,17.281,4.702,18.791,6.205z" />
            </svg>
          </div>
          <p className="pt-1 text-gray-900">{"$" + product.price}</p>
        </Link>
      </div>
    </>
  );
};

export default ProductItem;
