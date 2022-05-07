import React, { useEffect } from "react";
import Layout from "../components/Layout";
import RPointsSection from "../components/RShop/RPointsSection";

import "./RShopPage.css";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../actions/profile";
import { getItems } from "../actions/item";
import RItem from '../components/RShop/RItem'

const RShopPage = () => {
  const dispatch = useDispatch()
  const profile = useSelector(state => state.profile.profile)
  const items = useSelector(state => state.item.items)

  useEffect(() => {
    dispatch(getProfile())
    dispatch(getItems())
  }, [dispatch])

  return (
    <>
      <Layout className='rshop-container' header footer>
        <h1>Welcome to R-Shop!</h1>
        <div className="rItems-section">
          <div className='rshop-wrapper'>
            <div className="tabs-container">
              {
                items && items.map(
                  item =>
                    <div key={item._id} className="content-tabs">
                      <RItem item={item} isMyItem={false}/>
                    </div>
                )
              }
            </div>
          </div>

          <RPointsSection Rpoint={profile && profile.Rpoint} />
        </div>
      </Layout>
    </>
  );
};

export default RShopPage;
