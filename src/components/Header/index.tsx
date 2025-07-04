import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { LiaUserEditSolid } from "react-icons/lia";
import { MdOutlineExitToApp } from "react-icons/md";
import { useAuth } from "../../contexts/Auth";
import { fetchUserData } from "../../utils/fetchUserData";
import { IoMenuOutline } from "react-icons/io5";
import {
  HeaderContainer,
  HeaderContent,
  LogoContainer,
  LogoLink,
  LogoImage,
  NavSection,
  NavLink,
  NavList,
  MobileMenuButton,
  MobileNav,
  UserMenuContainer,
  UserMenuButton,
  UserAvatar,
  DropdownMenu,
  DropdownItem,
  MobileNavLink,
  // Adicione estes novos componentes estilizados
  NavItemWithDropdown,
  DropdownContent,
  DropdownLink,
} from "./style";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [profileImage, setProfileImage] = useState("/Front-Fisk-Informatica/assets/profile/default.png");
  const [isAlunoDropdownOpen, setIsAlunoDropdownOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { user, alunoSelecionado, signOut } = useAuth();
  const alunoDropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const userType = user?.tipo?.toLowerCase();
  const isAlunoOrResponsavel = ["aluno", "responsavel"].includes(userType ?? "");
  const isFuncionario = ["diretor", "professor", "secretario"].includes(userType ?? "");

  useEffect(() => {
    const loadUserData = async () => {
      const data = await fetchUserData({
        tipo: userType || "",
        id: user?.dados.id || 0,
        alunoSelecionadoId: alunoSelecionado?.id,
      });
      if (data?.imagemUrl) {
        setProfileImage(data.imagemUrl);
      }
    };

    loadUserData();
  }, [user?.dados.id, alunoSelecionado?.id, userType]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleMobileNav = () => setIsMobileNavOpen(!isMobileNavOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
      if (alunoDropdownRef.current && !alunoDropdownRef.current.contains(event.target as Node)) {
        setIsAlunoDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const studentLinks = [
    { path: "/painel-alunos/boletim", label: "Boletim" },
    { path: "/painel-alunos/fatura", label: "Faturas" },
    { path: "/painel-alunos/frequencia", label: "Frequência" },
  ];

  const staffLinks = [
    {
      path: "/aluno",
      label: "Alunos",
      subItems: [
        { path: "/frequencia", label: "Frequência" },
        { path: "/boletim", label: "Boletim" },
      ],
    },
    { path: "/faturas", label: "Faturas" },
    { path: "/funcionario", label: "Funcionários" },
    { path: "/materia", label: "Matérias" },
    { path: "/turma", label: "Turmas" },
  ];

  return (
    <HeaderContainer>
      <HeaderContent>
        <MobileMenuButton onClick={toggleMobileNav}>
          <IoMenuOutline />
        </MobileMenuButton>

        <LogoContainer>
          <LogoLink to="/">
            <LogoImage src="/Front-Fisk-Informatica/assets/images/Logo.png" alt="Logo" />
          </LogoLink>
        </LogoContainer>

        <NavSection>
          <NavList>
            <NavLink to="/" $isActive={location.pathname === "/"} $userType={userType}>
              Home
            </NavLink>

            {isAlunoOrResponsavel &&
              studentLinks.map((link) => (
                <NavLink key={link.path} to={link.path} $isActive={location.pathname === link.path} $userType={userType}>
                  {link.label}
                </NavLink>
              ))}

            {isFuncionario &&
              staffLinks.map((link) => {
                if (link.subItems) {
                  return (
                    <NavItemWithDropdown
                      key={link.path}
                      ref={alunoDropdownRef}
                      onMouseEnter={() => setIsAlunoDropdownOpen(true)}
                      onMouseLeave={() => setIsAlunoDropdownOpen(false)}
                    >
                      <NavLink to={link.path} $isActive={location.pathname === link.path} $userType={userType}>
                        {link.label}
                      </NavLink>
                      {isAlunoDropdownOpen && (
                        <DropdownContent>
                          {link.subItems.map((subItem) => (
                            <DropdownLink key={subItem.path} to={subItem.path} $isActive={location.pathname === subItem.path}>
                              {subItem.label}
                            </DropdownLink>
                          ))}
                        </DropdownContent>
                      )}
                    </NavItemWithDropdown>
                  );
                }
                return (
                  <NavLink key={link.path} to={link.path} $isActive={location.pathname === link.path} $userType={userType}>
                    {link.label}
                  </NavLink>
                );
              })}
          </NavList>
        </NavSection>

        <UserMenuContainer>
          <UserMenuButton ref={menuRef} onClick={toggleMenu}>
            <UserAvatar src={profileImage} alt="Profile" $userType={userType} />
            {isMenuOpen && (
              <DropdownMenu>
                <DropdownItem>
                  <LiaUserEditSolid size={20} />
                  <span>Meus Dados</span>
                </DropdownItem>
                <DropdownItem onClick={signOut}>
                  <MdOutlineExitToApp size={20} />
                  <span>Sair</span>
                </DropdownItem>
              </DropdownMenu>
            )}
          </UserMenuButton>
        </UserMenuContainer>

        {isMobileNavOpen && (
          <MobileNav>
            <MobileNavLink to="/" $isActive={location.pathname === "/"} $userType={userType}>
              Home
            </MobileNavLink>

            {isAlunoOrResponsavel &&
              studentLinks.map((link) => (
                <MobileNavLink key={link.path} to={link.path} $isActive={location.pathname === link.path} $userType={userType}>
                  {link.label}
                </MobileNavLink>
              ))}

            {isFuncionario &&
              staffLinks
                .flatMap((link) => (link.subItems ? [{ path: link.path, label: link.label }, ...link.subItems] : [link]))
                .map((item) => (
                  <MobileNavLink key={item.path} to={item.path} $isActive={location.pathname === item.path} $userType={userType}>
                    {item.label}
                  </MobileNavLink>
                ))}
          </MobileNav>
        )}
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
