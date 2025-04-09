import { MyRoutes } from "./routes";
import { GlobalContainer } from "./global";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <GlobalContainer>
      <MyRoutes />
      <ToastContainer  theme="colored" position="top-center" />
    </GlobalContainer>
  );
}

export default App;
