import { Outlet, BrowserRouter, Routes, Route } from 'react-router-dom';
import { Main } from './pages/main';
import { AccountRoutes } from './routes';
import { AuthProvider } from './data';
import { Header, Footer } from './components/commens';
import './App.css';

const Layout = () => {
  return(
    <div id='wrapper'>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
};

const App = () => {
  
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Main />} />
            <Route path='/account/*' element={<AccountRoutes />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
