import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  Appearance,
  Dimensions,
  Alert,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import StarRating from 'react-native-star-rating';
import Modal from 'react-native-modal';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {Product} from '../../redux/product/type';
import {
  addProduct,
  deleteProduct,
  fetchProducts,
  updateProduct,
} from '../../redux/product/index';
import {images} from '../../assets';
import {constant} from '../../constant';
import {DetalisModal, CustomTextInput} from '../../components';
import {colors} from '../../theme/colors';
import {styles} from './styles';

const ProductList: React.FC = () => {
  const dispatch = useDispatch();
  const windowWidth = Dimensions.get('window').width;
  const products = useSelector((state: any) => state.products.products);

  const [isUpdateModalVisible, setUpdateModalVisible] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [isAddProductModalVisible, setAddProductModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const [newProduct, setNewProduct] = useState<any>({
    title: '',
    price: '',
    image: '',
  });
  const [updatedProduct, setUpdatedProduct] = useState<any>({
    title: '',
    price: '',
    image: '',
  });
  const [isDarkMode, setIsDarkMode] = useState(
    Appearance.getColorScheme() === 'dark',
  );

  useEffect(() => {
    const appearanceChangeHandler = ({colorScheme}: {colorScheme: string}) => {
      setIsDarkMode(colorScheme === 'dark');
    };
    Appearance.addChangeListener(appearanceChangeHandler);
    return () => {
      Appearance.removeChangeListener(appearanceChangeHandler);
    };
  }, []);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const highRatedProducts = products.filter(
    (item: {rating: {rate: number}}) =>
      item.rating?.rate >= 4 && item.rating.rate <= 5,
  );

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

  const handleSaveUpdate = () => {
    closeModal();
    dispatch(updateProduct({productId: selectedProduct.id, updatedProduct}));
    setUpdateModalVisible(false);
  };

  const handleAddProduct = () => {
    if (!newProduct.title || !newProduct.price || !newProduct.image) {
      Alert.alert('Error', 'Please fill in all the required fields.');
      return;
    }
    dispatch(addProduct(newProduct));
    setAddProductModalVisible(false);
  };

  const handleOpenGallery = async () => {
    try {
      const selectedImage = await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
      });
      setSelectedImage(selectedImage.path);
      setNewProduct({
        ...newProduct,
        image: selectedImage.path,
      });
      setUpdatedProduct({
        ...updatedProduct,
        image: selectedImage.path,
      });
      console.log('image.path', selectedImage.path);
    } catch (error) {
      console.log('Error opening gallery:', error);
    }
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

  const renderCarouselItem = ({item}) => (
    <TouchableOpacity style={{flex: 1}} onPress={() => openModal(item)}>
      <View style={styles.productContainer}>
        <Image source={{uri: item.image}} style={styles.productImage} />
        <View style={styles.divider} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <ScrollView>
        <View
          style={{
            backgroundColor: isDarkMode ? colors.darkMode : colors.lightMode,
          }}>
          <Carousel
            data={highRatedProducts}
            sliderWidth={windowWidth}
            itemWidth={windowWidth - 60}
            inactiveSlideOpacity={2}
            inactiveSlideScale={0.94}
            renderItem={renderCarouselItem}
            onSnapToItem={(index: any) => setActiveSlide(index)}
          />
          <Pagination
            dotsLength={highRatedProducts.length}
            activeDotIndex={activeSlide}
            containerStyle={{marginTop: -20}}
            dotStyle={styles.dotStyle}
            inactiveDotOpacity={0.6}
            inactiveDotScale={0.8}
          />
          <View style={styles.moreTextView}>
            <Text
              style={[
                styles.moreProductText,
                {color: isDarkMode ? colors.white : colors.black},
              ]}>
              {constant.moreProduct}
            </Text>
          </View>
          <FlatList
            data={products}
            keyExtractor={item => item.id.toString()}
            numColumns={2}
            renderItem={renderCarouselItem}
          />
          <DetalisModal isVisible={isUpdateModalVisible}>
            <CustomTextInput
              placeholder={constant.updatedTitle}
              value={updatedProduct.title}
              onChangeText={text =>
                setUpdatedProduct({...updatedProduct, title: text})
              }
            />
            <CustomTextInput
              placeholder={constant.updatedPrice}
              value={updatedProduct.price}
              onChangeText={text =>
                setUpdatedProduct({...updatedProduct, price: text})
              }
              keyboardType="numeric"
            />
            <TouchableOpacity onPress={handleOpenGallery}>
              <Text style={styles.text}>{constant.openGallery}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.grayButton}
              onPress={handleSaveUpdate}>
              <Text style={styles.text}>{constant.saveUpdate}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.lightGrayButton}
              onPress={() => setUpdateModalVisible(false)}>
              <Text style={styles.text}>{constant.cancel}</Text>
            </TouchableOpacity>
          </DetalisModal>
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

                  <View style={styles.ratingStarContainer}>
                    <StarRating
                      disabled={true}
                      maxStars={5}
                      rating={selectedProduct?.rating?.rate}
                      starSize={15}
                      emptyStar={images.emptyStar}
                      fullStar={images.fullStar}
                      halfStar={images.halfStar}
                    />
                  </View>
                  <Text style={styles.SelectedProductPrice}>
                    ${selectedProduct.price}
                  </Text>
                  <View style={{gap: 10}}>
                    <TouchableOpacity
                      style={styles.grayButton}
                      onPress={() => handleDeleteProduct(selectedProduct.id)}>
                      <Text style={styles.text}>{constant.productDelete}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.lightGrayButton}
                      onPress={() => handleUpdateProduct(selectedProduct.id)}>
                      <Text style={styles.text}>{constant.productUpdate}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          </Modal>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.addProductButton}
        onPress={() => setAddProductModalVisible(true)}>
        <Image style={styles.addProductIcon} source={images.addProduct} />
      </TouchableOpacity>
      <DetalisModal isVisible={isAddProductModalVisible}>
        <Text style={styles.newProductAddText}>{constant.addNewProduct}</Text>
        <CustomTextInput
          placeholder={constant.title}
          value={newProduct.title}
          onChangeText={text => setNewProduct({...newProduct, title: text})}
        />
        <CustomTextInput
          placeholder={constant.price}
          value={newProduct.price.toString()}
          onChangeText={text =>
            setNewProduct({...newProduct, price: Number(text)})
          }
          keyboardType="numeric"
        />
        <TouchableOpacity onPress={handleOpenGallery}>
          <Text style={styles.text}>{constant.openGallery}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.grayButton} onPress={handleAddProduct}>
          <Text style={styles.text}>{constant.addProduct}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.lightGrayButton}
          onPress={() => setAddProductModalVisible(false)}>
          <Text style={styles.text}>{constant.cancel}</Text>
        </TouchableOpacity>
      </DetalisModal>
    </View>
  );
};

export default ProductList;
