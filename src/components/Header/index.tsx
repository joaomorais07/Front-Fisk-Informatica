import { HeaderContainer, HeaderLogo, MenuSuspenso, NavHeader, Section, SectionMobile } from "./style";
import { LiaUserEditSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import { FaUserCog } from "react-icons/fa";
import { MdOutlineExitToApp } from "react-icons/md";
import { useEffect, useRef, useState } from "react";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLUListElement | null>(null); // Ref para o menu suspenso
  const buttonRef = useRef<HTMLDivElement | null>(null); // Ref para o div do botão

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  // Fechar o menu ao clicar fora
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
          <div>
            <p>Home</p>
          </div>
          <div>
            <p>Boletim</p>
          </div>

          <div>
            <p>Faturas</p>
          </div>

          <div onClick={toggleMenu} ref={buttonRef}>
            <img src="/Front-Fisk-Informatica/assets/images/Foto_Perfil.png" alt="profile" />

            {isMenuOpen && (
              <MenuSuspenso ref={menuRef}>
                <li>
                  <LiaUserEditSolid size={20} />
                  <span>Meus Dados</span>
                </li>
                <li>
                  <Link to="/aluno">
                    <FaUserCog size={20} />
                    <span>Gerenciar Alunos</span>
                  </Link>
                </li>
                <li>
                  <Link to="/funcionario">
                    <FaUserCog size={20} />
                    <span>Gerenciar Funcionarios</span>
                  </Link>
                </li>
                <li>
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
