// styles/HomeContentStyles.js
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  greetingSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 8,
  },
  brandLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
    marginLeft: 8,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
  ipadsSection: {
    marginBottom: 20,
  },
  ipadEllipse: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: '#E5E5E5',
    borderRadius: 20,
    marginRight: 12,
    minWidth: 100,
    alignItems: 'center',
  },
  selectedIpad: {
    backgroundColor: '#007AFF',
  },
  ipadSerial: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  selectedIpadText: {
    color: '#FFFFFF',
  },
  mainCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 30,
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
    marginRight: 25,
    flex: 0.4,
  },
  ipadImage: {
    width: '100%',
    aspectRatio: 3 / 4, 
    borderRadius: 8,
    backgroundColor: '#F0F0F0',
    minHeight: 130, 
  },
  ipadInfo: {
    flex: 0.6,
    justifyContent: 'center',
  },
  serialText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  modelText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  characteristicsText: {
    fontSize: 14,
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
  maintenanceCard: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
  },
  maintenanceInfo: {
    alignItems: 'flex-start',
  },
  maintenanceTitle: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  maintenanceDate: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  storeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  storeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  storeIconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  locationPin: {
    width: 8,
    height: 8,
    backgroundColor: '#FF3B30',
    borderRadius: 4,
  },
  storeInfo: {
    flex: 1,
  },
  storeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  storeAddress: {
    fontSize: 14,
    color: '#666',
  },
  mapContainer: {
    height: 250,
    borderRadius: 8,
    overflow: 'hidden',
  },
  mapImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#E5E5E5',
  },
  guaranteeCard: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  guaranteeTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  guaranteeItem: {
    marginBottom: 12,
  },
  guaranteeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  guaranteeLabel: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  guaranteeDays: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 3,
  },
});