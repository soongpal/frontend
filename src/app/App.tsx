import './styles/App.css'
import Footer from '../components/layout/footer/Footer'
import Header from '../components/layout/header/Header'
import Home from '../pages/HomePage'

const App : React.FC = () =>{

  return(
    <div className='App'>
      <Header></Header>
      <Home></Home>
      <Footer></Footer>
    </div>
  );
}

export default App;
