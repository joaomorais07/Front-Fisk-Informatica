// import { useState, useRef, useEffect } from "react";
// import { BottomNavContainer, Section, MenuSuspenso } from "./style";
// import { FaFileInvoiceDollar } from "react-icons/fa6";
// import { IoDocumentText } from "react-icons/io5";
// import { LiaUserEditSolid } from "react-icons/lia";
// import { MdOutlineExitToApp } from "react-icons/md";
// import { FaUserCog } from "react-icons/fa";
// import { Link } from "react-router-dom";

// function BottomNav() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const menuRef = useRef<HTMLUListElement | null>(null); // Ref para o menu suspenso
//   const buttonRef = useRef<HTMLDivElement | null>(null); // Ref para o div do botão

//   const toggleMenu = () => {
//     setIsMenuOpen((prevState) => !prevState);
//   };

//   // Fechar o menu ao clicar fora
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         menuRef.current &&
//         !menuRef.current.contains(event.target as Node) &&
//         buttonRef.current &&
//         !buttonRef.current.contains(event.target as Node)
//       ) {
//         setIsMenuOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <BottomNavContainer>
//       <Section>
//         <div>
//           <IoDocumentText size={35} />
//           <p>Boletim</p>
//         </div>

//         <div>
//           <FaFileInvoiceDollar size={35} />
//           <p>Faturas</p>
//         </div>

//         <div onClick={toggleMenu} ref={buttonRef}>
//           <img src="/Front-Fisk-Informatica/assets/images/Foto_Perfil.png" alt="profile" />
//           <p>Você</p>

//           {isMenuOpen && (
//             <MenuSuspenso ref={menuRef}>
//               <li>
//                 <LiaUserEditSolid size={20} />
//                 <span>Meus Dados</span>
//               </li>
//               <li>
//                 <Link to="/aluno">
//                   <FaUserCog size={20} />
//                   <span>Gerenciar Alunos</span>
//                 </Link>
//               </li>
//               <li>
//                 <MdOutlineExitToApp size={20} />
//                 <span>Sair</span>
//               </li>
//             </MenuSuspenso>
//           )}
//         </div>
//       </Section>
//     </BottomNavContainer>
//   );
// }

// export default BottomNav;
