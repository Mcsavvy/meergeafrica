import { createStore } from "zustand/vanilla";
import { Product, CartItem, Order } from "@/lib/schema/market";

export type PaginatedProducts = {
  data: Product[];
  meta: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
  };
};

export type MarketFilter = {
  search: string;
  category: string;
};

export type MarketState = {
  products: Product[];
  cart: CartItem[];
  orders: Order[];
  isLoading: boolean;
  filter: MarketFilter;
};

export type MarketActions = {
  fetchProducts: (params: {
    page?: number;
    limit?: number;
  }) => Promise<PaginatedProducts>;
  setFilter: (filter: Partial<MarketFilter>) => void;
  // Cart actions
  addToCart: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateCartQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => void;
  // Order actions
  createOrder: (orderData: Omit<Order, "id" | "createdAt">) => Promise<Order>;
  updateOrderStatus: (
    orderId: string,
    status: Order["status"]
  ) => Promise<void>;
};

export type MarketStore = MarketState & MarketActions;

export const defaultMarketState: MarketState = {
  cart: [],
  orders: [],
  products: [],
  isLoading: false,
  filter: {
    search: "",
    category: "",
  },
};

const ITEMS_PER_PAGE = 10;

export const createMarketStore = (
  initialState: MarketState = defaultMarketState
) => {
  return createStore<MarketStore>((set, get) => ({
    ...initialState,

    fetchProducts: async ({ page = 1, limit = ITEMS_PER_PAGE }) => {
      set((state) => ({ ...state, isLoading: true }));

      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Filter products based on search and category
        const { products, filter } = get();
        let filteredProducts: Product[] = products;

        if (filter.search) {
          filteredProducts = filteredProducts.filter((product) =>
            product.name.toLowerCase().includes(filter.search.toLowerCase())
          );
        }

        if (filter.category) {
          filteredProducts = filteredProducts.filter(
            (product) => product.category === filter.category
          );
        }

        // Calculate pagination
        const totalItems = filteredProducts.length;
        const totalPages = Math.ceil(totalItems / limit);
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedData = filteredProducts.slice(startIndex, endIndex);

        const paginatedProducts = {
          data: paginatedData,
          meta: {
            currentPage: page,
            totalPages,
            totalItems,
            itemsPerPage: limit,
            hasNextPage: page < totalPages,
          },
        };

        set((state) => ({
          ...state,
          paginatedProducts,
        }));

        return paginatedProducts;
      } finally {
        set((state) => ({ ...state, isLoading: false }));
      }
    },

    setFilter: (filter) => {
      set((state) => ({
        ...state,
        filter: {
          ...state.filter,
          ...filter,
        },
      }));
    },

    // Cart actions
    addToCart: async (productId, quantity) => {
      const { products } = get();
      const product = products.find((p) => p.id === productId);
      if (!product) return;

      set((state) => ({
        ...state,
        cart: [
          ...state.cart.filter((item) => item.productId !== productId),
          {
            id: Math.random().toString(36).slice(2, 9),
            productId,
            quantity,
            price: product.price,
          },
        ],
      }));
    },

    removeFromCart: async (productId) => {
      set((state) => ({
        ...state,
        cart: state.cart.filter((item) => item.productId !== productId),
      }));
    },

    updateCartQuantity: async (productId, quantity) => {
      set((state) => ({
        ...state,
        cart: state.cart.map((item) =>
          item.productId === productId ? { ...item, quantity } : item
        ),
      }));
    },

    clearCart: () => {
      set((state) => ({
        ...state,
        cart: [],
      }));
    },

    // Order actions
    createOrder: async (orderData) => {
      const newOrder: Order = {
        ...orderData,
        id: Math.random().toString(36).slice(2, 9),
        createdAt: new Date(),
      };

      set((state) => ({
        ...state,
        orders: [...state.orders, newOrder],
      }));

      return newOrder;
    },

    updateOrderStatus: async (orderId, status) => {
      set((state) => ({
        ...state,
        orders: state.orders.map((order) =>
          order.id === orderId ? { ...order, status } : order
        ),
      }));
    },
  }));
};
