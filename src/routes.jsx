import App from './App'
import Editdetails from "./pages/Editdetails";
import Header from './pages/Home';

const routes=[
  
        {
            path:"/",
            element:<App/>,
        },

        
         {
            path:"edit/:_id",
            element:<Editdetails/>,
        },
        {
            path:"home",
            element:<Header/>,
        }
            
       
 
]

export default routes;