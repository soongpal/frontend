import './styles/App.css'
import Footer from '../widgets/footer/Footer'
import Header from '../widgets/header/Header'
import Home from '../pages/Home'

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
