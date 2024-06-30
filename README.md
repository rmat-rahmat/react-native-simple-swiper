# React Native Simple Swiper

A customizable React Native Swiper component.

## Installation

To install the component, run the following command:

```sh
npm install react-native-simple-swiper
```

#### Using Yarn

If you prefer using Yarn, you can install the component with:

```sh
yarn add react-native-simple-swiper
```

## Usage

Here is a basic example of how to use the Swiper component in your React Native project:

```jsx
import React from 'react';
import { View, Text } from 'react-native';
import Swiper from 'react-native-simple-swiper';

const App = () => (
  <Swiper 
    horizontal={true}
    index={0}
    headerDropdown={['Slide 1', 'Slide 2', 'Slide 3']}
    onIndexChanged={(index) => console.log('Index changed to:', index)}
    loadAll={false}
    scrollViewStyle={{ backgroundColor: '#f0f0f0' }}
    containerStyle={{ flex: 1 }}
    headerStyle={{ height: 50 }}
    dir='x'
  >
    <View style={{ flex: 1, backgroundColor: 'red' }}>
      <Text>Slide 1</Text>
    </View>
    <View style={{ flex: 1, backgroundColor: 'green' }}>
      <Text>Slide 2</Text>
    </View>
    <View style={{ flex: 1, backgroundColor: 'blue' }}>
      <Text>Slide 3</Text>
    </View>
  </Swiper>
);

export default App;
```

## Props

The Swiper component accepts the following props:

| Prop Name        | Type                              | Default Value  | Description                                               |
|------------------|-----------------------------------|----------------|-----------------------------------------------------------|
| `horizontal`     | `bool`                            | `true`         | Determines if the swiper scrolls horizontally.             |
| `children`       | `node`                            | `required`     | The content to be rendered within the swiper.              |
| `index`          | `number`                          | `0`            | The initial index of the swiper.                           |
| `headerDropdown` | `array`                           | `[]`           | Array of items for the header dropdown.                    |
| `onIndexChanged` | `func`                            | `() => {}`     | Callback function called when the index changes.           |
| `loadAll`        | `bool`                            | `false`        | If true, loads all slides; otherwise, loads partially.     |
| `scrollViewStyle` | `object` or `number`              | `undefined`    | Custom styles for the ScrollView.                          |
| `containerStyle` | `object` or `number`              | `undefined`    | Custom styles for the container View.                      |
| `headerStyle`    | `object` or `number`              | `undefined`    | Custom styles for the header.                              |
| `dir`            | `string`                          | `'x'`          | Direction of the swiper, either 'x' for horizontal or 'y' for vertical. |

## Development

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed.

### Setup

Clone the repository and install the dependencies:

```sh
git clone https://github.com/rmat-rahmat/react-native-simple-swiper.git
cd react-native-simple-swiper
npm install
```

### Building the project

To build the project, run:

```sh
npm run build
```

This will compile the source files in the `src` directory to the `lib` directory.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any bugs or feature requests.

## License

This project is licensed under the MIT License.
