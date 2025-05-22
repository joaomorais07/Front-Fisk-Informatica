import { HeaderContainer, HeaderLogo, MenuSuspenso, NavHeader, Section, SectionMobile } from "./style";
import { LiaUserEditSolid } from "react-icons/lia";
import { Link, useLocation } from "react-router-dom";
import { MdOutlineExitToApp } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../contexts/Auth";
import { fetchUserData } from "../../utils/fetchUserData";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLUListElement | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const { user, alunoSelecionado, signOut } = useAuth();
  const location = useLocation();
  const [profileImage, setProfileImage] = useState("/Front-Fisk-Informatica/assets/profile/default.png");
 
  const tipoUsuario = user?.tipo?.toLowerCase(); // "aluno", "responsavel", "diretor", "professor", "secretario"

  useEffect(() => {
    const getUserData = async () => {
      const fetched = await fetchUserData({
        tipo: tipoUsuario,
        id: user?.dados.id,
        alunoSelecionadoId: alunoSelecionado?.id,
      });

      if (fetched) {
        setProfileImage(fetched.imagemUrl);
      }
    };

    getUserData();
  }, [user?.dados.id, alunoSelecionado?.id]);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isAlunoOuResponsavel = tipoUsuario === "aluno" || tipoUsuario === "responsavel";
  const isFuncionario = tipoUsuario === "diretor" || tipoUsuario === "professor" || tipoUsuario === "secretario";

  return (
    <HeaderContainer>
      <SectionMobile>
        <HeaderLogo to="/">
          <img className="fullLogo" src="/Front-Fisk-Informatica/assets/images/Logo.png" alt="Logo" />
        </HeaderLogo>
      </SectionMobile>

      <Section>
        <HeaderLogo to="/">
          <img className="fullLogo" src="/Front-Fisk-Informatica/assets/images/Logo.png" alt="Logo" />
        </HeaderLogo>

        <NavHeader>
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>
            <p>Home</p>
          </Link>

          {isAlunoOuResponsavel && (
            <>
              <Link to="/boletim" className={location.pathname === "/boletim" ? "active" : ""}>
                <p>Boletim</p>
              </Link>
              <Link to="/faturas" className={location.pathname === "/faturas" ? "active" : ""}>
                <p>Faturas</p>
              </Link>
              <Link to="/frequencia" className={location.pathname === "/frequencia" ? "active" : ""}>
                <p>Frequência</p>
              </Link>
            </>
          )}

          {isFuncionario && (
            <>
              <Link to="/aluno" className={location.pathname === "/aluno" ? "active" : ""}>
                <p>Alunos</p>
              </Link>
              <Link to="/funcionario" className={location.pathname === "/funcionario" ? "active" : ""}>
                <p>Funcionários</p>
              </Link>
              <Link to="/turma" className={location.pathname === "/turma" ? "active" : ""}>
                <p>Turmas</p>
              </Link>
            </>
          )}

          <div onClick={toggleMenu} ref={buttonRef}>
            <img src={profileImage} alt="profile" />

            {isMenuOpen && (
              <MenuSuspenso ref={menuRef}>
                <li>
                  <LiaUserEditSolid size={20} />
                  <span>Meus Dados</span>
                </li>
                <li onClick={signOut}>
                  <MdOutlineExitToApp size={20} />
                  <span>Sair</span>
                </li>
              </MenuSuspenso>
            )}
          </div>
        </NavHeader>
      </Section>
    </HeaderContainer>
  );
}

export default Header;
