// view/styles/ipadDetalleStyles.js
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flex: 1,

  },
  selectorSection: {
    marginBottom: 20,
  },
  selectorTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  hexagonContainer: {
    flexDirection: 'row',
  },
  hexagonButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#E5E5E5',
    borderRadius: 25,
    marginRight: 12,
    minWidth: 140,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hexagonSelected: {
    backgroundColor: '#007AFF',
  },
  hexagonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
    textAlign: 'center',
  },
  hexagonTextSelected: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  mainCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    minHeight: 140,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  ipadImageContainer: {
    marginRight: 20,
    flex: 0.35,
  },
  ipadImage: {
    width: '100%',
    aspectRatio: 3 / 4, 
    borderRadius: 8,
    backgroundColor: '#F0F0F0',
    minHeight: 120, 
  },
  ipadInfo: {
    flex: 0.65,
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  serial: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  modelo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  fecha: {
    fontSize: 16,
    color: '#333',
  },
  garantiaApple: {
    backgroundColor: '#2196F3',
  },
  garantiaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  garantiaTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  estadoBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#FFC107',
  },
  estadoActivo: {
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  estadoTexto: {
    color: '#00C851',
    fontSize: 12,
    fontWeight: '600',
  },
  garantiaDetalle: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 4,
  },
  garantiaHeaderSafePad: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  garantiaTituloSafePad: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  proximoVencerBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#FFF4E6',
  },
  proximoVencerTexto: {
    color: '#FEB21A',
    fontSize: 12,
    fontWeight: '600',
  },
  renovacionText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  planText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  renovarBoton: {
    backgroundColor: '#00C851',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  renovarTexto: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
  },
  procesoCard: {
    backgroundColor: '#2196F3',
  },
  procesoCompletadoContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  procesoCompletadoTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  procesoCompletadoSubtexto: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    textAlign: 'center',
  },
  tecnicoInfo: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
    paddingTop: 16,
    marginTop: 16,
  },
  procesoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  procesoTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  verMasButton: {
  borderWidth: 2,
  borderColor: 'rgba(255,255,255,0.25)',
  borderRadius: 25,
  backgroundColor: 'rgba(255,255,255,0.15)',  
  paddingHorizontal: 16,
  paddingVertical: 8,
},
  verMasTexto: {
    color: '#fff',
    fontSize: 14,
  },
  estadosContainer: {
    marginBottom: 16,
  },
  estadoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  circuloEstado: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginRight: 12,
  },
  circuloCompletado: {
    backgroundColor: '#4CAF50',
  },
estadoTextoContainer: {  
  flex: 1,
},
  tituloEstado: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  descripcionEstado: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 12,
    marginTop: 2,
  },
  fechaEstado: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    marginTop: 2,
  },
  detallesExpandidos: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
    paddingTop: 16,
  },
  verMasBotonCompleto: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginVertical: 12,
    marginHorizontal: 16,
  },
  verMasTextoCompleto: {
    color: '#2196F3',
    fontSize: 14,
    fontWeight: '600',
  },
  tecnicoLabel: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 4,
  },
  entregaLabel: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 4,
  },
  notasLabel: {
    color: '#fff',
    fontSize: 14,
  },
});