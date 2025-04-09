import React, { useState, useEffect } from "react";
import { useController, Control, FieldValues, Path, PathValue } from "react-hook-form";
import { toast } from "react-toastify";
import { InputContainer, DivFileUpload, DivUploadBtn, SelectFileBtn, ImgFile, StyledInputField } from "./styles";

interface InputImageProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  defaultValue?: PathValue<T, Path<T>>;
  value?: string; // Adicionando a prop value
}

const InputImage = <T extends FieldValues>({ name, control, defaultValue, value: propValue }: InputImageProps<T>) => {
  const {
    field: { onChange, value: fieldValue },
  } = useController({ name, control, defaultValue });

  const value = propValue || fieldValue; // Usando propValue se fornecido, caso contrário, use fieldValue

  const [fileSrc, setFileSrc] = useState<string | undefined>((value as string) || (defaultValue as string));
  const [fileName, setFileName] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (value && !value.startsWith("data:")) {
      setFileSrc(`data:image/jpeg;base64,${value}`);
    } else if (value) {
      setFileSrc(value);
    }
  }, [value]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Por favor, selecione um arquivo de imagem.");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error("O arquivo deve ter menos de 5MB.");
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        if (typeof result === "string") {
          const base64String = result.split(",")[1];
          setFileSrc(result);
          setFileName(file.name);
          onChange(base64String);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (!value) {
      setFileSrc(undefined);
      setFileName(undefined);
    }
  }, [value]);

  return (
    <InputContainer>
      <label htmlFor="upfile">FOTO:</label>
      <DivFileUpload className="input-file-upload">
        <DivUploadBtn className="upload-btn">
          <SelectFileBtn className="btn">Selecionar a imagem</SelectFileBtn>
          <StyledInputField type="file" id="upfile" accept="image/*" onChange={handleFileChange} />
        </DivUploadBtn>
        {fileSrc && (
          <>
            <ImgFile className="upload_img" id="file-upload" src={fileSrc} />
            <p>{fileName}</p>
          </>
        )}
      </DivFileUpload>
    </InputContainer>
  );
};

export default InputImage;
