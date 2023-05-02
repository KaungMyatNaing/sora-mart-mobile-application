import create from "zustand";

export const cartStore = create((set, get) => ({
  
  isAction: true,

  changeCart: () => {
    const prevData = get().isAction;

    set({isAction : !prevData})
    console.log("Cart is changed. must reload")
  }
  
}));
