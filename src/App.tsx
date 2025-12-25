import './App.css'
import CountriesList from "./components/CountriesList/CountriesList.tsx";

function App() {
    return (
        <>
            <div className='container-lg mt-5'>
                <div className='row g-0'>
                    <div className='col-md-2' style={{
                        overflowY: 'auto',
                        height: '500px',
                        border: '2px solid gray',
                        padding: '10px',
                    }}><CountriesList/></div>
                    <div className='col-md-4'>fdf</div>
                </div>
            </div>
        </>
    )
}

export default App
