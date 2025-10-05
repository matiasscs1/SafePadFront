// view/styles/reparacionStyles.js
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flex: 1,
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  selectorSection: {
    marginBottom: 20,
  },
  selectorTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  hexagonButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#E5E5E5',
    borderRadius: 20,
    marginRight: 10,
    minWidth: 120,
    alignItems: 'center',
  },
  hexagonSelected: {
    backgroundColor: '#2196F3',
  },
  hexagonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  hexagonTextSelected: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  cardTitleBlanco: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  
  // Piezas y Logística
  piezasContainer: {
    gap: 12,
  },
  sinPiezasContainer: {
    padding: 32,
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
  },
  sinPiezasTexto: {
    fontSize: 14,
    color: '#666',
  },
  piezaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  piezaIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  piezaIconText: {
    fontSize: 20,
  },
  piezaInfo: {
    flex: 1,
  },
  piezaNombre: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  piezaETA: {
    fontSize: 13,
    color: '#666',
  },
  estadoBadge: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  estadoBadgeText: {
    color: '#2196F3',
    fontSize: 12,
    fontWeight: '600',
  },

  // Proceso Detallado
  procesoCard: {
    backgroundColor: '#2196F3',
  },
  procesoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  verMasButton: {
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  verMasTexto: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '500',
  },
  estadosProcesoContainer: {
    gap: 16,
  },
  estadoProcesoItem: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 12,
    padding: 16,
  },
  estadoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  estadoTitulo: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    flex: 1,
  },
  estadoFecha: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginLeft: 8,
  },
  estadoDescripcion: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 20,
    marginBottom: 8,
  },
  detallesContainer: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
  },
  detalleTexto: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.85)',
    marginBottom: 4,
  },
  verMasBotonCompleto: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  verMasTextoCompleto: {
    color: 'black',
    fontSize: 14,
    fontWeight: '600',
  },
  sinEstadosContainer: {
    padding: 20,
    alignItems: 'center',
  },
  sinEstadosTexto: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
  },

  // Fotos del Daño
  fotosScrollContainer: {
    marginBottom: 16,
  },
  fotoContainer: {
    width: 150,
    height: 150,
    borderRadius: 12,
    marginRight: 12,
    overflow: 'hidden',
    backgroundColor: '#F0F0F0',
  },
  fotoImage: {
    width: 150,
    height: 150,
  },
  sinFotosContainer: {
    padding: 32,
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    marginBottom: 16,
  },
  sinFotosTexto: {
    fontSize: 14,
    color: '#666',
  },
  whatsappButton: {
    backgroundColor: '#25D366',
    borderRadius: 12,
    paddingVertical: 17,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  whatsappTexto: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
  },

  // Técnico Asignado
  tecnicoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tecnicoAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  tecnicoAvatarTexto: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  tecnicoInfo: {
    flex: 1,
  },
  tecnicoNombre: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  tecnicoEspecialidad: {
    fontSize: 14,
    color: '#666',
  },
});