import { useState, useEffect } from 'react'
import {getProducts } from '@/api/products.js'
import  ProductItem  from '@/client/components/ProductItem.jsx'
import { useParams } from 'react-router-dom'
import { getCategories } from '@/api/categories'


const ProductsPage = () => {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const { id } = useParams()

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts()
                setProducts(data)
            } catch (error) {
                console.error('Error fetching products:', error)
            }
        }
        const fetchCategories = async () => {
            try {
                const data = await getCategories()
                setCategories(data)
            } catch (error) {
                console.error('Error fetching categories:', error)
            }
        }
        fetchProducts()
        fetchCategories()
    }
    , [])

    return (
        <section className="py-8">
            <div className="container mx-auto flex items-center flex-wrap pt-4 pb-12">
                <nav id="store" className="w-full z-30 top-0 px-6 py-1">
                    <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3">
                        <a
                            className="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl"
                            href="#"
                        >
                            Productos
                        </a>
                    </div>
                </nav>

                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {products.map((product) => (
                        <ProductItem key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ProductsPage;
