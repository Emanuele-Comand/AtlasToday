import { Outlet } from "react-router-dom";
import Home from "./pages/Home";
import { CategoryProvider } from "./context/CategoryContext";

function App() {
  return (
    <CategoryProvider>
      <Home />
    </CategoryProvider>
  );
}

export default App;
