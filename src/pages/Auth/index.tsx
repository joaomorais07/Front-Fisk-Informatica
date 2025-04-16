import { SignInForm } from "./Forms";
import { AuthPageContainer, DivTopo } from "./style";

type AuthPageProps = {
  page: "sign-in" | "sign-up" | "forgot-password";
};

function AuthPage(props: AuthPageProps) {
  const { page } = props;

  return (
    <AuthPageContainer>
      <DivTopo>
        <a href="/">
          <img src="/Front-Fisk-Informatica/assets/images/Full_Logo.png" alt="Logo" />
        </a>
      </DivTopo>

      {page === "sign-in" && <SignInForm />}
    </AuthPageContainer>
  );
}

export default AuthPage;
