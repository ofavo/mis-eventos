import { create } from "zustand";

// Estado global con Zustand
const useUserStore = create((set) => ({

    userProfile: null,
    setUserProfile: (profile  : any) => set({ userProfile: profile }),


    userToken: null,
    setUserToken: (token:string|null) => set({ userToken: token }),


    refreshView: '',
    toggleRefreshView: () =>
        set(() => ({ refreshView: Math.random().toString() })),

    modalVisible: false,
    toggleModalVisible: (visible: boolean) => set({ modalVisible: visible }),

    eventData: null,
    setEventData: (data: any) => set({ eventData: data }),
}));

export default useUserStore;