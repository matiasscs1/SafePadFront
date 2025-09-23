// view/screens/HomeScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  Linking,
} from 'react-native';
import { Shield } from 'lucide-react-native';
import Toast from 'react-native-toast-message';
import { styles } from '../../styles/HomeScreen.style';
import { useIpadViewModel } from '../../viewmodels/inicioViewModel';
import { useAuth } from '../../context/AuthContext'; // Importar para obtener el usuario

export default function HomeScreen() {
  const {
    loading,
    ipads,
    garantias,
    cargarIpadsPorUsuario,
    cargarGarantiasPorUsuario,
  } = useIpadViewModel();

  const { user } = useAuth(); // Obtener datos del usuario autenticado
  const [ipadPrincipal, setIpadPrincipal] = useState(null);

  // Cargar datos al montar el componente
  useEffect(() => {
    const inicializar = async () => {
      try {
        await cargarIpadsPorUsuario();
      } catch (error) {
        console.error("Error al inicializar:", error);
        
        if (error.message === "INVALID_TOKEN") {
          Toast.show({
            type: 'error',
            text1: 'Sesión expirada',
            text2: 'Por favor, inicia sesión nuevamente',
            visibilityTime: 5000,
          });
        } else {
          Toast.show({
            type: 'error',
            text1: 'Error de conexión',
            text2: error.message || 'No se pudieron cargar los iPads',
            visibilityTime: 4000,
          });
        }
      }
    };

    inicializar();
  }, []);

  // Establecer iPad principal cuando cambien los iPads
  useEffect(() => {
    const establecerIpadPrincipal = async () => {
      if (ipads && ipads.length > 0) {
        const principal = ipads[0];
        setIpadPrincipal(principal);
        await cargarGarantiasPorUsuario(principal._id);
      }
    };

    establecerIpadPrincipal();
  }, [ipads]);

  const handleIpadPress = async (ipad) => {
    try {
      setIpadPrincipal(ipad);
      await cargarGarantiasPorUsuario(ipad._id);

      // Verificar si tiene garantías
      if (!garantias || garantias.length === 0) {
        Toast.show({
          type: 'warning',
          text1: 'iPad sin garantías',
          text2: `${ipad.nombre || ipad.modelo} no tiene garantías registradas`,
        });
      } else {
        Toast.show({
          type: 'info',
          text1: `iPad seleccionado`,
          text2: `${ipad.nombre || ipad.modelo} - ${garantias.length} garantía(s)`,
        });
      }
    } catch (error) {
      console.error("Error al seleccionar iPad:", error);
      Toast.show({
        type: 'warning',
        text1: 'iPad sin información',
        text2: 'No se pudieron cargar los datos de este iPad',
      });
    }
  };

  // Función para calcular el próximo mantenimiento
  const calcularProximoMantenimiento = (garantias) => {
    if (!garantias || garantias.length === 0) {
      return null;
    }

    const hoy = new Date();
    let proximoMantenimiento = null;
    let fechaMasCercana = null;

    garantias.forEach(garantia => {
      if (garantia.estado !== 'activa') return;

      const fechaInicio = new Date(garantia.fecha_inicio);
      const fechaVencimiento = new Date(garantia.fecha_vencimiento);
      
      if (hoy > fechaVencimiento) return;

      let intervaloMeses = garantia.tipo_garantia?.toLowerCase() === 'safepad' ? 4 : 6;
      let fechaMantenimiento = new Date(fechaInicio);
      
      while (fechaMantenimiento <= fechaVencimiento) {
        if (fechaMantenimiento > hoy) {
          if (!fechaMasCercana || fechaMantenimiento < fechaMasCercana) {
            fechaMasCercana = fechaMantenimiento;
            proximoMantenimiento = {
              fecha: fechaMantenimiento,
              tipoGarantia: garantia.tipo_garantia,
              intervalo: intervaloMeses
            };
          }
          break;
        }
        fechaMantenimiento.setMonth(fechaMantenimiento.getMonth() + intervaloMeses);
      }
    });

    return proximoMantenimiento;
  };

  // Función para formatear fecha
  const formatearFechaMantenimiento = (proximoMantenimiento) => {
    if (!proximoMantenimiento) {
      return "Mantenimiento no programado";
    }

    return proximoMantenimiento.fecha.toLocaleDateString('es-ES', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    }).toUpperCase();
  };

  // Función para calcular días restantes
  const calcularDiasRestantes = (fechaVencimiento) => {
    if (!fechaVencimiento) return 0;
    
    const hoy = new Date();
    const vencimiento = new Date(fechaVencimiento);
    const diferencia = vencimiento.getTime() - hoy.getTime();
    const dias = Math.ceil(diferencia / (1000 * 3600 * 24));
    
    return dias > 0 ? dias : 0;
  };

  // Función para calcular porcentaje
  const calcularPorcentajeGarantia = (fechaInicio, fechaVencimiento) => {
    if (!fechaInicio || !fechaVencimiento) return 0;
    
    const inicio = new Date(fechaInicio);
    const vencimiento = new Date(fechaVencimiento);
    const hoy = new Date();
    
    const totalDias = vencimiento.getTime() - inicio.getTime();
    const diasTranscurridos = hoy.getTime() - inicio.getTime();
    const porcentaje = Math.max(0, Math.min(100, ((totalDias - diasTranscurridos) / totalDias) * 100));
    
    return Math.round(porcentaje);
  };

  const proximoMantenimiento = calcularProximoMantenimiento(garantias);

  // Loading state
  if (loading && ipads.length === 0) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={{ marginTop: 10 }}>Cargando iPads...</Text>
      </View>
    );
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      {/* Saludo con nombre del usuario */}
      <View style={styles.greetingSection}>
        <Shield color="#007AFF" size={24} strokeWidth={2} />
        <Text style={styles.brandLabel}>SAFEPAD</Text>
      </View>
      <Text style={styles.greeting}>
        Hey, {user?.nombre || user?.email?.split('@')[0] || 'Usuario'}!
      </Text>

      {/* Círculos de iPads */}
      <View style={styles.ipadsSection}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {ipads && ipads.length > 0 ? (
            ipads.map((ipad, index) => (
              <TouchableOpacity 
                key={ipad._id || index} 
                style={[
                  styles.ipadEllipse, 
                  ipadPrincipal && ipadPrincipal._id === ipad._id && styles.selectedIpad
                ]}
                onPress={() => handleIpadPress(ipad)}
              >
                <Text style={[
                  styles.ipadSerial, 
                  ipadPrincipal && ipadPrincipal._id === ipad._id && styles.selectedIpadText
                ]}>
                  {ipad.nombre || ipad.modelo || 'iPad'}
                </Text>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.ipadEllipse}>
              <Text style={styles.ipadSerial}>Sin iPads</Text>
            </View>
          )}
        </ScrollView>
      </View>

      {/* Card del iPad principal */}
      {ipadPrincipal && (
        <View style={styles.mainCard}>
          <View style={styles.ipadImageContainer}>
            <Image 
              source={{ uri: 'https://locosphone.com/wp-content/uploads/2023/03/apple-ipad-pro-1000-gb-wi-fi-4g-gris.webp' }}
              style={styles.ipadImage}
              onError={() => {}}
            />
          </View>
          <View style={styles.ipadInfo}>
            <Text style={styles.serialText}>*{ipadPrincipal.serial_ipad || 'N/A'}</Text>
            <Text style={styles.modelText}>{ipadPrincipal.modelo || 'iPad'}</Text>
          </View>
        </View>
      )}

      {/* Próximo mantenimiento */}
      <View style={styles.maintenanceCard}>
        <View style={styles.maintenanceInfo}>
          <Text style={styles.maintenanceTitle}>Tu siguiente mantenimiento</Text>
          <Text style={styles.maintenanceDate}>
            {formatearFechaMantenimiento(proximoMantenimiento)}
          </Text>
          {proximoMantenimiento && (
            <Text style={[styles.characteristicsText, { fontSize: 12, marginTop: 4 }]}>
              Garantía: {proximoMantenimiento.tipoGarantia === 'apple' ? 'Apple' : 'SafePad'} 
              {proximoMantenimiento.tipoGarantia === 'apple' ? ' (cada 6 meses)' : ' (cada 4 meses)'}
            </Text>
          )}
        </View>
      </View>

      {/* Tienda SafePad con mapa */}
      <View style={styles.storeCard}>
        <View style={styles.storeHeader}>
          <View style={styles.storeIconContainer}>
            <View style={styles.locationPin} />
          </View>
          <View style={styles.storeInfo}>
            <Text style={styles.storeTitle}>Tienda SafePad - Quito</Text>
            <Text style={styles.storeAddress}>Av. Amazonas y Naciones Unidas, Quito</Text>
          </View>
        </View>
        
        <View style={styles.mapContainer}>
          <Image 
            source={{ uri: 'https://i.pinimg.com/1200x/54/a4/ad/54a4ad231aea330a6ea36a28f36d2b76.jpg' }}
            style={styles.mapImage}
            
          />
          
          <TouchableOpacity 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'transparent'
            }}
            onPress={() => {
              Toast.show({
                type: 'info',
                text1: 'Abriendo ubicación',
                text2: 'Tienda SafePad - Av. Amazonas, Quito',
                visibilityTime: 3000,
              });
              
              const googleMapsUrl = 'https://maps.app.goo.gl/n5q3JTfLjxtpsNqG7?g_st=ipc';
              
              Linking.canOpenURL(googleMapsUrl)
                .then(supported => {
                  if (supported) {
                    return Linking.openURL(googleMapsUrl);
                  } else {
                    return Linking.openURL('https://maps.google.com/?q=-0.1807,-78.4678');
                  }
                })
                .catch(err => {
                  console.error('Error abriendo mapa:', err);
                  Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'No se pudo abrir el mapa',
                  });
                });
            }}
          >
          </TouchableOpacity>
        </View>
      </View>

      {/* Garantías */}
      <View style={styles.guaranteeCard}>
        <Text style={styles.guaranteeTitle}>Garantías</Text>
        
        {garantias && garantias.length > 0 ? (
          garantias.map((garantia, index) => {
            const diasRestantes = calcularDiasRestantes(garantia.fecha_vencimiento);
            const porcentaje = calcularPorcentajeGarantia(garantia.fecha_inicio, garantia.fecha_vencimiento);
            
            return (
              <View key={garantia._id || index} style={styles.guaranteeItem}>
                <View style={styles.guaranteeHeader}>
                  <Text style={styles.guaranteeLabel}>
                    {garantia.tipo_garantia === 'apple' ? 'Apple' : 
                     garantia.tipo_garantia === 'safepad' ? 'SafePad' : 
                     garantia.tipo_garantia || 'Garantía'}
                  </Text>
                  <Text style={styles.guaranteeDays}>
                    {diasRestantes > 0 ? `${diasRestantes} días restantes` : 'Vencida'}
                  </Text>
                </View>
                <View style={styles.progressBarContainer}>
                  <View style={[
                    styles.progressBar, 
                    { width: `${porcentaje}%` }
                  ]} />
                </View>
              </View>
            );
          })
        ) : (
          <View style={styles.guaranteeItem}>
            <View style={styles.guaranteeHeader}>
              <Text style={styles.guaranteeLabel}>Sin garantías registradas</Text>
              <Text style={styles.guaranteeDays}>-</Text>
            </View>
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { width: '0%', backgroundColor: '#E0E0E0' }]} />
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}