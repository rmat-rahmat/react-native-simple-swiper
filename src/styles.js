import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    position: 'relative',
    flex: 1,
  },
  wrapper: {
    backgroundColor: 'transparent',
  },
  wrapperHorizontal: {
    flex: 1,
  },
  slide: {
    backgroundColor: 'transparent',
  },
  pagination: {
    position: 'absolute',
    bottom: 25,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  paginationVertical: {
    position: 'absolute',
    right: 15,
    top: 0,
    bottom: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  dot: {
    backgroundColor: 'rgba(0,0,0,.2)',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  activeDot: {
    backgroundColor: '#007aff',
  },
  buttonWrapper: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingHorizontal: 10,
  },
  buttonText: {
    fontSize: 50,
    color: '#007aff',
  },
  dropdownButton: {
    // marginTop:20,
    padding: 10,
    backgroundColor: '#fff',
  },
  textContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  dropdownButtonText: {
    fontSize: 20,
    textAlign: 'center',
  },
  chevronDown: {
    width: 0,
    height: 0,
    borderLeftWidth: 15,
    borderLeftColor: 'transparent',
    borderRightWidth: 15,
    borderRightColor: 'transparent',
    borderTopWidth: 10,
    marginTop:5,
    marginBottom:-10
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end', // Modal starts from the bottom
    // backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  modalContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    shadowOpacity:0.8,
    // backgroundColor: '#fff',
    paddingVertical: 10,
    // paddingHorizontal: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modalBottom: {
    alignSelf: 'stretch', // Take full width
  },
});

export default styles;
