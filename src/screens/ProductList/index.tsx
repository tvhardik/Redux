import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  Appearance,
  Alert,
  SafeAreaView,
  Pressable,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import {
  addProduct,
  deleteProduct,
  fetchProducts,
  updateProduct,
} from '../../redux/product/index';
import { images } from '../../assets';
import { constant } from '../../constant';
import { DetalisModal, SelectedProductModal } from '../../components';
import {windowWidth} from '../../utils/helper';
import { colors } from '../../theme/colors';
import { styles } from './styles';

const ProductList: React.FC = () => {
  const dispatch: any = useDispatch();
  const ApiData = useSelector((state: any) => state.products.products);

  const [isUpdateModalVisible, setUpdateModalVisible] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [isAddProductModalVisible, setAddProductModalVisible] = useState(false);
  const [isDetalisModalVisible, setDetalisModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [ProductData, setProductData] = useState<any>([]);
  const [product, setProduct] = useState<any>({
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

  useEffect(() => {
    setProductData(ApiData);
  }, [ApiData]);

  const highRatedProducts = ProductData.filter(
    (item: { rating: { rate: number } }) =>
      item.rating?.rate >= 4 && item.rating.rate <= 5,
  );

  const handleUpdateProduct = (productId: number) => {
    setUpdateModalVisible(true);
    const productToUpdate = ProductData.find(
      (product: any) => product.id === productId,
    );
    setProduct({
      title: productToUpdate.title,
      price: productToUpdate.price.toString(),
      image: productToUpdate.image,
    });
  };

  const handleSaveUpdate = () => {
    closeModal();
    const updatedProducts = ProductData.map((p: any) => {
      if (p.id === selectedProduct.id) {
        return { ...p, ...product };
      }
      return p;
    });
    setProductData(updatedProducts);
    setUpdateModalVisible(false);
  };

  const handleAddProduct = () => {
    if (!product.title || !product.price || !product.image) {
      Alert.alert(constant.error);
      return;
    }

    const newProduct = { id: Date.now(), ...product };
    setProductData([...ProductData, newProduct]);
    setAddProductModalVisible(false);
  };

  const handleOpenGallery = async () => {
    try {
      const selectedImage = await ImagePicker.openPicker({
        cropping: true,
      });
      setSelectedImage(selectedImage.path);
      setProduct({
        ...product,
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
    const updatedProducts = ProductData.filter(
      (product: any) => product.id !== productId,
    );
    setProductData(updatedProducts);
    setDetalisModalVisible(false);
  };

  const renderCarouselItem = ({ item }: any) => (
    <Pressable
      style={({ pressed }) => [pressed && { opacity: 0.2 }, { flex: 1 }]}
      onPress={() => openModal(item)}>
      <View style={styles.productContainer}>
        <Image
          source={{ uri: item.image }}
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
      <ScrollView nestedScrollEnabled={true}>
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
            containerStyle={{ marginTop: -20 }}
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
            data={ProductData}
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
          title: isUpdateModalVisible ? product.title : null,
          price: isUpdateModalVisible ? product.price : null,
          onChangeTitle: text => setProduct({ ...product, title: text }),
          onChangePrice: text =>
            setProduct({
              ...product,
              price: isUpdateModalVisible ? text : Number(text),
            }),
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

      {/* Selected Product modal */}
      <SelectedProductModal
        isVisible={isDetalisModalVisible}
        onBackdropPress={closeModal}
        handleUpdate={() => handleUpdateProduct(selectedProduct.id)}
        handleDelete={() => handleDeleteProduct(selectedProduct.id)}
        price={selectedProduct ? selectedProduct.price : ''}
        title={selectedProduct ? selectedProduct.title : ''}
        category={selectedProduct ? selectedProduct.category : ''}
        source={selectedProduct ? selectedProduct.image : ''}
        ratingData={selectedProduct?.rating?.rate}
      />
    </SafeAreaView>
  );
};

export default ProductList;
