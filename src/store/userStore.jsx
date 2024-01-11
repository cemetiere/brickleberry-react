import { create } from "zustand";

const useUserStore = create((set) => ({
    userName: "",
    setName: (n) => set({userName: n}),
}))

export default useUserStore;
