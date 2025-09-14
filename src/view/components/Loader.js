import React from 'react';
import { View, ActivityIndicator, Modal, StyleSheet } from 'react-native';

export default function Loader({ visible = false }) {
  if (!visible) return null;

  return (
    <Modal transparent animationType="fade">
      <View style={styles.overlay}>
        <ActivityIndicator size="large" color="#39FF14" /> {/* Verde fosforescente */}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
