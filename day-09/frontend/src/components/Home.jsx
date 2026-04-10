import { Plus } from 'lucide-react';
import './home.css'


const Home = () => {
    return (
        <div className='home-wrapper'>
            <h1>Home Page</h1>
            <div className='create-new-btn'>
                <button><Plus /></button>
            </div>
        </div>
    )
}

export default Home
