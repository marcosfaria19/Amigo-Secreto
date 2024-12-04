const formatCNPJ = (value) => {
  const numbers = value.replace(/\D/g, "");
  return numbers.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
    "$1.$2.$3/$4-$5",
  );
};

const formatCEP = (value) => {
  const numbers = value.replace(/\D/g, "");
  return numbers.replace(/^(\d{5})(\d{3})/, "$1-$2");
};

const formatPhone = (value) => {
  const numbers = value.replace(/\D/g, "");
  if (numbers.length === 11) {
    return numbers.replace(/^(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  }
  return numbers.replace(/^(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
};

export { formatCNPJ, formatCEP, formatPhone };
