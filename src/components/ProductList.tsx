import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
  Modal,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import {
  addProduct,
  fetchProducts,
} from '../actions/productActions';

const ProductList: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();
  const products = useSelector((state: any) => state.products.products);
  const loading = useSelector((state: any) => state.products.loading);
  const [newProduct, setNewProduct] = useState({
    title: '',
    price: '',
    description: '',
    image: '',
    category: '',
  });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddProduct = () => {
    dispatch(addProduct(newProduct));
    setModalVisible(false);
  };

  const handleOpenGallery = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      });
      setSelectedImage(image.path);
      setNewProduct({
        ...newProduct,
        image: image.path,
      });
      console.log('image.path', image.path);
    } catch (error) {
      console.log('Error opening gallery:', error);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View>
      <ScrollView>
        <View style={styles.mainContainer}>
          <FlatList
            data={products}
            keyExtractor={item => item.id.toString()}
            numColumns={2}
            renderItem={({item}) => (
              <View style={styles.productContainer}>
                <Image source={{uri: item.image}} style={styles.productImage} />
                <View style={styles.divider} />
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.price}>${item.price}</Text>
              </View>
            )}
          />
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.addProductButton}
        onPress={() => setModalVisible(true)}>
        <Image
          style={styles.addProductIcon}
          source={require('../assets/addProduct.png')}
        />
      </TouchableOpacity>
      <Modal visible={isModalVisible}  transparent={true}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <TextInput
              placeholder="Title"
              value={newProduct.title}
              style={styles.inputStyle}
              onChangeText={text => setNewProduct({...newProduct, title: text})}
            />
            <TextInput
              placeholder="Price"
              style={styles.inputStyle}
              value={newProduct.price.toString()}
              onChangeText={text =>
                setNewProduct({...newProduct, price: parseFloat(text)})
              }
              keyboardType="numeric"
            />
            <TextInput
              placeholder="Description"
              value={newProduct.description}
              style={styles.inputStyle}
              onChangeText={text =>
                setNewProduct({...newProduct, description: text})
              }
            />
            <TouchableOpacity onPress={handleOpenGallery}>
              <Text>Open Gallery</Text>
              {selectedImage && (
                <Image
                  source={{uri: selectedImage}}
                  style={{width: 100, height: 100}}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={handleAddProduct}>
              <Text style={{color: 'blue', textAlign: 'center'}}>
                Add Product
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={{color: 'red', textAlign: 'center'}}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ProductList;

const styles = StyleSheet.create({
  productContainer: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 20,
    margin: 7,
    padding: 10,
    gap: 12,
  },
  mainContainer: {
    backgroundColor: '#D3D3D3',
  },
  productImage: {
    height: 100,
    width: 100,
    resizeMode: 'center',
    alignSelf: 'center',
  },
  title: {
    fontSize: 12,
    fontWeight: '500',
    color: 'black',
    bottom: 5,
  },
  divider: {
    width: 120,
    borderWidth: 0.4,
    borderColor: 'black',
    alignSelf: 'center',
  },
  price: {
    color: 'black',
    left: 10,
    fontSize: 15,
    fontWeight: '600',
    position: 'absolute',
    bottom: 2,
  },
  addProductButton: {
    backgroundColor: '#778899',
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: 20,
    left: '78%',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addProductIcon: {width: 70, height: 70, resizeMode: 'center'},
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalContainer: {
    width: '80%',
    gap: 20,
    padding: 30,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  inputStyle: {
    borderRadius: 10,
    borderWidth: 0.7,
    borderColor: 'black',
    paddingLeft: 10,
  },
});
