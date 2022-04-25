import LoginPage from "./pages/auth/LoginPage";
import NewsfeedPage from "./pages/NewsfeedPage";
import AdminProfilePage from "./pages/profile/AdminProfilePage"; 
import UserProfilePage from "./pages/profile/UserProfilePage"; 
import ChatPage from "./pages/ChatPage"; 
import RItemsPage from "./pages/RItemsPage"; 
import RShopPage from "./pages/RShopPage"; 
import AboutUsPage from "./pages/support/AboutUsPage";
import DisclaimerPage from "./pages/legal/DisclaimerPage";
import TosPage from "./pages/legal/TosPage";
import ContentPolicyPage from "./pages/legal/PrivacyPolicyPage";
import PrivacyPolicyPage from "./pages/legal/PrivacyPolicyPage";
import RPointsPolicyPage from "./pages/legal/PrivacyPolicyPage";
import CommunityRequestPage from "./pages/community/CommunityRequestPage";
import CommunityPage from "./pages/community/CommunityPage";

const pages = {
  newsfeed: {
    name: "Newsfeed",
    link: "/",
    component: <NewsfeedPage />,
  },
  communityRequest: {
    name: "Community Request",
    link: "/community-request",
    component: <CommunityRequestPage />,
  },
  CommunityPage: {
    name: "Community",
    link: "/community",
    component: <CommunityPage/>,
  },
  login: {
    name: "Login",
    link: "/login",
    component: <LoginPage />,
  },
  adminProfile: {
    name: "Admin Profile",
    link: "/admin-profile",
    component: <AdminProfilePage />,
  },
  userProfile: {
    name: "User Profile",
    link: "/user-profile:id",
    component: <UserProfilePage />,
  },
  chat: {
    name: "Chat",
    link: "/chat",
    component: <ChatPage />,
  },
  rItems: {
    name: "R-Items",
    link: "/r-items",
    component: <RItemsPage />,
  },
  rShop: {
    name: "R-Shop",
    link: "/r-shop",
    component: <RShopPage />,
  },
  aboutUs: {
    name: "About Us",
    link: "/abotu-us",
    component: <AboutUsPage />,
  },
  disclaimer: {
    name: "Disclaimer",
    link: "/disclaimer",
    component: <DisclaimerPage />,
  },
  contentPolicy: {
    name: "Content Policy",
    link: "/content-policy",
    component: <ContentPolicyPage />,
  },
  privacyPolicy: {
    name: "Privacy Policy",
    link: "/privacy-policy",
    component: <PrivacyPolicyPage />,
  },
  tos: {
    name: "Terms of Service",
    link: "/tos",
    component: <TosPage />,
  },
  rPointsPolicyPage: {
    name: "R-Points Policy",
    link: "/rpoints-policy",
    component: <RPointsPolicyPage />,
  }
};

export const allPages = {
  all: Object.values(pages),
  auth: [pages.login],
  legal: [pages.contentPolicy, pages.privacyPolicy, pages.rPointsPolicy ,pages.tos],
};
