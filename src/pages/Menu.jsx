import React from 'react';
import {
  AppBar,
  Toolbar,
  Avatar,
  Typography,
  Container,
  Box,
  Button,
  Card,
  CardContent,
} from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

const Menu = () => {
  // The data array must be initialized properly
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
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <img src="/logo.png" alt="Logo" style={{ height: '40px' }} />
          <Avatar alt="Usuário" src="/avatar.png" sx={{ width: 40, height: 40 }} />
        </Toolbar>
      </AppBar>

      {/* Main Layout */}
      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: 'calc(100vh - 64px)',
          paddingY: 4,
          backgroundColor: '#f8f9fa',
        }}
      >
        {/* Total and Clients Buttons */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            maxWidth: 900,
            mb: 4,
          }}
        >
          <Button
            variant="contained"
            sx={{
              flex: 1,
              marginRight: 2,
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
            width: '100%',
            maxWidth: 900,
            mb: 4,
          }}
        >
          <Button
            variant="contained"
            startIcon={<AddCircleOutlineIcon />}
            sx={{
              flex: 1,
              marginRight: 2,
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
            startIcon={<PersonAddAltIcon />}
            sx={{
              flex: 1,
              backgroundColor: '#3F4E7A',
              color: '#fff',
              textTransform: 'none',
              height: 60,
              fontSize: '1rem',
            }}
          >
            Novo cliente
          </Button>
        </Box>

        {/* Card with Pie Chart */}
        <Card
          sx={{
            width: '100%',
            maxWidth: 900,
            backgroundColor: '#f8f9fa',
            boxShadow: 2,
            p: 3,
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
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mb: 2,
              }}
            >
              <PieChart
                series={[
                  {
                    data,
                    innerRadius: 0.7,
                  },
                ]}
                width={250}
                height={250}
              />
            </Box>
            <Typography variant="body2" sx={{ textAlign: 'center', mb: 1 }}>
              6 Não iniciados
            </Typography>
            <Typography variant="body2" sx={{ textAlign: 'center', mb: 1 }}>
              12 Em andamento
            </Typography>
            <Typography variant="body2" sx={{ textAlign: 'center' }}>
              4 Concluídos
            </Typography>
          </CardContent>
        </Card>

        {/* Process Button */}
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button
            variant="contained"
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
      </Container>
    </>
  );
};

export default Menu;
