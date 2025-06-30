import  Header  from '@/client/components/Header.jsx'
import { Footer } from '@/client/components/Footer.jsx'
import { Outlet } from 'react-router-dom'

const ClientLayout = () => {
    return(
        <>
        <Header/>
        <main className="container mx-auto px-4 bg-background">
            <Outlet/>
        </main>
        <Footer/>
        </>
    )
}

export default ClientLayout;