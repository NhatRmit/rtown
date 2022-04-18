import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Spinner from './components/Layout/Spinner';

const PrivateRoute = ({ element: Element}) => {
    const loading = useSelector(state => state.auth.loading)
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

    if (loading) return <Spinner />;
    if (isAuthenticated) return <Element />;

    return <Navigate to="/login" />;
};

export default PrivateRoute;