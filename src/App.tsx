import '@/App.css'
import { Header } from '@/components/header/Header'
import Form from '@/components/form/Form'
import Footer from '@/components/footer/Footer'

function App() {
    return (
        <>
            <main className="center-page">
                <Header />
                <Form />
                <Footer />
            </main>
        </>
    )
}

export default App
