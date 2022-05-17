import LoginPage from "./pages/auth/LoginPage";
import NewsfeedPage from "./pages/NewsfeedPage";
import DisclaimerPage from "./pages/legal/DisclaimerPage";
import TosPage from "./pages/legal/TosPage";
import ContentPolicyPage from "./pages/legal/PrivacyPolicyPage";
import PrivacyPolicyPage from "./pages/legal/PrivacyPolicyPage";
import RPointsPolicyPage from "./pages/legal/PrivacyPolicyPage";
import CommunityRequestPage from "./pages/community/CommunityRequestPage";
import CommunityPage from "./pages/community/CommunityPage"
import RShopPage from "./pages/RShopPage"
import AdminProfilePage from "./pages/profile/AdminProfilePage"

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
  login: {
    name: "Login",
    link: "/login",
    component: <LoginPage />,
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
  },
  communityPage: {
    name: "Community Page",
    link:"/community",
    component: <CommunityPage />
  },
  RShopPage: {
    name: "R-Shop Page",
    link: "/rshop",
    component: <RShopPage/>
  },
  AdminProfilePage: {
    name: "Admin Profile Page",
    link: "/admin-profile",
    component: <AdminProfilePage/>
  }
};

export const allPages = {
  all: Object.values(pages),
  auth: [pages.login],
  legal: [pages.contentPolicy, pages.privacyPolicy, pages.rPointsPolicy ,pages.tos],
};
