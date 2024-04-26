import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Home from './components/Home/Home';



const routes = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'Login', element: <Login /> },
      { path: 'Register', element: <Register /> },
      // You can add more routes here as needed
    ],
  },
]);

function App() {
  return <RouterProvider router={routes} />;
}

export default App;