import { RouterProvider } from "react-router";

import { router } from "./app.routes.jsx";
import { InterviewProvider } from "./features/interview/Interview.context.jsx";
import { AuthProvider } from "./features/auth/auth.context.jsx";
 import Navbar from "./features/auth/components/Navbar.jsx";
function App() {
   return (
    <>
   
    <AuthProvider>
      <InterviewProvider>
  <RouterProvider router={router} />
      </InterviewProvider>
    </AuthProvider>
     
    </>
  );
}

export default App;
