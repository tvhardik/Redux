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
  SafeAreaView,
  Pressable,
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
import {DetalisModal, Button, SelectedProductModal} from '../../components';
import {windowWidth} from '../../utils/help';
import {colors} from '../../theme/colors';
import {styles} from './styles';

const ProductList: React.FC = () => {
  const dispatch: any = useDispatch();
  const products = useSelector((state: any) => state.products.products);

  const [isUpdateModalVisible, setUpdateModalVisible] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [isAddProductModalVisible, setAddProductModalVisible] = useState(false);
  const [isDetalisModalVisible, setDetalisModalVisible] = useState(false);
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

  // useEffect(() => {
  //   const appearanceChangeHandler = ({colorScheme}: {colorScheme: string}) => {
  //     setIsDarkMode(colorScheme === 'dark');
  //   };
  //   Appearance.addChangeListener(appearanceChangeHandler);
  //   return () => {
  //     Appearance.removeChangeListener(appearanceChangeHandler);
  //   };
  // }, []);

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
      Alert.alert(constant.error);
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
    setDetalisModalVisible(true);
  };

  const closeModal = () => {
    setDetalisModalVisible(false);
    setSelectedProduct(null);
  };

  const handleDeleteProduct = (productId: number) => {
    dispatch(deleteProduct(productId));
    setDetalisModalVisible(false);
  };

  const renderCarouselItem = ({item}: any) => (
    <Pressable
      style={({pressed}) => [pressed && {opacity: 0.2}, {flex: 1}]}
      onPress={() => openModal(item)}>
      <View style={styles.productContainer}>
        <Image
          source={{uri: item.image}}
          style={styles.productImage}
          resizeMode="contain"
        />
        <View style={styles.divider} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView>
      <ScrollView>
        <Image source={images.shoppingPoster} style={styles.posterImage} />
        <View
          style={[
            styles.mainContainer,
            {
              backgroundColor: isDarkMode ? colors.darkMode : colors.lightMode,
            },
          ]}>
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
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.addProductButton}
        onPress={() => setAddProductModalVisible(true)}>
        <Image style={styles.addProductIcon} source={images.addProduct} />
      </TouchableOpacity>

      {/* DetalisModal */}
      <DetalisModal
        isVisible={isAddProductModalVisible || isUpdateModalVisible}
        isUpdate={isUpdateModalVisible}
        product={{
          title: isUpdateModalVisible ? updatedProduct.title : newProduct.title,
          price: isUpdateModalVisible
            ? updatedProduct.price
            : newProduct.price.toString(),
          onChangeTitle: text => {
            if (isUpdateModalVisible) {
              setUpdatedProduct({...updatedProduct, title: text});
            } else {
              setNewProduct({...newProduct, title: text});
            }
          },
          onChangePrice: text => {
            if (isUpdateModalVisible) {
              setUpdatedProduct({...updatedProduct, price: text});
            } else {
              setNewProduct({...newProduct, price: Number(text)});
            }
          },
        }}
        label={isUpdateModalVisible ? constant.productUpdate : constant.save}
        handleOpenGallery={handleOpenGallery}
        handleSave={isUpdateModalVisible ? handleSaveUpdate : handleAddProduct}
        handleClose={() => {
          isUpdateModalVisible
            ? setUpdateModalVisible(false)
            : setAddProductModalVisible(false);
        }}
      />

      {/* Selected Product modal  */}
      <SelectedProductModal
        isVisible={isDetalisModalVisible}
        onBackdropPress={closeModal}
        handleUpdate={() => handleUpdateProduct(selectedProduct.id)}
        handleDelete={() => handleDeleteProduct(selectedProduct.id)}>
        {selectedProduct && (
          <View style={{gap: 10}}>
            <Text style={styles.SelectedProductTitle}>
              {selectedProduct.title}
            </Text>
            <Image
              source={{uri: selectedProduct.image}}
              style={styles.SelectedProductImage}
              resizeMode="contain"
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
          </View>
        )}
      </SelectedProductModal>
    </SafeAreaView>
  );
};

export default ProductList;
