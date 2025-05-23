// src/components/FileUploadSection/index.jsx
import React from 'react';
import { Box, Typography, Button, List, ListItem, IconButton } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';

const FileUploadSection = ({ title, files, handleFileSelect, handleRemoveFile, fileType }) => {
  return (
    <Box sx={{ marginBottom: 3 }}>
      <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>
        {title}
      </Typography>
      <Button
        variant="contained"
        component="label"
        startIcon={<CloudUploadIcon />}
        sx={{
          backgroundColor: "#4a90e2", // Azul estilizado
          color: "#ffffff", // Texto branco
          textTransform: "none",
          fontWeight: "bold",
          paddingY: 1,
          paddingX: 3,
          borderRadius: 3,
          "&:hover": {
            backgroundColor: "#357ABD", // Azul mais escuro no hover
          },
        }}
      >
        Escolher arquivo
        <input
          type="file"
          hidden
          multiple
          onChange={(e) => handleFileSelect(fileType, e)}
        />
      </Button>
      
      <List>
        {files.map((file, index) => (
          <ListItem
            key={index}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "#000000",
            }}
          >
            {file.name} ({(file.size / 1024).toFixed(2)} KB)
            <IconButton
              color="error"
              onClick={() => handleRemoveFile(fileType, index)}
            >
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default FileUploadSection;
