import create from 'zustand';

export const wishlistStore = create((set,get) => ({
  wishlist: [],
  getWishlist: () => {
    fetch(`https://sora-mart.com/api/wishlists/`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: global.auth,
        },
      })
        .then((response) => response.json())
      .then((data) => {
        let len = data.data.wishlists.length;
          let dumbdata = [];
          for (let i = 0; i < len; i++) {
            dumbdata.push(data.data.wishlists[i].products.id);
          }
          set({ wishlist: [...dumbdata] })
        console.log('wishlist grab successful. from store');
        console.log(get().wishlist);
        })
        .catch((error) => console.log(error));
  },
  getWishlistItems: () => {
    fetch(`https://sora-mart.com/api/wishlists/`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: global.auth,
        },
      })
        .then((response) => response.json())
      .then((data) => {
        let len = data.data.wishlists.length;
          let dumbdata = [];
          for (let i = 0; i < len; i++) {
            dumbdata.push(data.data.wishlists[i]);
          }
          set({ wishlist: [...dumbdata] });
        console.log(get().wishlist);
        })
        .catch((error) => console.log(error));
  },
  updateWishlist: (productid) => {
    const prevData = get().wishlist;
    
    set({ wishlist: [...prevData, productid] })
  },
  replaceWishlist: (wishlistarray) => {
    set({ wishlist: wishlistarray })
  }
}))

