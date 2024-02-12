import { create } from "zustand";

const useAnimalStore = create((set)=>({
    animal: [
        {id: 1,type_name: "Cat",animal_count: 20,territory_id: 2},
        {id: 2,type_name: "Dog",animal_count: 20,territory_id: 1}
    ],
    setAnimal: (p) => set({animal: p})

}))
export default useAnimalStore;