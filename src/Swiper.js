import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  StyleSheet,
  Platform,
  Modal,
  TouchableOpacity,
  Text
} from 'react-native';
import { Picker, PickerIOS } from '@react-native-picker/picker';
import styles from './styles';

/**
 * Swiper Component
 * A custom swiper component for React Native, supporting horizontal and vertical swiping,
 * lazy loading of slides, and optional header dropdown for quick navigation.
 * 
 * @param {Object} props - Component properties
 * @param {boolean} props.horizontal - Determines the orientation of the swiper (default: true)
 * @param {Array} props.children - Slide components to be rendered inside the swiper
 * @param {number} props.index - Initial index of the active slide (default: 0)
 * @param {Array} props.headerDropdown - Array of dropdown items for header navigation
 * @param {function} props.onIndexChanged - Callback function triggered on index change
 * @param {boolean} props.loadAll - Flag to load all slides at once or lazily (default: false)
 * @param {Object|number} props.scrollViewStyle - Custom styles for the ScrollView
 * @param {Object|number} props.containerStyle - Custom styles for the container
 * @param {Object|number} props.headerStyle - Custom styles for the header
 * @param {string} props.dir - Direction of the swiper ('x' for horizontal, 'y' for vertical)
 */
const Swiper = ({
  horizontal = true,
  children,
  index: initialIndex = 0,
  headerDropdown = [],
  onIndexChanged = () => { },
  loadAll = false,
  scrollViewStyle,
  containerStyle,
  slideStyle,
  headerStyle,
  iosDropdownStyle,
  dir = 'x',
  momentumScroll = false,
}) => {
  // State to manage the current index of the swiper
  const [index, setIndex] = useState(initialIndex);
  // State to manage the dimensions of the device screen
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  // Convert children to an array of slides for rendering
  const slides = useMemo(() => React.Children.toArray(children), [children]);
  // Ref to access the ScrollView component
  const scrollViewRef = useRef(null);

  const [modalVisible, setModalVisible] = useState(false);

  // Function to update the current index based on scroll offset
  const updateIndex = useCallback((offset, layout, cb) => {
    const calculatedIndex = offset[dir] / (dir === 'x' ? layout.width : layout.height) ?? index;
    let newIndex;
    if (calculatedIndex - index > 0.2) {
      newIndex = Math.ceil(calculatedIndex);
    } else if (calculatedIndex - index < -0.2) {
      newIndex = Math.floor(calculatedIndex);
    } else {
      newIndex = Math.round(calculatedIndex);
    }
    setIndex(newIndex);
    cb?.(newIndex);
    onIndexChanged(newIndex);
  }, [dir, index, onIndexChanged]);

  // Callback for handling the end of scroll events
  const onScrollEnd = useCallback(({ nativeEvent }) => {
    const { contentOffset, layoutMeasurement } = nativeEvent;
    if (momentumScroll) {
      const velocity = nativeEvent.velocity[dir] ?? 0;
      if (Math.abs(velocity) < 6) {
        updateIndex(contentOffset, layoutMeasurement, pageScroll);
      }
    }
    else if ((nativeEvent.velocity?.[dir] ?? 0) === 0) {
      updateIndex(contentOffset, layoutMeasurement);
    }
  }, [updateIndex]);

  // Function to scroll to a specific page
  const pageScroll = useCallback((page) => {
    scrollViewRef.current.scrollTo({
      [horizontal ? 'x' : 'y']: page * (horizontal ? dimensions.width : dimensions.height),
      animated: true,
    });
  }, [horizontal, dimensions]);

  // Function to render all slides
  const renderSlides = () => slides.map((child, i) => (
    <View
      style={[
        styles.slide,
        dir === 'x' ? { width: dimensions.width } : { height: dimensions.height },
        slideStyle
      ]}
      key={i}
    >
      {child}
    </View>
  ));


  // Function to render slides lazily with an ActivityIndicator for non-active slides
  const renderPartialSlides = useMemo(() => slides.map((child, i) => (
    <View style={[
      styles.slide,
      dir === 'x' ? { width: dimensions.width } : { height: dimensions.height },
      slideStyle
    ]} key={i}>
      {Math.abs(i - index) < 2 ? child :
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#999999" />
        </View>}
    </View>
  )), [slides, dimensions, index]);

  // Function to render dropdown items for header navigation
  const renderDropdownItems = () => headerDropdown.map((val, i) => (
    <Picker.Item label={val} value={i} key={i} />
  ));

  return (
    <View style={[styles.container, containerStyle]}>
      {headerDropdown.length > 0 && (
        Platform.OS === 'ios' ? (
          <TouchableOpacity
            style={[styles.dropdownButton,headerStyle]}
            onPress={() => setModalVisible(true)}
          >
            <View style={styles.textContainer}>
              <Text style={styles.dropdownButtonText}>
                {headerDropdown[index]}
              </Text>
              <View style={[styles.chevronDown, { borderColor: headerStyle?.dropdownColor || 'black' }]} />
            </View>
          </TouchableOpacity>
        ) : (
          <Picker
            numberOfLines={3}
            style={[headerStyle]}
            selectedValue={index}
            onValueChange={(itemIndex) => {
              setIndex(itemIndex);
              pageScroll(itemIndex);
            }}
          >
            {renderDropdownItems()}
          </Picker>
        )
      )}
     
      <ScrollView
        ref={scrollViewRef}
        pagingEnabled={!momentumScroll}
        horizontal={horizontal}
        onMomentumScrollEnd={onScrollEnd}
        onScrollEndDrag={onScrollEnd}
        style={scrollViewStyle}
      >
        {loadAll ? renderSlides() : renderPartialSlides}
      </ScrollView>
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)} // Close modal on overlay press
        >
          
        </TouchableOpacity>
        <View style={[styles.modalContent, styles.modalBottom,iosDropdownStyle]}>
            <PickerIOS 
            numberOfLines={3}
              style={[styles.pickerIOS, headerStyle]}
              selectedValue={index}
              onValueChange={(itemValue, itemIndex) => {
                setIndex(itemValue);
                pageScroll(itemIndex);
              }}
            >
              {renderDropdownItems()}
            </PickerIOS>
          </View>
      </Modal>
    </View>
  );
};

// Define prop types for the Swiper component
Swiper.propTypes = {
  horizontal: PropTypes.bool,
  children: PropTypes.node.isRequired,
  index: PropTypes.number,
  loadAll: PropTypes.bool,
  headerDropdown: PropTypes.array,
  onIndexChanged: PropTypes.func,
  scrollViewStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  slideStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  headerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  iosDropdownStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  dir: PropTypes.string,
};

export default Swiper;
