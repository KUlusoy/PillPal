import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

export default function ScannerScreen({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [camera, setCamera] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedText, setExtractedText] = useState('');

  useEffect(() => {
    if (permission && !permission.granted) {
      requestPermission();
    }
  }, [permission]);

  const takePicture = async () => {
    if (camera) {
      setIsProcessing(true);
      try {
        const photo = await camera.takePictureAsync({ quality: 1 });
        await processImage(photo.uri);
      } catch (error) {
        Alert.alert('Error', 'Failed to take picture');
        console.error(error);
      }
      setIsProcessing(false);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setIsProcessing(true);
      await processImage(result.assets[0].uri);
      setIsProcessing(false);
    }
  };

  const processImage = async (imageUri) => {
    try {
      // Note: For now, this is a placeholder for OCR processing
      // We'll implement actual OCR in the next step
      
      // Simulating OCR processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock extracted text for demonstration
      const mockText = `
MEDICATION INSTRUCTIONS

Drug Name: Amoxicillin 500mg
Take 1 tablet by mouth
Frequency: Every 8 hours
Duration: 10 days
Take with food
Start Date: ${new Date().toLocaleDateString()}

Prescriber: Dr. Smith
Pharmacy: CVS Pharmacy
      `.trim();
      
      setExtractedText(mockText);
      Alert.alert('Success', 'Text extracted! Review and confirm the details.');
      
    } catch (error) {
      Alert.alert('Error', 'Failed to process image');
      console.error(error);
    }
  };

  const confirmAndParse = () => {
    // This will parse the text and create medication schedule
    // We'll implement this in the next step
    Alert.alert(
      'Next Step',
      'This will parse the text and create your medication schedule',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Continue', 
          onPress: () => {
            // Navigate to medication details or home
            navigation.navigate('Home');
          }
        }
      ]
    );
  };

  if (!permission) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.text}>Requesting camera permission...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.text}>Camera permission required</Text>
        <Text style={styles.subText}>
          We need camera access to scan medication labels
        </Text>
        <TouchableOpacity 
          style={styles.permissionButton}
          onPress={requestPermission}
        >
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!extractedText ? (
        <>
          <CameraView 
            style={styles.camera} 
            facing="back"
            ref={ref => setCamera(ref)}
          >
            <View style={styles.cameraOverlay}>
              <View style={styles.scanFrame} />
              <Text style={styles.instructionText}>
                Position the medication label within the frame
              </Text>
            </View>
          </CameraView>

          <View style={styles.controls}>
            <TouchableOpacity
              style={styles.button}
              onPress={pickImage}
              disabled={isProcessing}
            >
              <Text style={styles.buttonText}>
                📁 Choose from Gallery
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.captureButton]}
              onPress={takePicture}
              disabled={isProcessing}
            >
              <Text style={styles.buttonText}>
                {isProcessing ? 'Processing...' : '📸 Capture'}
              </Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <ScrollView style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Extracted Text:</Text>
          <View style={styles.textBox}>
            <Text style={styles.extractedText}>{extractedText}</Text>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[styles.button, styles.retryButton]}
              onPress={() => setExtractedText('')}
            >
              <Text style={styles.buttonText}>📷 Scan Again</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.confirmButton]}
              onPress={confirmAndParse}
            >
              <Text style={styles.buttonText}>✓ Confirm & Continue</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}

      {isProcessing && (
        <View style={styles.processingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.processingText}>Processing image...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  permissionContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  permissionButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanFrame: {
    width: 300,
    height: 400,
    borderWidth: 3,
    borderColor: '#4CAF50',
    borderRadius: 10,
    backgroundColor: 'transparent',
  },
  instructionText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 10,
    borderRadius: 5,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  captureButton: {
    backgroundColor: '#2196F3',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  textBox: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  extractedText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  retryButton: {
    backgroundColor: '#FF9800',
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
  },
  processingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  processingText: {
    color: 'white',
    fontSize: 18,
    marginTop: 10,
  },
  text: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  subText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});