import { create } from "zustand";

const usePeopleStore = create((set)=>({
    people: [
        {id: 1,name: "Andrey",surname: "Kirillov",role: "manager"},
        {id: 2,name: "Alex",surname: "Grig",role: "manager"}
    ],
    setPeople: (p) => set({people: p})

}))
export default usePeopleStore;