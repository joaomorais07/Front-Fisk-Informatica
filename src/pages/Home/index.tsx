import { useState } from "react";
import { useLocation } from "react-router-dom";

import { HomePageContainer } from "./style";

import { useAuth } from "../../contexts/Auth";
import BottomNav from "../../components/BottomNav";
import Header from "../../components/Header";

function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const user = useAuth().user;
  const userLoading = useAuth().userLoading;

  const location = useLocation();

  return (
    <>
      <Header />
      <HomePageContainer>
        <h1>Olá</h1>
      </HomePageContainer>
      <BottomNav />
    </>
  );
}

export default HomePage;
