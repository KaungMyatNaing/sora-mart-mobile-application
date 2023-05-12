import create from "zustand";

export const addresslistStore = create((set, get) => ({
  addresslist: [],
  getAddressList: () => {
    fetch("https://sora-mart.com/api/address", {
      headers: {
        "Content-Type": "application/json",
        Authorization: global.auth,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        set({ addresslist: data.data });
        console.log(
          "Addresses has been successfully fetched from API and added to the store."
        );
        console.log(get().addresslist);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  addAddressList: (newAddress) => {
    const prevData = get().addresslist;

    set({ addresslist: [...prevData, newAddress] });
    console.log("New Address has been added to the store")
  },
  updateDefaultAddressList: (id) => {
    const oldDatas = get().addresslist;
    oldDatas.map((olddata) =>
      olddata.guid == id ? olddata.is_default == 1 : 0
    );
    console.log("Default Address has been set !")
  },
  removeAddressList: (id) => {
    const oldDatas = get().addresslist;
    set({ addresslist: oldDatas.filter((olddata) => olddata.guid !== id) });
  },
}));
