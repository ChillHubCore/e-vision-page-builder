export interface UserInfo {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  isCreator: boolean;
  balance: number;
  token: string;
}

export interface UserState {
  userInfo: UserInfo | null;
}

export interface ResDataType {
  data: [];
  isLoading: boolean;
  error: unknown;
  refetch: () => void;
}

export interface RatingType {
  _id: string;
  rate: number;
  productID: string;
  userID: string;
  createdAt: string;
  updatedAt: string;
}

export interface AvgRateType {
  averageRate: number;
}

export interface configType {
  name: string;
  value: string;
}

export interface ProductType {
  _id: string;
  name: string;
  image: [string];
  inStock: {
    total: number;
    details: [
      {
        color?: string;
        size?: string;
        amount: number;
        _id: string;
      }
    ];
  };
  soldAmount: number;
  mainCategory: string;
  subCategory: string;
  brand: string;
  price: [
    {
      color?: string;
      size?: string;
      variantPrice: number;
      _id: string;
    }
  ];
  description: string;
  colorVariants: string[];
  sizes: string[];
  author: string;
  creator: string;
  createdAt: string;
  updatedAt: string;
  visible: boolean;
  fastDelivery: boolean;
  insurance: {
    has: boolean;
    description: string;
  };
  configs: [{ name: string; value: string }];
  fullDescription: string;
  __v: number;
}

export interface inStockProps {
  size?: string;
  color?: string;
  amount: number;
}

export interface VariantPrice {
  size?: string;
  color?: string;
  variantPrice: number;
}

export type CustomError = {
  message: string;
  response?: {
    data:
      | {
          message: string;
        }
      | undefined;
  };
};

export interface ShoppingCartType {
  shoppingCart: {
    __v: number;
    _id: string;
    createdAt: string;
    updatedAt: string;
    cartItems: [orderedProduct];
    paymentMethod: string;
    shippingAddress: {
      city: string;
      postalCode: string;
      phoneNumber: string;
      address: string;
    };
  };
}

export interface orderedProduct {
  Product: ProductType;
  quantity: number;
  choosenVariant: {
    color?: string;
    size?: number;
    variantPrice: number;
    _id: string;
  };
}

export interface ProductsType {
  data: [];
}

export interface SearchResultType {
  products: [ProductType];
  countProducts: number;
  page: number;
  pages: number;
}

export interface StepProps {
  name: string;
  mainCategory: string;
  subCategory: string;
  brand: string;
  description: string;
  colorVariants: string[];
  sizes: string[];
  author: string;
  configs: never[];
  isInsured: boolean;
  insuredDesc: string;
  fastDeliver: boolean;
}

export interface FromValueProps {
  name: string;
  mainCategory: string;
  subCategory: string;
  brand: string;
  description: string;
  colorVariants: never[];
  sizes: never[];
  author: string;
  configs: never[];
  isInsured: string;
  insuredDesc: string;
  fastDeliver: boolean;
}

export interface FormValueProps {
  name: string;
  mainCategory: string;
  subCategory: string;
  brand: string;
  description: string;
  colorVariants: string[];
  sizes: string[];
  author: string;
  configs: {
    value: string;
    title: string;
  }[];
  isInsured: string;
  insuredDesc: string;
  fastDeliver: boolean;
}
