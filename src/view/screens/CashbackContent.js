// view/screens/CashbackScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  Image,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCashbackViewModel } from '../../viewmodels/cashbackViewModel';
import { styles } from '../../styles/cashbackStyles';
import Toast from 'react-native-toast-message';

const CashbackScreen = () => {
  const {
    datosUsuario,
    productos,
    historial,
    loading,
    refreshing,
    reclamando,
    reclamarProducto,
    onRefresh,
    formatearFecha,
    puedeReclamar,
  } = useCashbackViewModel();

  const handleReclamar = async (producto) => {
    Alert.alert(
      'Confirmar canje',
      `¿Deseas canjear ${producto.nombre} por $${producto.precio_cashback}?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Canjear',
          onPress: async () => {
            try {
              await reclamarProducto(producto._id);
              Toast.show({
                type: 'success',
                text1: '¡Producto canjeado!',
                text2: `Has canjeado ${producto.nombre} exitosamente`
              });
            } catch (error) {
              Toast.show({
                type: 'error',
                text1: 'Error',
                text2: error.message || 'No se pudo canjear el producto'
              });
            }
          }
        }
      ]
    );
  };

  const renderProducto = (producto, index) => {
    const puedeCanjear = puedeReclamar(producto.precio_cashback);
    
    return (
      <View key={index} style={styles.productoCard}>
        <Image 
          source={{ uri: producto.imagen_url || 'https://via.placeholder.com/150' }}
          style={styles.productoImagen}
          resizeMode="cover"
        />
        <Text style={styles.productoNombre}>{producto.nombre}</Text>
        <Text style={styles.productoPrecio}>${producto.precio_cashback} cashback</Text>
        
        <TouchableOpacity 
          style={[
            styles.reclamarButton, 
            !puedeCanjear && styles.reclamarButtonDisabled
          ]}
          onPress={() => handleReclamar(producto)}
          disabled={!puedeCanjear || reclamando}
        >
          {reclamando ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.reclamarButtonText}>Reclamar</Text>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  const renderHistorialItem = (item, index) => {
    const esPositivo = item.costo < 0 || item.tipo === 'ganancia';
    
    return (
      <View key={index} style={styles.historialItem}>
        <View style={styles.historialInfo}>
          <Text style={styles.historialNombre}>{item.nombre_producto}</Text>
          <Text style={styles.historialFecha}>{formatearFecha(item.createdAt)}</Text>
        </View>
        <Text style={[
          styles.historialMonto,
          esPositivo ? styles.montoPositivo : styles.montoNegativo
        ]}>
          {esPositivo ? '+' : '-'}${Math.abs(item.costo)}
        </Text>
      </View>
    );
  };

  if (loading && !datosUsuario) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2196F3" />
          <Text style={styles.loadingText}>Cargando...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Saldo Disponible */}
        <View style={styles.saldoCard}>
          <Text style={styles.saldoLabel}>Saldo disponible</Text>
          <Text style={styles.saldoMonto}>
            ${datosUsuario?.cashback || 0} USD
          </Text>
        </View>

        {/* Productos Disponibles */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Productos disponibles</Text>
          
          {productos && productos.length > 0 ? (
            <View style={styles.productosGrid}>
              {productos.map((producto, index) => renderProducto(producto, index))}
            </View>
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No hay productos disponibles</Text>
            </View>
          )}
        </View>

        {/* Historial */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Historial</Text>
          
          {historial && historial.length > 0 ? (
            <View style={styles.historialContainer}>
              {historial.map((item, index) => renderHistorialItem(item, index))}
            </View>
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No hay historial de canjes</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CashbackScreen;