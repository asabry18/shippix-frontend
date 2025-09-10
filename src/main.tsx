import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomerNavbar from './components/Navbar';
import TrackYourOrder from './pages/trackYourOrder/TrackYourOrder';

ReactDOM.createRoot(document.getElementById('root')!).render(
 <>
    <CustomerNavbar />
    <TrackYourOrder />
 </>
)
