import create from 'zustand'


export const addressStore = create((set, get) => ({
  addresslist: [],
  updateAddressList: (address) => {
    const prevData = get().addresslist;
    set({ wishlist: [...prevData, address] })
  },
  replaceAddressList: (addressarray) => {
    set({ addresslist: addressarray })
  }
}))