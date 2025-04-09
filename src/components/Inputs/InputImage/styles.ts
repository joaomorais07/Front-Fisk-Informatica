import styled from "styled-components";

export const InputContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  width: 95%;
  border: none;
  margin-top: 10px;

  label{
    font-weight: 500;
    font-size: 15px;
  }
  
  button{
    cursor: pointer;
    outline: none;
    text-decoration: none;
    font-weight: 700;
    font-size: 20px;
    padding: 8px 30px;
    border-radius: 10px;
    background: transparent;
    margin-top: 10px;
  }
`;

export const LabelFloating = styled.label`
  font-weight: 700;
  font-size: 26px;
  margin-bottom: 20px;
`;

export const DivFileUpload = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DivUploadBtn = styled.div`
  display: inline-block;
  overflow: hidden;
  position: relative;
`;

export const SelectFileBtn = styled.button`
  width: 300px;
  border: 2px dashed rgb(130, 87, 230)!important;
  font-size: 19px;
  font-weight: 700;
  color: #000;
  text-align: center;
  padding: 15px 40px;
  cursor: pointer;
`;

export const StyledInputField = styled.input`
  font-size: 18px;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  opacity: 0;
  cursor: pointer;
`;

export const ImgFile = styled.img`
  display: inline-block;
  border: 3px solid rgb(130, 87, 230);
  width: 300px;
  height: 300px;
  border-radius: 10px;
  object-fit: cover;
  object-position: 50% 50%;
  vertical-align: middle;
  margin-top: 10px;
`;