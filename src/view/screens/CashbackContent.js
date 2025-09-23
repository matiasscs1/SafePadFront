import React from 'react';
import { View, Text } from 'react-native';

export default function CashbackContent() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#333' }}>
        Hola Cashback
      </Text>
      <Text style={{ fontSize: 16, color: '#666', marginTop: 10, textAlign: 'center' }}>
        Aquí irá todo el contenido de la pantalla de Cashback
      </Text>
    </View>
  );
}