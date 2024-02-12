import { create } from "zustand";

const useResourceStore = create((set)=>({
    resource: [

    ],
    setResource: (p) => set({resource: p})

}))
export default useResourceStore;