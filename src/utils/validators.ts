export function validateName(name: string) {
  const nameRegex = /^[a-zA-ZÀ-ú]{2,} [a-zA-ZÀ-ú]{2,}(?: [a-zA-ZÀ-ú]+){0,9}$/;
  const newName = name.trim().replace(/\s+/g, ' ');
  const isValid = nameRegex.test(newName);

  return isValid ? undefined : "Nome e sobrenome exigido";
}

export function validateEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = emailRegex.test(email);

  return isValid ? undefined : "E-mail inválido";
}

export function validatePassword(password: string) {
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  const isValid = passwordRegex.test(password);

  return isValid
    ? undefined
    : "Senha inválida. A senha deve ter pelo menos 8 caracteres, conter letras maiúsculas, minúsculas e números.";
}

export function validateCpf(cpf: string) {
  if (!cpf) return "CPF inválido";

  const cpfClean = cpf.replace(/[^\d]+/g, "");

  if (cpfClean === "") return "CPF inválido";

  if (
    cpfClean.length !== 11 ||
    cpfClean === "00000000000" ||
    cpfClean === "11111111111" ||
    cpfClean === "22222222222" ||
    cpfClean === "33333333333" ||
    cpfClean === "44444444444" ||
    cpfClean === "55555555555" ||
    cpfClean === "66666666666" ||
    cpfClean === "77777777777" ||
    cpfClean === "88888888888" ||
    cpfClean === "99999999999"
  )
    return "CPF inválido";

  let soma = 0;
  let resto = 0;

  for (let i = 1; i <= 9; i++) soma += Number(cpfClean.substring(i - 1, i)) * (11 - i);

  resto = (soma * 10) % 11;

  if (resto === 10 || resto === 11) resto = 0;

  if (resto !== Number(cpfClean.substring(9, 10))) return "CPF inválido";

  soma = 0;

  for (let i = 1; i <= 10; i++) soma += Number(cpfClean.substring(i - 1, i)) * (12 - i);

  resto = (soma * 10) % 11;

  if (resto === 10 || resto === 11) resto = 0;

  if (resto !== Number(cpfClean.substring(10, 11))) return "CPF inválido";

  return undefined;
}
