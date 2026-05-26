import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { WishlistItem } from "../context/WishlistContext"

interface WishlistState {
  items: WishlistItem[]
  addItem: (item: WishlistItem) => void
  removeItem: (id: string | number) => void
  clearItems: () => void
  isInWishlist: (id: string | number) => boolean
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const { items } = get()
        const exists = items.find((i) => i.id === item.id)
        if (!exists) {
          set({ items: [...items, item] })
        }
      },
      removeItem: (id) => {
        set({ items: get().items.filter((i) => i.id !== id) })
      },
      clearItems: () => set({ items: [] }),
      isInWishlist: (id) => {
        return get().items.some((i) => i.id === id)
      },
    }),
    {
      name: "nyx_wishlist",
      storage: createJSONStorage(() => localStorage),
    }
  )
)
