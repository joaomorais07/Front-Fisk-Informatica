export const maskName = (value: string): string => {
  return value.replace(/\d+/g, "");
};

export const maskEmail = (value: string): string => {
  return value.replace(/\s/g, "").toLowerCase();
};

export const maskCPF = (value: string): string => {
  return value
    .replace(/\D/g, "")
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4")
    .slice(0, 14);
};
