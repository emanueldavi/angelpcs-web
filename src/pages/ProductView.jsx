import { LAPTOPS_DATA } from "@/data/data.jsx";
import { useParams } from 'react-router'
import { Link } from "react-router-dom";

export function ProductPage() {

    const { id } = useParams();
    const product = LAPTOPS_DATA[id]
    return(
        <>
        <div>
            <h1>{product.name}</h1>
            <Link to="/">volver</Link>
        </div>
        </>
    )
}