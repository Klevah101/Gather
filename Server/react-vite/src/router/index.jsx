import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import ServerNavBar from '../components/ServerNavBar/ServerNavBar.jsx'
import ChannelNavBar from '../components/ChannelNavBar/ChannelNavBar.jsx';
import Layout from './Layout';
import ChannelContent from '../components/ChannelContent/ChannelContent.jsx';
import MemberSection from '../components/MemberSection/MemberSection.jsx';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <h1>Welcome!</h1>,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "serverbar",
        element:
          < div className="page-layout">
            <ServerNavBar />
            <ChannelNavBar />
            <ChannelContent />
            <MemberSection />
          </div>
      },
    ],
  },
]);
