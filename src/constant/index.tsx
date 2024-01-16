export const constant = {
  moreProduct: 'More Product',
  openGallery: 'Open Gallery',
  save: 'Save Product',
  updateProduct: 'Update Product',
  cancel: 'Cancel',
  productDelete: 'Product Delete',
  productUpdate: 'Product Update',
  addNewProduct: 'Add New Product',
  addProduct: 'Add Product',
  updatedTitle: 'Updated Title',
  updatedPrice: 'Updated Price',
  title: 'Title',
  price: 'Price',
  highRatingProduct: 'High rating product',
  error: 'Please fill in all the required fields.',
};

export const inputConfigs = [
  {
    placeholder: constant.title,
    value: '',
    onChangeText: (text: string) => {},
  },
  {
    placeholder: constant.price,
    value: '',
    onChangeText: (text: string) => {},
    keyboardType: 'numeric',
  },
];
