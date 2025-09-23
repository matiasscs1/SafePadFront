// styles/MainContainerStyles.js
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  menuButton: {
    padding: 8,
  },
  hamburgerMenu: {
    width: 20,
    height: 15,
    justifyContent: 'space-between',
  },
  hamburgerLine: {
    width: '100%',
    height: 2,
    backgroundColor: '#000',
    borderRadius: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000',
    marginLeft: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  
  // Estilos del menú lateral
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalBackground: {
    position: 'absolute',
    top: 0,
    left: 280,
    right: 0,
    bottom: 0,
  },
  sideMenu: {
    width: 280,
    backgroundColor: '#FFFFFF',
    paddingTop: 50,
    paddingHorizontal: 20,
    height: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  menuSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 30,
  },
  menuItems: {
    flex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    borderRadius: 8,
    marginBottom: 4,
  },
  activeMenuItem: {
    backgroundColor: '#F0F8FF',
    borderBottomColor: '#007AFF',
  },
  menuItemText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 16,
  },
  activeMenuText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  logoutText: {
    color: '#FF3B30',
  },
});