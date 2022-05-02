import React from "react";
import Layout from "../components/Layout";
import RItemsSection from "../components/RShop/RItemsSection";
import RPointsSection from "../components/RShop/RPointsSection";

import "./RShopPage.css";
import {useState} from "react";

const RShopPage = () => {
  return (
    <>
      <Layout className='rshop-container' header footer>
        <h1>Welcome to R-Shop!</h1>
        <div className='rshop-wrapper'>
          <RItemsSection />
          <RPointsSection />
        </div>
      </Layout>
    </>
  );
};

export default RShopPage;
