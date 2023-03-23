import create from 'zustand';

export const savedStore = create((set,get) => ({
  savedlist: [],
  getSaved: () => {
    fetch(`https://sora-mart.com/api/blog/save-service-list`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: global.auth,
        },
      })
        .then((response) => response.json())
      .then((data) => {
          let dumbdata = [];
          data.data.map(i => dumbdata.push(i.service.guid))
          set({ savedlist: [...dumbdata] })
        console.log('Saved List has been loaded successfully.');
       
       
        })
        .catch((error) => console.log(error));
  },
  updateSaved: (itemid) => {
    const prevData = get().savedlist;
    
    set({ savedlist: [...prevData, itemid] })
  },
  replaceSaved: (savedarray) => {
    set({ savedlist: savedarray })
  },
  deleteSaved: (itemid) => {
    const prevData = get().savedlist;
    const filteredData = prevData.filter(i => i !== itemid);
    set({ savedlist: filteredData });
  }

}))

