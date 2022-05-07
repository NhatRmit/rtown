import React from "react";
import Layout from "../../components/Layout";
// import Filter from '../components/Filter/Filter'
import Admin from "../../components/Admin/Admin";
import "./ProfilePage.css"

const AdminProfilePage = () => {
  return (
    <>
      <Layout header footer>
        <div className='admin-container'>
         <Admin/>
        </div>
      </Layout>
    </>
  );
};

export default AdminProfilePage;
