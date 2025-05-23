import React from "react";
import { 
  Box, 
  Typography, 
  Divider, 
  List, 
  ListItem, 
  IconButton, 
  Paper, 
  Grid, 
  Chip,
  ListItemText,
  ListItemIcon,
  Tooltip,
  alpha
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import ErrorIcon from "@mui/icons-material/Error";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import DescriptionIcon from "@mui/icons-material/Description";
import GavelIcon from "@mui/icons-material/Gavel";
import ArticleIcon from "@mui/icons-material/Article";

// Função para determinar a cor e ícone do status
const getStatusInfo = (status) => {
  const statusLower = status?.toLowerCase() || "";
  
  switch(statusLower) {
    case 'concluído':
      return { 
        color: '#28a745', 
        icon: <CheckCircleIcon fontSize="small" />,
        bgColor: alpha('#28a745', 0.1)
      };
    case 'em andamento':
      return { 
        color: '#ffc107', 
        icon: <HourglassEmptyIcon fontSize="small" />,
        bgColor: alpha('#ffc107', 0.1)
      };
    case 'pendente':
      return { 
        color: '#dc3545', 
        icon: <ErrorIcon fontSize="small" />,
        bgColor: alpha('#dc3545', 0.1)
      };
    default:
      return { 
        color: '#6c757d', 
        icon: <HourglassEmptyIcon fontSize="small" />,
        bgColor: alpha('#6c757d', 0.1)
      };
  }
};

// Função para determinar o ícone do tipo de documento
const getDocumentIcon = (type) => {
  switch(type) {
    case 'procuracao':
      return <GavelIcon />;
    case 'peticao-inicial':
      return <ArticleIcon />;
    case 'documento-complementar':
      return <InsertDriveFileIcon />;
    case 'contrato':
      return <DescriptionIcon />;
    default:
      return <InsertDriveFileIcon />;
  }
};

const StatusCard = ({ title, status }) => {
  const { color, icon, bgColor } = getStatusInfo(status);
  
  return (
    <Paper 
      elevation={0}
      sx={{ 
        p: 2, 
        height: '100%',
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        {title}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
        <Chip
          icon={icon}
          label={status || "Não especificado"}
          sx={{
            backgroundColor: bgColor,
            color: color,
            fontWeight: 'medium',
            '& .MuiChip-icon': {
              color: color
            }
          }}
        />
      </Box>
    </Paper>
  );
};

const DocumentList = ({ title, documents, handleDownload, docType }) => {
  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 2, 
        mt: 3, 
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider'
      }}
    >
      <Typography 
        variant="h6" 
        sx={{ 
          mb: 2, 
          fontSize: '1rem', 
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}
      >
        {getDocumentIcon(docType)}
        {title}
      </Typography>
      
      {documents && documents.length > 0 ? (
        <List sx={{ p: 0 }}>
          {documents.map((doc) => (
            <ListItem
              key={doc.id}
              sx={{
                borderRadius: 1,
                mb: 1,
                '&:hover': {
                  backgroundColor: (theme) => theme.palette.action.hover,
                },
                p: 1
              }}
              secondaryAction={
                <Tooltip title="Download">
                  <IconButton 
                    edge="end" 
                    aria-label="download" 
                    onClick={() => handleDownload(docType, doc.id, doc.nomeArquivo, doc.tipoArquivo)}
                    sx={{ 
                      color: 'primary.main',
                      '&:hover': {
                        backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.1),
                      }
                    }}
                  >
                    <DownloadIcon />
                  </IconButton>
                </Tooltip>
              }
            >
              <ListItemIcon sx={{ minWidth: 36 }}>
                <InsertDriveFileIcon fontSize="small" color="action" />
              </ListItemIcon>
              <ListItemText 
                primary={doc.nomeArquivo} 
                secondary={doc.tipoArquivo}
                primaryTypographyProps={{
                  variant: 'body2',
                  fontWeight: 500
                }}
                secondaryTypographyProps={{
                  variant: 'caption'
                }}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Box 
          sx={{ 
            p: 2, 
            textAlign: 'center', 
            backgroundColor: (theme) => alpha(theme.palette.action.hover, 0.5),
            borderRadius: 1
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Nenhum documento adicionado.
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

const DocumentosStatus = ({ processo, handleDownload }) => {
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#ffffff",
        borderRadius: 3,
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.08)",
        p: 3,
        mb: 4,
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: 600,
          color: "#1a1a1a",
          mb: 3,
        }}
      >
        Documentos e Status
      </Typography>

      {/* Status Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatusCard 
            title="Status Contrato" 
            status={processo?.statusContrato} 
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatusCard 
            title="Status Procurações" 
            status={processo?.statusProcuracoes} 
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatusCard 
            title="Status Petições Iniciais" 
            status={processo?.statusPeticoesIniciais} 
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatusCard 
            title="Status Documentos Complementares" 
            status={processo?.statusDocumentosComplementares} 
          />
        </Grid>
      </Grid>

      {/* Document Lists */}
      <DocumentList 
        title="Contratos" 
        documents={processo?.contratos} 
        handleDownload={handleDownload} 
        docType="contrato" 
      />
      
      <DocumentList 
        title="Procurações" 
        documents={processo?.procuracoes} 
        handleDownload={handleDownload} 
        docType="procuracao" 
      />
      
      <DocumentList 
        title="Petições Iniciais" 
        documents={processo?.peticoesIniciais} 
        handleDownload={handleDownload} 
        docType="peticao-inicial" 
      />
      
      <DocumentList 
        title="Documentos Complementares" 
        documents={processo?.documentosComplementares} 
        handleDownload={handleDownload} 
        docType="documento-complementar" 
      />
    </Box>
  );
};

export default DocumentosStatus;