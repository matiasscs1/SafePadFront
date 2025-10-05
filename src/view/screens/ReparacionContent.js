// view/screens/ReparacionScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  Image,
  Linking
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useReparacionIpadViewModel } from '../../viewmodels/reparacionIpadViewModel';
import { styles } from '../../styles/reparacionStyles';
import Toast from 'react-native-toast-message';

const ReparacionScreen = () => {
  const {
    ipads,
    loading,
    refreshing,
    ipadSeleccionado,
    procesoReparacionActual,
    tecnicoAsignado,
    piezasProceso,
    fotosDanio,
    seleccionarIpad,
    onRefresh,
    formatearFecha,
    obtenerEstadoProceso,
    obtenerProgresoReparacion,
  } = useReparacionIpadViewModel();

  const [expandirProceso, setExpandirProceso] = useState(false);

  const estadoProceso = obtenerEstadoProceso();
  const progreso = obtenerProgresoReparacion();

  const handleContactarWhatsApp = () => {
    const telefono = tecnicoAsignado?.telefono || '593991079381';
    const mensaje = `Hola, me gustaría información sobre mi reparación del iPad ${ipadSeleccionado?.modelo || ''}`;
    const url = `whatsapp://send?phone=${telefono}&text=${encodeURIComponent(mensaje)}`;
    
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'No se puede abrir WhatsApp'
          });
        }
      })
      .catch((err) => {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Error al abrir WhatsApp'
        });
      });
  };

  const renderPieza = (pieza, index) => {
    const recibida = pieza.estado?.toLowerCase() === 'recibida' || pieza.estado?.toLowerCase() === 'completada';
    
    return (
      <View key={index} style={styles.piezaItem}>
        <View style={styles.piezaIcon}>
          <Text style={styles.piezaIconText}>📦</Text>
        </View>
        <View style={styles.piezaInfo}>
          <Text style={styles.piezaNombre}>{pieza.nombre_pieza || 'Pieza sin nombre'}</Text>
          <Text style={styles.piezaETA}>
            ETA {pieza.fecha_recibida ? formatearFecha(pieza.fecha_recibida) : 'Por confirmar'}
          </Text>
        </View>
        {recibida && (
          <View style={styles.estadoBadge}>
            <Text style={styles.estadoBadgeText}>Recibida</Text>
          </View>
        )}
      </View>
    );
  };

  const renderEstadoProceso = (paso, index) => {
    const completado = paso.estado === 'completado';
    
    return (
      <View key={index} style={styles.estadoProcesoItem}>
        <View style={styles.estadoHeader}>
          <Text style={styles.estadoTitulo}>{paso.titulo}</Text>
          <Text style={styles.estadoFecha}>{paso.fecha ? formatearFecha(paso.fecha) : ''}</Text>
        </View>
        <Text style={styles.estadoDescripcion}>{paso.descripcion || 'Sin descripción'}</Text>
        {paso.detalles && paso.detalles.length > 0 && (
          <View style={styles.detallesContainer}>
            {paso.detalles.map((detalle, idx) => (
              <Text key={idx} style={styles.detalleTexto}>• {detalle}</Text>
            ))}
          </View>
        )}
      </View>
    );
  };

  const renderFoto = (url, index) => {
    return (
      <View key={index} style={styles.fotoContainer}>
        <Image 
          source={{ uri: url }}
          style={styles.fotoImage}
          resizeMode="cover"
        />
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

  // Si no hay proceso de reparación o está completado
  if (!procesoReparacionActual || estadoProceso?.estado_general === 'completado') {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={styles.scrollContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {/* Selector de iPads */}
          {ipads && ipads.length > 1 && (
            <View style={styles.selectorSection}>
              <Text style={styles.selectorTitle}>Selecciona tu iPad</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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

          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>✓</Text>
            <Text style={styles.emptyTitle}>Reparación Completada</Text>
            <Text style={styles.emptyText}>
              Tu iPad ha sido reparado exitosamente y no tiene procesos activos
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Solo mostrar todo cuando el estado es "en_proceso"
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Selector de iPads */}
        {ipads && ipads.length > 1 && (
          <View style={styles.selectorSection}>
            <Text style={styles.selectorTitle}>Selecciona tu iPad</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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

        {/* Piezas y Logística */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Piezas y logística</Text>
          {piezasProceso && piezasProceso.length > 0 ? (
            <View style={styles.piezasContainer}>
              {piezasProceso.map((pieza, index) => renderPieza(pieza, index))}
            </View>
          ) : (
            <View style={styles.sinPiezasContainer}>
              <Text style={styles.sinPiezasTexto}>📦 Aún no hay piezas por cambiar</Text>
            </View>
          )}
        </View>

        {/* Proceso Detallado */}
        <View style={[styles.card, styles.procesoCard]}>
          <View style={styles.procesoHeader}>
            <Text style={styles.cardTitleBlanco}>Proceso detallado</Text>
            <TouchableOpacity 
              style={styles.verMasButton}
              onPress={() => setExpandirProceso(!expandirProceso)}
            >
              <Text style={styles.verMasTexto}>Ver más ⌄</Text>
            </TouchableOpacity>
          </View>

          {estadoProceso && estadoProceso.pasos_completos && estadoProceso.pasos_completos.length > 0 ? (
            <>
              <View style={styles.estadosProcesoContainer}>
                {estadoProceso.pasos_completos
                  .slice(0, expandirProceso ? estadoProceso.pasos_completos.length : 2)
                  .map((paso, index) => renderEstadoProceso(paso, index))}
              </View>

              {estadoProceso.pasos_completos.length > 2 && (
                <TouchableOpacity 
                  style={styles.verMasBotonCompleto}
                  onPress={() => setExpandirProceso(!expandirProceso)}
                >
                  <Text style={styles.verMasTextoCompleto}>
                    {expandirProceso ? 'Ver menos' : 'Ver más'}
                  </Text>
                </TouchableOpacity>
              )}
            </>
          ) : (
            <View style={styles.sinEstadosContainer}>
              <Text style={styles.sinEstadosTexto}>
                No hay estados registrados aún
              </Text>
            </View>
          )}
        </View>

        {/* Fotos del Daño y Contacto */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Fotos del daño y contacto</Text>
          
          {fotosDanio && fotosDanio.length > 0 ? (
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.fotosScrollContainer}
            >
              {fotosDanio.map((foto, fotoIndex) => 
                foto.foto_url && foto.foto_url.length > 0 
                  ? foto.foto_url.map((url, urlIndex) => 
                      renderFoto(url, `${fotoIndex}-${urlIndex}`)
                    )
                  : null
              )}
            </ScrollView>
          ) : (
            <View style={styles.sinFotosContainer}>
              <Text style={styles.sinFotosTexto}>📷 Sin fotos disponibles</Text>
            </View>
          )}

          <TouchableOpacity 
            style={styles.whatsappButton}
            onPress={handleContactarWhatsApp}
          >
            <Text style={styles.whatsappTexto}>Contactar por WhatsApp</Text>
          </TouchableOpacity>
        </View>

        {/* Información del Técnico */}
        {tecnicoAsignado && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Técnico Asignado</Text>
            <View style={styles.tecnicoContainer}>
              <View style={styles.tecnicoAvatar}>
                <Text style={styles.tecnicoAvatarTexto}>
                  {tecnicoAsignado.nombre?.charAt(0) || 'T'}
                </Text>
              </View>
              <View style={styles.tecnicoInfo}>
                <Text style={styles.tecnicoNombre}>
                  {tecnicoAsignado.nombre} {tecnicoAsignado.apellido}
                </Text>
                <Text style={styles.tecnicoEspecialidad}>
                  Técnico especializado
                </Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ReparacionScreen;