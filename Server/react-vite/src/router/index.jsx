import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import MainPage from '../components/Mainpage/MainPage.jsx';
import LandingPage from '../components/LandingPage/LandingPage.jsx';
import CreateServerPage from '../components/CreateServerPage/CreateServerPage.jsx';
import FindServerPage from '../components/FindServerPage/FindServerPage.jsx';


export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        // path: "/",
        // element: <h1>Welcome!</h1>,
        path: "/",
        element: <LandingPage />
      },
      // {
      //   path: "login",
      //   element: <LoginFormPage />,
      // },
      // {
      //   path: "signup",
      //   element: <SignupFormPage />,
      // },
      {
        path: "main",
        element: <MainPage />
      },
      {
        path: "new/server",
        element: <CreateServerPage />
      },
      {
        path: "discover",
        element: <FindServerPage />
      }
    ],
  },
]);
