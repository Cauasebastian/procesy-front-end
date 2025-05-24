import { useState } from 'react';
import * as S from './styles'
import { useNavigate } from 'react-router-dom';
import axios from '../../../utils/axiosConfig'; // Utilize a instância configurada do axios

function CadastroClientes() {
  const [clienteInfo, setClienteInfo] = useState({
    nome: '',
    genero: '',
    estadoCivil: '',
    cpf: '',
    cnpj: '',
    telefone: '',
    email: '',
    naturalidade: '',
    dataNascimento: '',
  });


  const [loading, setLoading] = useState(false); // Estado de carregamento

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClienteInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateFields = () => {
    if (!clienteInfo.nome) {
      alert('Nome é obrigatório.');
      return false;
    }
    if (!clienteInfo.email) {
      alert('E-mail é obrigatório.');
      return false;
    }
    // Adicione mais validações conforme necessário
    return true;
  };

  const handleSubmit = async (event) => {
    if (event) {
      event.preventDefault();
    }

    if (!validateFields()) {
      return;
    }

    const token = localStorage.getItem('token'); // Obtém o token do localStorage
    console.log('Token lido do localStorage:', token);

    if (!token) {
      alert('Autenticação necessária!');
      navigate('/login'); // Opcional: redirecionar para a página de login
      return;
    }

    // Formate a data de nascimento para ISO8601, se necessário
    const formattedDataNascimento = new Date(clienteInfo.dataNascimento).toISOString();

    const clientePayload = {
      nome: clienteInfo.nome,
      genero: clienteInfo.genero,
      estadoCivil: clienteInfo.estadoCivil,
      cpf_cnpj: clienteInfo.cpf || clienteInfo.cnpj, // Envia CPF ou CNPJ
      telefone: clienteInfo.telefone,
      email: clienteInfo.email,
      naturalidade: clienteInfo.naturalidade,
      dataNascimento: formattedDataNascimento, // Formatação ajustada
    };
    console.log('Dados do cliente:', clientePayload);

    setLoading(true); // Inicia o estado de carregamento

    try {
      // URL da API definida diretamente ou via proxy
      const response = await axios.post('/advogado/clientes', clientePayload, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      alert('Cliente cadastrado com sucesso!');
      console.log('Resposta da API:', response.data);
      localStorage.setItem('clienteId', response.data.id); // Salva o ID do cliente no localStorage
      navigate('/cadastro-documentos'); // Redireciona para a próxima página
    } catch (error) {
      if (error.response) {
        // O servidor respondeu com um status diferente de 2xx
        console.error('Erro ao cadastrar cliente:', error.response.data);
        alert(`Erro ao cadastrar cliente: ${error.response.data.mensagem || error.message}`);
      } else if (error.request) {
        // A requisição foi feita, mas nenhuma resposta foi recebida
        console.error('Erro ao cadastrar cliente: Nenhuma resposta do servidor', error.request);
        alert('Erro ao cadastrar cliente: Nenhuma resposta do servidor.');
      } else {
        // Algo aconteceu na configuração da requisição
        console.error('Erro ao cadastrar cliente:', error.message);
        alert(`Erro ao cadastrar cliente: ${error.message}`);
      }
    } finally {
      setLoading(false); // Finaliza o estado de carregamento
    }
  };

  return (
    
      
   

          
  <S.FormClient onSubmit={handleSubmit}>

    <S.FieldWrapper>
      <S.LabelField>Nome completo</S.LabelField>
      <S.FieldText
        name="nome"
        value={clienteInfo.nome}
        onChange={handleInputChange}
        placeholder="nome"
      />
    </S.FieldWrapper>
      
    <S.FieldWrapper>
      <S.LabelField>Gênero</S.LabelField>
        <S.FieldSelect
          name="genero"
          value={clienteInfo.genero}
          onChange={handleInputChange}>
          <option value="">Selecione o gênero</option>
          <option value="masculino">Masculino</option>
          <option value="feminino">Feminino</option>
          <option value="outro">Outro</option>
          <option value="nao_informar">Prefiro não informar</option>
        </S.FieldSelect>
    </S.FieldWrapper>

    <S.FieldWrapper>
      <S.LabelField>Estado civil</S.LabelField>
      <S.FieldSelect
    name="estadoCivil"
    value={clienteInfo.estadoCivil}
    onChange={handleInputChange}
  >
    <option value="">Selecione o estado civil</option>
    <option value="solteiro">Solteiro(a)</option>
    <option value="casado">Casado(a)</option>
    <option value="divorciado">Divorciado(a)</option>
    <option value="viuvo">Viúvo(a)</option>
    <option value="uniao_estavel">União Estável</option>
  </S.FieldSelect>
    </S.FieldWrapper>
  
  <S.FieldWrapper>
          <S.LabelField>CPF</S.LabelField>
          <S.FieldText
    name="cpf"
    value={clienteInfo.cpf}
    onChange={handleInputChange}
    placeholder="123.456.789-10"
  />
  </S.FieldWrapper>

  <S.FieldWrapper>
    <S.LabelField>CNPJ</S.LabelField>
     <S.FieldText
    name="cnpj"
    value={clienteInfo.cnpj}
    onChange={handleInputChange}
    placeholder="00.000.000/0000-00"
  />
  </S.FieldWrapper>

 <S.FieldWrapper>
    <S.LabelField>Telefone</S.LabelField>
    <S.FieldText
    name="telefone"
    value={clienteInfo.telefone}
    onChange={handleInputChange}
    placeholder="(81) 98762-2928"
  />
 </S.FieldWrapper>

  <S.FieldWrapper>
    <S.LabelField>Email</S.LabelField>
    <S.FieldText
    name="email"
    value={clienteInfo.email}
    onChange={handleInputChange}
    placeholder="joao.01@gmail.com"
    type="email"
  />
  </S.FieldWrapper>

  <S.FieldWrapper>
    <S.LabelField>Naturalidade</S.LabelField>
    <S.FieldText
    name="naturalidade"
    value={clienteInfo.naturalidade}
    onChange={handleInputChange}
    placeholder="Ex.: Pernambucano"
  />
  </S.FieldWrapper>

  <S.FieldWrapper>
    <S.LabelField>Data de nascimento</S.LabelField>
    <S.FieldText
    name="dataNascimento"
    value={clienteInfo.dataNascimento}
    onChange={handleInputChange}
    type="date"
  />
  </S.FieldWrapper>

  

  <S.ButtonNextSection type="submit" disabled={loading}>
    {loading ? 'Processando...' : 'Próximo'}
  </S.ButtonNextSection>
</S.FormClient>
     
  )
}

export default CadastroClientes;
