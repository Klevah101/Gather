import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import MainPageContainer from '../components/Mainpage/MainPageContainer.jsx';
import LandingPage from '../components/LandingPage/LandingPage.jsx';
import CreateServerPage from '../components/CreateServerPage/CreateServerPage.jsx';
import FindServerPage from '../components/FindServerPage/FindServerPage.jsx';
import SocketTest from '../components/SocketTest/SocketTest.jsx';


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
        element: <MainPageContainer />
      },
      {
        path: "new/server",
        element: <CreateServerPage />
      },
      {
        path: "discover",
        element: <FindServerPage />
      }, {

        path: "socket",
        element: <SocketTest />
      }
    ],
  },
]);
