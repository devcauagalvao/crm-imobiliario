import React, { useState } from 'react';
import { Container, Grid, Typography, Card, CardContent, Box, Divider, Button } from '@mui/material';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid'; // Corrigido para GridRowsProp

interface Lead {
  id: number;
  nome: string;
  telefone: string;
  email: string;
  status: string;
}

const styles = {
  container: {
    padding: '20px',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: '20px',
    textAlign: 'center' as 'center' | 'left' | 'right' | 'justify',
  },
  card: {
    marginBottom: '20px',
  },
  cardHeader: {
    fontWeight: 'bold',
  },
  table: {
    height: 400,
    width: '100%',
  },
  button: {
    marginTop: '20px',
  },
};

const LeadsPage: React.FC = () => {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [leads] = useState<Lead[]>([
    { id: 1, nome: 'João Silva', telefone: '123456789', email: 'joao@email.com', status: 'Ativo' },
    { id: 2, nome: 'Maria Souza', telefone: '987654321', email: 'maria@email.com', status: 'Inativo' },
  ]);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'nome', headerName: 'Nome', width: 150 },
    { field: 'telefone', headerName: 'Telefone', width: 150 },
    { field: 'email', headerName: 'Email', width: 180 },
    { field: 'status', headerName: 'Status', width: 130 },
  ];

  const handleSelectLead = (lead: Lead) => {
    setSelectedLead(lead);
  };

  const rows: GridRowsProp = leads; // Definido rows explicitamente

  return (
    <Container maxWidth="lg" style={styles.container}>
      <Typography variant="h4" style={styles.title} gutterBottom>
        CRM Imobiliário - Detalhes do Lead
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Card style={styles.card}>
            <CardContent>
              <Typography variant="h6" color="textPrimary" style={styles.cardHeader}>
                Informações do Lead
              </Typography>
              {selectedLead ? (
                <>
                  <Typography variant="body1">Nome: {selectedLead.nome}</Typography>
                  <Typography variant="body1">Telefone: {selectedLead.telefone}</Typography>
                  <Typography variant="body1">Email: {selectedLead.email}</Typography>
                  <Typography variant="body1">Status: {selectedLead.status}</Typography>
                </>
              ) : (
                <Typography variant="body1">Nenhum lead selecionado</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={8}>
          <Card style={styles.card}>
            <CardContent>
              <Typography variant="h6" color="textPrimary">
                Histórico de Interações
              </Typography>
              <Box>
                {/* Adicione mais detalhes do histórico de interações, se necessário */}
              </Box>
              <Divider style={{ margin: '10px 0' }} />
              <Button variant="contained" color="primary" fullWidth style={styles.button}>
                Agendar Próxima Ação
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card style={styles.card}>
            <CardContent>
              <Typography variant="h6" color="textPrimary">
                Tabela de Leads
              </Typography>
              <div style={styles.table}>
                <DataGrid
                  rows={rows} // Corrigido para usar rows
                  columns={columns}
                  paginationModel={{ pageSize: 5, page: 0 }}
                  onRowClick={(e: any) => handleSelectLead(e.row)}
                  pagination
                />
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LeadsPage;
