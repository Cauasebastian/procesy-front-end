import React from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

function Menu() {
  const data = [
    { id: 'notStarted', value: 6, label: 'Não Iniciados', color: '#f44336' },
    { id: 'inProgress', value: 12, label: 'Em Andamento', color: '#ff9800' },
    { id: 'completed', value: 4, label: 'Concluídos', color: '#4caf50' },
  ];

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f8f9fa', pt: 4 }}>
      <Container maxWidth="md">
        {/* Logo */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <img src="/logo.png" alt="Logo" style={{ height: '60px' }} />
        </Box>

        {/* Botões de Ações e Resumo */}
        <Grid container spacing={2} alignItems="center">
          {/* Botões Total */}
          <Grid item xs={6}>
            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: '#3F4E7A',
                color: '#fff',
                textTransform: 'none',
                height: 50,
              }}
            >
              Total
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="outlined"
              fullWidth
              sx={{
                borderColor: '#ccc',
                color: '#3F4E7A',
                textTransform: 'none',
                height: 50,
              }}
            >
              148 Clientes
            </Button>
          </Grid>
        </Grid>

        {/* Botões de Ação */}
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={6}>
            <Button
              variant="contained"
              fullWidth
              startIcon={<AddCircleOutlineIcon />}
              sx={{
                backgroundColor: '#3F4E7A',
                color: '#fff',
                textTransform: 'none',
                height: 50,
              }}
            >
              Novo processo
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              fullWidth
              startIcon={<PersonAddAltIcon />}
              sx={{
                backgroundColor: '#3F4E7A',
                color: '#fff',
                textTransform: 'none',
                height: 50,
              }}
            >
              Novo cliente
            </Button>
          </Grid>
        </Grid>

        {/* Card com Gráfico de Processos */}
        <Card
          sx={{
            mt: 4,
            p: 2,
            boxShadow: 1,
            borderRadius: 2,
            backgroundColor: '#fff',
          }}
        >
          <CardContent>
            <Typography variant="h6" sx={{ textAlign: 'center', mb: 2 }}>
              Processos
            </Typography>
            {/* Gráfico */}
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

            {/* Detalhes dos Processos */}
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

        {/* Botão Processos */}
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#3F4E7A',
              color: '#fff',
              textTransform: 'none',
              borderRadius: 20,
              px: 4,
            }}
          >
            Processos
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default Menu;
