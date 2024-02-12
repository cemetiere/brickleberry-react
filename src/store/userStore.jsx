import { create } from "zustand";

const useUserStore = create((set) => ({
    userName: "",
    userRole: "Управляющий",
    setName: (n) => set({userName: n}),
    setRole: (n) => set({userRole: n})
}))

export default useUserStore;
