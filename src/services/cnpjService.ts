
export const fetchCNPJData = async (cnpj:any) => {
    try {
      const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`);
      if (!response.ok) {
        throw new Error("Erro ao buscar CNPJ");
      }
      return await response.json();
    } catch (error) {
      console.error("Erro ao buscar dados do CNPJ:", error);
      throw error;
    }
  };
  