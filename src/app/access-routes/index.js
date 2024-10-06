import { Navigate, useNavigate } from 'react-router-dom';

export const PrivateRoute = ({children }) => {
  const token = localStorage.getItem('token')
  return token ? children : <Navigate to="/login" />;
};

export const PublicRoute = ({children }) => {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  return token ? navigate(-1) || <Navigate to="/profile" />: children;
};