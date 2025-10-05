// view/styles/cashbackStyles.js
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

    // Saldo Card
    saldoCard: {
        backgroundColor: '#2196F3',
        borderRadius: 16,
        padding: 24,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    saldoLabel: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.9)',
        marginBottom: 8,
    },
    saldoMonto: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },

    // Secciones
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 16,
    },

    // Productos Grid
    productosGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 12,
    },
    productoCard: {
        width: '48%',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginBottom: 12,
    },
    productoImagen: {
        width: '100%',
        height: 120,
        borderRadius: 8,
        backgroundColor: '#F0F0F0',
        marginBottom: 12,
    },
    productoNombre: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    productoPrecio: {
        fontSize: 12,
        color: '#666',
        marginBottom: 12,
    },
    reclamarButton: {
        backgroundColor: '#00C851',  // ← Verde correcto
        borderRadius: 8,
        paddingVertical: 10,
        alignItems: 'center',
    },
    reclamarButtonDisabled: {
        backgroundColor: '#CCCCCC',
    },
    reclamarButtonText: {
        color: 'black',
        fontSize: 14,
        fontWeight: '600',
    },

    // Historial
    historialContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    historialItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    historialInfo: {
        flex: 1,
    },
    historialNombre: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    historialFecha: {
        fontSize: 12,
        color: '#999',
    },
    historialMonto: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 12,
    },
    montoPositivo: {
        color: '#00D09C',
    },
    montoNegativo: {
        color: '#FF6B6B',
    },

    // Empty State
    emptyContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 32,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    emptyText: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    },
});