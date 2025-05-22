import { useEffect } from "react";
import { SignInForm, SignInFormAdm } from "./Forms";
import { AuthPageContainer, DivTopo } from "./style";

type AuthPageProps = {
  page: "sign-in" | "sign-in_adm";
};


function AuthPage(props: AuthPageProps) {
  const { page } = props;

  useEffect(() => {
    console.log(page); 
  }, [page]);

  return (
    <AuthPageContainer>
      <DivTopo>
        <a href="/">
          <img src="/Front-Fisk-Informatica/assets/images/Full_Logo.png" alt="Logo" />
        </a>
      </DivTopo>

      {page === "sign-in" && <SignInForm />}
      {page === "sign-in_adm" && <SignInFormAdm />}
    </AuthPageContainer>
  );
}

export default AuthPage;
