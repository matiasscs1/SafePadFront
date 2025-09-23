// view/screens/IpadDetalleScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Alert,
  ActivityIndicator,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMiIpadViewModel } from '../../viewmodels/miIpadViewModel';
import { styles } from '../../styles/miIpad.Styles';
import Toast from 'react-native-toast-message';

const IpadDetalleScreen = () => {
  const {
    ipads,
    loading,
    refreshing,
    ipadSeleccionado,
    procesoReparacionActual,
    tecnicoAsignado,
    renovarGarantia,
    seleccionarIpad,
    onRefresh,
    formatearFecha,
    obtenerEstadoProceso,
    obtenerGarantiaApple,
    obtenerGarantiaSafePad,
  } = useMiIpadViewModel();

  const [expandirProceso, setExpandirProceso] = useState(false);

  // Obtener datos dinámicos de garantías
  const garantiaApple = obtenerGarantiaApple();
  const garantiaSafePad = obtenerGarantiaSafePad();

  const manejarRenovarGarantia = async () => {
    if (!garantiaSafePad?.id) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'No se puede renovar la garantía en este momento'
      });
      return;
    }

    Alert.alert(
      'Renovar Garantía SafePad',
      '¿Estás seguro de que deseas renovar la garantía SafePad? Esto extenderá la cobertura por un año adicional.',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Renovar',
          onPress: async () => {
            try {
              const fechaInicio = new Date();
              const fechaVencimiento = new Date();
              fechaVencimiento.setFullYear(fechaVencimiento.getFullYear() + 1);

              await renovarGarantia(
                garantiaSafePad.id,
                fechaInicio.toISOString(),
                fechaVencimiento.toISOString()
              );

              Toast.show({
                type: 'success',
                text1: 'Garantía Renovada',
                text2: 'Tu garantía SafePad ha sido renovada exitosamente'
              });
            } catch (error) {
              Toast.show({
                type: 'error',
                text1: 'Error',
                text2: error.message || 'No se pudo renovar la garantía'
              });
            }
          }
        }
      ]
    );
  };

  const estadoProceso = obtenerEstadoProceso();

  const renderEstadoProceso = (paso, index) => {
    const completado = paso.estado === 'completado';
    
    return (
      <View key={index} style={styles.estadoItem}>
        <View style={[styles.circuloEstado, completado && styles.circuloCompletado]} />
        <View style={styles.estadoTextoContainer}>
          <Text style={styles.tituloEstado}>{paso.titulo}</Text>
          <Text style={styles.descripcionEstado}>{paso.descripcion}</Text>
          {paso.fecha && <Text style={styles.fechaEstado}>{formatearFecha(paso.fecha)}</Text>}
        </View>
      </View>
    );
  };

  if (loading && !ipadSeleccionado) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2196F3" />
          <Text style={styles.loadingText}>Cargando información...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!ipadSeleccionado) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>No se encontraron iPads registrados</Text>
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
        {/* Selector de iPads */}
        {ipads && ipads.length > 0 && (
          <View style={styles.selectorSection}>
            <Text style={styles.selectorTitle}>Selecciona tu iPad</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.hexagonContainer}>
              {ipads.map((ipad, index) => (
                <TouchableOpacity 
                  key={ipad._id || index} 
                  style={[
                    styles.hexagonButton, 
                    ipadSeleccionado && ipadSeleccionado._id === ipad._id && styles.hexagonSelected
                  ]}
                  onPress={() => seleccionarIpad(ipad)}
                >
                  <Text style={[
                    styles.hexagonText, 
                    ipadSeleccionado && ipadSeleccionado._id === ipad._id && styles.hexagonTextSelected
                  ]}>
                    {ipad.modelo || `iPad ${index + 1}`}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Información del iPad */}
        <View style={styles.mainCard}>
          <View style={styles.ipadImageContainer}>
            <Image 
              source={{ uri: 'https://locosphone.com/wp-content/uploads/2023/03/apple-ipad-pro-1000-gb-wi-fi-4g-gris.webp' }}
              style={styles.ipadImage}
              onError={() => {}}
            />
          </View>
          <View style={styles.ipadInfo}>
            <Text style={styles.label}>Número de serie:</Text>
            <Text style={styles.serial}>*{(ipadSeleccionado.serial_ipad || 'IPAD-XYZ-98765').slice(-10)}</Text>
            <Text style={styles.modelo}>{ipadSeleccionado.modelo || 'iPad Air 2020'}</Text>
            <Text style={styles.label}>Fecha de compra:</Text>
            <Text style={styles.fecha}>{formatearFecha(ipadSeleccionado.fecha_compra) || '12/05/2023'}</Text>
          </View>
        </View>

        {/* Garantía Apple */}
        <View style={[styles.card, styles.garantiaApple]}>
          <View style={styles.garantiaHeader}>
            <Text style={styles.garantiaTitulo}>Garantía Apple</Text>
            <View style={[styles.estadoBadge, garantiaApple?.activa && styles.estadoActivo]}>
              <Text style={styles.estadoTexto}>● Activa</Text>
            </View>
          </View>
          <Text style={styles.garantiaDetalle}>Vence: {garantiaApple?.vence || '12/05/2026'}</Text>
          <Text style={styles.garantiaDetalle}>Cobertura: {garantiaApple?.cobertura || 'Limitada + Soporte Técn.'}</Text>
        </View>

        {/* Garantía SafePad */}
        <View style={styles.card}>
          <View style={styles.garantiaHeaderSafePad}>
            <Text style={styles.garantiaTituloSafePad}>Garantía SafePad</Text>
            <View style={styles.proximoVencerBadge}>
              <Text style={styles.proximoVencerTexto}>● Próxima a vencer</Text>
            </View>
          </View>
          <Text style={styles.renovacionText}>Renovación: {garantiaSafePad?.renovacion || '12/05/2025'}</Text>
          <Text style={styles.planText}>Plan: {garantiaSafePad?.plan || 'SafePad Plus (daños accidentales)'}</Text>
          
          <TouchableOpacity 
            style={styles.renovarBoton}
            onPress={manejarRenovarGarantia}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.renovarTexto}>Renovar ahora</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Proceso de Reparación */}
        <View style={[styles.card, styles.procesoCard]}>
          <View style={styles.procesoHeader}>
            <View>
              <Text style={styles.procesoTitulo}>
                {!procesoReparacionActual || estadoProceso?.estado_general === 'completado' 
                  ? 'Estado del Dispositivo' 
                  : 'Proceso de Reparación '}
              </Text>
            </View>
            {procesoReparacionActual && estadoProceso?.estado_general !== 'completado' && (
              <TouchableOpacity 
                style={styles.verMasButton}
                onPress={() => setExpandirProceso(!expandirProceso)}
              >
                <Text style={styles.verMasTexto}>Ver {expandirProceso ? 'menos' : 'más'} ⌄</Text>
              </TouchableOpacity>
            )}
          </View>

          {!procesoReparacionActual || estadoProceso?.estado_general === 'completado' ? (
            <View style={styles.procesoCompletadoContainer}>
              <Text style={styles.procesoCompletadoTexto}>
                ✓ Dispositivo al día
              </Text>
              <Text style={styles.procesoCompletadoSubtexto}>
                No hay procesos de reparación pendientes
              </Text>
            </View>
          ) : (
            <>
              {estadoProceso && estadoProceso.pasos_completos && (
                <View style={styles.estadosContainer}>
                  {estadoProceso.pasos_completos.slice(0, expandirProceso ? estadoProceso.pasos_completos.length : 3).map((paso, index) => 
                    renderEstadoProceso(paso, index)
                  )}
                </View>
              )}

              {estadoProceso.pasos_completos && estadoProceso.pasos_completos.length > 3 && (
                <TouchableOpacity 
                  style={styles.verMasBotonCompleto}
                  onPress={() => setExpandirProceso(!expandirProceso)}
                >
                  <Text style={styles.verMasTextoCompleto}>
                    {expandirProceso ? 'Ver menos' : 'Ver más'}
                  </Text>
                </TouchableOpacity>
              )}

              {/* Información del técnico - siempre visible cuando hay proceso */}
              <View style={styles.tecnicoInfo}>
                {tecnicoAsignado ? (
                  <>
                    <Text style={styles.tecnicoLabel}>
                      Técnico: {tecnicoAsignado.id_usuario?.nombre} {tecnicoAsignado.id_usuario?.apellido}
                    </Text>
                    <Text style={styles.entregaLabel}>
                      Estado: {estadoProceso?.estado_general || 'En proceso'}
                    </Text>
                    <Text style={styles.notasLabel}>
                      Problema: {estadoProceso?.notas || 'Sin descripción disponible'}
                    </Text>
                  </>
                ) : (
                  <Text style={styles.tecnicoLabel}>
                    Técnico: Por asignar
                  </Text>
                )}
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default IpadDetalleScreen;