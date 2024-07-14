import { Component, ReactNode } from 'react';
import { ViewStyle, StyleProp } from 'react-native';

export interface SwiperProps {
  horizontal?: boolean;
  children: ReactNode;
  index?: number;
  loadAll?: boolean;
  headerDropdown?: string[];
  onIndexChanged?: (index: number) => void;
  scrollViewStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  slideStyle?: StyleProp<ViewStyle>;
  headerStyle?: StyleProp<ViewStyle>;
  iosDropdownStyle?: StyleProp<ViewStyle>;
  dir?: 'x' | 'y';
  momentumScroll?: boolean;
}

export default class Swiper extends Component<SwiperProps> {}
