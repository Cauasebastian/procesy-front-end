/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../lib/axios';

const ProcessContext = createContext();

export const ProcessProvider = ({ children }) => {
  const [process, setProcess] = useState([]);
  const [completedProcess, setCompletedProcess] = useState(0);
  const [inProgressProcess, setInProgressProcess] = useState(0);
  const [uninitiatedProcess, setUninitiatedProcess] = useState(0);
  const [totalProcess, setTotalProcess] = useState(0);

  const [clientes, setClientes] = useState([]);
  const [totalClientes, setTotalClientes] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");

      try {
        const clientesResponse = await api.get('/advogado/clientes', {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        });

        const processosResponse = await api.get('/advogado/processos', {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        });

        const processos = processosResponse.data;
        setProcess(processos);

        const finalizados = processos.filter(p => p.status === 'Finalizado').length;
        const emAndamento = processos.filter(p => p.status === 'Em andamento').length;
        const naoIniciados = processos.filter(p => p.status === 'Não iniciado').length;

        setCompletedProcess(finalizados);
        setInProgressProcess(emAndamento);
        setUninitiatedProcess(naoIniciados);
        setTotalProcess(processos.length);

        setClientes(clientesResponse.data);
        setTotalClientes(clientesResponse.data.length);
      } catch (err) {
        console.error('Erro ao buscar dados:', err);
        setError(
          err.response?.data?.mensagem ||
          err.message ||
          'Erro ao buscar dados do servidor.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <ProcessContext.Provider
      value={{
        process,
        completedProcess,
        inProgressProcess,
        uninitiatedProcess,
        totalProcess,
        clientes,
        totalClientes,
        loading,
        error
      }}
    >
      {children}
    </ProcessContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useProcess = () => useContext(ProcessContext);
