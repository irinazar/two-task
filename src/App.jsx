import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/Main/MainPage";
import Navbar from "./component/Navbar/Navbar";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import SignInPage from "./pages/SignInPage/SignInPage";
import CartPage from "./pages/CartPage/CartPage";
import PrivateRoute from "./component/hocs/PrivateRoute";
import { userStore } from "./store/user-srore";
import { observer } from "mobx-react-lite";

const App = observer(() => {
  const isUserLoggedIn = !!userStore.user;

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route
          path="/signup"
          element={
            <PrivateRoute isAllowed={!isUserLoggedIn} redirectTo="/">
              <SignUpPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/signin"
          element={
            <PrivateRoute isAllowed={!isUserLoggedIn} redirectTo="/">
              <SignInPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <PrivateRoute isAllowed={isUserLoggedIn} redirectTo="/">
              <CartPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
});

export default App;
