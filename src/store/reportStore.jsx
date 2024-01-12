import { create } from "zustand";

const useReportStore = create((set)=>({
    reports: [
        {id: 1,date: "11-02-2013",description: "-35 meow meows"},
        {id: 2,date: "11-02-2013",description: "-35 meow meows"}
    ],
    setReports: (p) => set({reports: p})

}))

export default useReportStore;