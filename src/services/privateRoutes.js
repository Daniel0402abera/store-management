import { Navigate, Outlet } from 'react-router-dom'

function PrivateRoutes() {

   const user = localStorage.getItem('user')
  //  console.log(role,user)
  //  console.log(typeof(role))
  //  const x =  role.toString()
  //  console.log(x)
  //  console.log(x.localeCompare("Companyadmin"))
  //  console.log((user !== null) && (role == "Companyadmin"))
   
   return user !== null  ? (
     <Outlet />
   ) : (
     <Navigate to="/" />
   );
}
export default PrivateRoutes;