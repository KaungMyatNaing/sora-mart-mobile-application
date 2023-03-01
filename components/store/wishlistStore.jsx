import create from 'zustand';

export const wishlistStore = create((set,get) => ({
  wishlist: [],
  updateWishlist: (productid) => {
    const prevData = get().wishlist;
    set({ wishlist: [...prevData, productid] })
  },
  replaceWishlist: (wishlistarray) => {
    set({ wishlist: wishlistarray })
  }
}))

