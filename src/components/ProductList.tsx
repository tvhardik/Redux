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
  Animated,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import {
  addProduct,
  deleteProduct,
  fetchProducts,
  updateProduct,
} from '../actions/productActions';
import Modal from 'react-native-modal';
import StarRating from 'react-native-star-rating';
import {Product} from '../types/productTypes';

const ProductList: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);

  const dispatch = useDispatch();
  const products = useSelector((state: any) => state.products.products);
  console.log('products', products);
  const loading = useSelector((state: any) => state.products.loading);

  const [newProduct, setNewProduct] = useState<any>({
    title: '',
    price: '',
    image: '',
  });

  const [updatedProduct, setUpdatedProduct] = useState({
    title: '',
    price: '',
    image: '',
  });

  const handleUpdateProduct = (productId: number) => {
    setUpdateModalVisible(true);
    const productToUpdate = products.find(
      (product: Product) => product.id === productId,
    );
    setUpdatedProduct({
      title: productToUpdate.title,
      price: productToUpdate.price.toString(),
      image: productToUpdate.image,
    });
  };
  const highRatedProducts = products.filter(
    item => item.rating.rate >= 4 && item.rating.rate <= 5,
  );

  const handleSaveUpdate = () => {
    closeModal();
    dispatch(updateProduct({productId: selectedProduct.id, updatedProduct}));
    setUpdateModalVisible(false);
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddProduct = () => {
    dispatch(addProduct(newProduct));
    setIsModalVisible(false);
  };

  const openModal = (item: any) => {
    setSelectedProduct(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedProduct(null);
  };

  const handleDeleteProduct = (productId: number) => {
    dispatch(deleteProduct(productId));
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
      setUpdatedProduct({
        ...updatedProduct,
        image: image.path,
      });
      console.log('image.path', image.path);
    } catch (error) {
      console.log('Error opening gallery:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <View>
      <ScrollView>
        <View style={styles.mainContainer}>
          {/* <Text
            style={{
              fontSize: 20,
              fontWeight: '700',
              color: 'black',
              padding: 12,
            }}>
            High rated products
          </Text> */}
          <View
            style={{
              backgroundColor: '#778899',
              height: 70,
              borderBottomRightRadius: 30,
              borderBottomLeftRadius: 30,
              marginBottom: 20,
            }}
          />
          <FlatList
            data={highRatedProducts}
            keyExtractor={item => item.id.toString()}
            horizontal
            pagingEnabled
            snapToAlignment="center"
            decelerationRate="fast"
            renderItem={({item}) => (
              <TouchableOpacity
                style={{flex: 1}}
                onPress={() => openModal(item)}>
                <View style={styles.productContainer}>
                  <Image
                    source={{uri: item.image}}
                    style={styles.productImage}
                  />
                  <View style={styles.divider} />
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.price}>${item.price}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
          <View
            style={{
              height: 40,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '700',
                color: 'black',
                paddingHorizontal: 20,
              }}>
              More Product
            </Text>
          </View>
          <FlatList
            data={products}
            keyExtractor={item => item.id.toString()}
            numColumns={2}
            renderItem={({item}) => (
              <TouchableOpacity
                style={{flex: 1}}
                onPress={() => openModal(item)}>
                <View style={styles.productContainer}>
                  <Image
                    source={{uri: item.image}}
                    style={styles.productImage}
                  />
                  <View style={styles.divider} />
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.price}>${item.price}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
        <Modal isVisible={updateModalVisible}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <TextInput
                placeholder="Updated Title"
                value={updatedProduct.title}
                style={styles.inputStyle}
                onChangeText={text =>
                  setUpdatedProduct({...updatedProduct, title: text})
                }
              />
              <TextInput
                placeholder="Updated Price"
                style={styles.inputStyle}
                value={updatedProduct.price}
                onChangeText={text =>
                  setUpdatedProduct({...updatedProduct, price: text})
                }
                keyboardType="numeric"
              />
              <TouchableOpacity onPress={handleOpenGallery}>
                <Text
                  style={{color: 'black', fontSize: 13, textAlign: 'center'}}>
                  Open Gallery
                </Text>
                {/* <Image
                  style={styles.addProductIcon}
                  source={require('../assets/photoadd.png')}
                /> */}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.grayButton}
                onPress={handleSaveUpdate}>
                <Text style={styles.text}>Save Update</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.lightGrayButton}
                onPress={() => setUpdateModalVisible(false)}>
                <Text style={styles.text}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Modal
          isVisible={modalVisible}
          onBackdropPress={closeModal}
          swipeDirection="down"
          style={{justifyContent: 'flex-end', margin: 0}}>
          <View style={styles.openEndModalContanier}>
            {selectedProduct && (
              <View style={{gap: 10}}>
                <Text style={styles.SelectedProductTitle}>
                  {selectedProduct.title}
                </Text>
                <Image
                  source={{uri: selectedProduct.image}}
                  style={styles.SelectedProductImage}
                />
                <Text style={styles.SelectedProductCategory}>
                  {selectedProduct.category}
                </Text>

                <View style={{paddingHorizontal: 80, gap: 10}}>
                  <StarRating
                    disabled={true}
                    maxStars={5}
                    rating={selectedProduct?.rating?.rate}
                    starSize={15}
                    emptyStar={require('../assets/star1.png')}
                    fullStar={require('../assets/star.png')}
                    halfStar={require('../assets/star.png')}
                  />
                </View>
                <Text style={styles.SelectedProductPrice}>
                  ${selectedProduct.price}
                </Text>
                <View style={{gap: 10}}>
                  <TouchableOpacity
                    style={styles.grayButton}
                    onPress={() => handleDeleteProduct(selectedProduct.id)}>
                    <Text style={styles.text}>Product Delete</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.lightGrayButton}
                    onPress={() => handleUpdateProduct(selectedProduct.id)}>
                    <Text style={styles.text}>Product Update</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </Modal>
      </ScrollView>
      <TouchableOpacity
        style={styles.addProductButton}
        onPress={() => setIsModalVisible(true)}>
        <Image
          style={styles.addProductIcon}
          source={require('../assets/addProduct.png')}
        />
      </TouchableOpacity>
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            {/* <View style={{backgroundColor: 'pink'}}> */}
            <Text style={styles.newProductAddText}>Add New Product</Text>
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
                setNewProduct({...newProduct, price: Number(text)})
              }
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.text} onPress={handleOpenGallery}>
              <Text style={{color: 'black', fontSize: 13, textAlign: 'center'}}>
                Open Gallery
              </Text>
              {/* <Image
                style={styles.addProductIcon}
                source={require('../assets/photoadd.png')}
              /> */}
              {/* {selectedImage && (
                <Image
                  source={{uri: selectedImage}}
                  style={{borderRadius: 60, width: 100, height: 100}}
                />
              )} */}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.grayButton}
              onPress={handleAddProduct}>
              <Text style={styles.text}>Add Product</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.lightGrayButton}
              onPress={() => setIsModalVisible(false)}>
              <Text style={styles.text}>Cancel</Text>
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
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
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
    textAlign: 'center',
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
    bottom: 5,
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
  addProductIcon: {width: 30, height: 30, resizeMode: 'center'},
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '100%',
    gap: 20,
    padding: 30,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  inputStyle: {
    // borderRadius: 10,
    // borderWidth: 0.7,
    borderBottomWidth: 1,
    borderColor: 'black',
    paddingLeft: 10,
    color: '#000',
  },
  SelectedProductImage: {
    height: 150,
    width: 150,
    resizeMode: 'center',
    alignSelf: 'center',
  },
  SelectedProductTitle: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '700',
    color: 'black',
  },
  SelectedProductPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
  },
  SelectedProductDescription: {},
  SelectedProductCategory: {
    fontSize: 14,
    fontWeight: '500',
    color: 'black',
    textAlign: 'center',
  },
  deleteProductImage: {
    height: 70,
    width: 50,
    resizeMode: 'center',
  },
  openEndModalContanier: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  deleteProductButton: {
    backgroundColor: '#778899',
    height: 30,
    width: '35%',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deteleProductText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  updateProductButton: {
    backgroundColor: '#A9A9A9',
    height: 30,
    width: '35%',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  grayButton: {
    backgroundColor: '#778899',
    borderRadius: 12,
    height: 30,
    justifyContent: 'center',
    alignContent: 'center',
  },
  lightGrayButton: {
    backgroundColor: '#A9A9A9',
    borderRadius: 12,
    height: 30,
    justifyContent: 'center',
    alignContent: 'center',
  },
  loadingContainer: {
    // flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  newProductAddText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 20,
    fontWeight: '700',
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
});
