import React, { ReactNode } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';

const { width, height } = Dimensions.get('window');

interface CustomModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children?: ReactNode;
  showCloseButton?: boolean;
  closeOnBackdropPress?: boolean;
  animationType?: 'none' | 'slide' | 'fade';
  containerStyle?: object;
  contentStyle?: object;
}

export const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  onClose,
  title,
  children,
  showCloseButton = true,
  closeOnBackdropPress = true,
  animationType = 'fade',
  containerStyle,
  contentStyle,
}) => {
  const handleBackdropPress = () => {
    if (closeOnBackdropPress) {
      onClose();
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType={animationType}
      onRequestClose={onClose} // Android back button support
    >
      <TouchableWithoutFeedback onPress={handleBackdropPress}>
        <View style={[styles.overlay, containerStyle]}>
          <TouchableWithoutFeedback>
            <View style={[styles.modalContainer, contentStyle]}>
              {title && (
                <View style={styles.header}>
                  <Text style={styles.title}>{title}</Text>
                  {showCloseButton && (
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                      <Text style={styles.closeButtonText}>✕</Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
              
              {!title && showCloseButton && (
                <TouchableOpacity onPress={onClose} style={styles.closeButtonAbsolute}>
                  {/* <Text style={styles.closeButtonText}>✕</Text> */}
                </TouchableOpacity>
              )}
              
              <View style={{}}>
                {children}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    // backgroundColor: 'white',
    borderRadius: 12,
    width: width * 0.85,
    maxHeight: height * 0.7,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  closeButton: {
    padding: 4,
  },
  closeButtonAbsolute: {
    position: 'absolute',
    right: 12,
    top: 12,
    zIndex: 1,
    padding: 8,
  },
  closeButtonText: {
    fontSize: 20,
    color: '#999',
    fontWeight: '500',
  },
  content: {
    padding: 20,
  },
});