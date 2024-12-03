import {
  AppBar,
  Toolbar,
  Avatar,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
} from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useNavigate } from 'react-router-dom';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

const Menu = () => {
  const navigate = useNavigate();
  const data = [
    { id: 'notStarted', value: 6, label: 'Não Iniciados', color: '#f44336' },
    { id: 'inProgress', value: 12, label: 'Em Andamento', color: '#ff9800' },
    { id: 'completed', value: 4, label: 'Concluídos', color: '#4caf50' },
  ];

  return (
    <>
      {/* Header */}
      <AppBar
        position="static"
        sx={{
          backgroundColor: '#fff',
          boxShadow: 'none',
          borderBottom: '1px solid #e0e0e0',
          paddingX: 2,
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <img src="/logo.png" alt="Logo" style={{ height: '40px' }} />
          <Avatar
            alt="Usuário"
            src="/avatar.png"
            sx={{
              width: 48,
              height: 48,
              border: '2px solid #3F4E7A',
            }}
          />
        </Toolbar>
      </AppBar>

      {/* Main Layout */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          width: '100vw',
          height: '100vh',
          background: 'linear-gradient(to bottom, #f8f9fa, #ffffff)',
          paddingTop: '30px',
          paddingX: 2,
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: '700px',
            backgroundColor: '#fff',
            padding: 4,
            borderRadius: 2,
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          }}
        >
          {/* Total and Clients Buttons */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: 2,
              mb: 4,
            }}
          >
            <Button
              variant="contained"
              sx={{
                flex: 1,
                backgroundColor: '#3F4E7A',
                color: '#fff',
                textTransform: 'none',
                height: 60,
                fontSize: '1rem',
              }}
            >
              Total
            </Button>
            <Button
              variant="outlined"
              sx={{
                flex: 1,
                borderColor: '#ccc',
                color: '#3F4E7A',
                textTransform: 'none',
                height: 60,
                fontSize: '1rem',
              }}
            >
              148 Clientes
            </Button>
          </Box>

          {/* New Process and New Client Buttons */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: 2,
              mb: 4,
            }}
          >
            <Button
              variant="contained"
              onClick={() => {
                navigate("/novo-processo")
              }}
              startIcon={<AddCircleOutlineIcon />}
              sx={{
                flex: 1,
                backgroundColor: '#3F4E7A',
                color: '#fff',
                textTransform: 'none',
                height: 60,
                fontSize: '1rem',
              }}
            >
              Novo processo
            </Button>
            <Button
              variant="contained"
              sx={{
                flex: 1,
                backgroundColor: '#3F4E7A',
                color: '#fff',
                textTransform: 'none',
                height: 60,
                fontSize: '1rem',
              }}
            >
              Meus Clientes
            </Button>
          </Box>

          {/* Card with Pie Chart */}
          <Card
            sx={{
              width: '100%',
              backgroundColor: '#f8f9fa',
              boxShadow: 2,
              borderRadius: 4,
              p: 3,
              mb: 4,
            }}
          >
            <CardContent>
              <Typography
                variant="h5"
                sx={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  mb: 3,
                }}
              >
                Processos
              </Typography>
              <Box
                sx={{
                  display: 'flex', // Alinhar o gráfico e os índices lado a lado
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 2,
                }}
              >
                {/* Pie Chart */}
                <PieChart
                  series={[
                    {
                      data,
                      innerRadius: 0.7,
                    },
                  ]}
                  width={500}
                  height={250}
                />

                {/* Process Indices */}
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    marginLeft: 4, // Espaço entre o gráfico e os índices
                  }}
                >
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Process Button */}
          <Box sx={{ textAlign: 'center' }}>
            <Button
              variant="contained"
              onClick={() => {
                navigate("/processos")
              }}
              sx={{
                backgroundColor: '#3F4E7A',
                color: '#fff',
                textTransform: 'none',
                borderRadius: 20,
                px: 6,
                py: 2,
                fontSize: '1rem',
              }}
            >
              Processos
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Menu;
