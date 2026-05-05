import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { CartItem } from "../context/CartContext"

interface CartState {
  items: CartItem[]
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void
  removeItem: (id: number, color?: string, size?: string) => void
  updateQuantity: (id: number, quantity: number, color?: string, size?: string) => void
  updateItemVariant: (
    id: number,
    currentColor: string | undefined,
    currentSize: string | undefined,
    updates: { color?: string; size?: string }
  ) => void
  clearItems: () => void
  getTotal: () => number
  getCount: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      setIsOpen: (open) => set({ isOpen: open }),
      addItem: (item) => {
        const { items } = get()
        const nextQuantity = Math.max(1, item.quantity ?? 1)
        
        const existingItem = items.find(
          (i) => i.id === item.id && i.color === item.color && i.size === item.size
        )

        if (existingItem) {
          set({
            items: items.map((i) =>
              i.id === item.id && i.color === item.color && i.size === item.size
                ? { ...i, quantity: i.quantity + nextQuantity }
                : i
            ),
          })
        } else {
          set({ items: [...items, { ...item, quantity: nextQuantity }] })
        }
      },
      removeItem: (id, color, size) => {
        set({
          items: get().items.filter(
            (i) => !(i.id === id && i.color === color && i.size === size)
          ),
        })
      },
      updateQuantity: (id, quantity, color, size) => {
        if (quantity <= 0) {
          get().removeItem(id, color, size)
          return
        }
        set({
          items: get().items.map((i) =>
            i.id === id && i.color === color && i.size === size ? { ...i, quantity } : i
          ),
        })
      },
      updateItemVariant: (id, currentColor, currentSize, updates) => {
        const { items } = get()
        const sourceItem = items.find(
          (item) => item.id === id && item.color === currentColor && item.size === currentSize
        )

        if (!sourceItem) return

        const nextColor = updates.color ?? currentColor
        const nextSize = updates.size ?? currentSize

        if (nextColor === currentColor && nextSize === currentSize) return

        const targetItem = items.find(
          (item) =>
            item.id === id &&
            item.color === nextColor &&
            item.size === nextSize &&
            !(item.color === currentColor && item.size === currentSize)
        )

        if (targetItem) {
          set({
            items: items
              .filter(
                (item) => !(item.id === id && item.color === currentColor && item.size === currentSize)
              )
              .map((item) =>
                item.id === id && item.color === nextColor && item.size === nextSize
                  ? { ...item, quantity: item.quantity + sourceItem.quantity }
                  : item
              ),
          })
        } else {
          set({
            items: items.map((item) =>
              item.id === id && item.color === currentColor && item.size === currentSize
                ? { ...item, color: nextColor, size: nextSize }
                : item
            ),
          })
        }
      },
      clearItems: () => set({ items: [] }),
      getTotal: () => get().items.reduce((total, item) => total + item.price * item.quantity, 0),
      getCount: () => get().items.reduce((count, item) => count + item.quantity, 0),
    }),
    {
      name: "nyx_cart",
      storage: createJSONStorage(() => localStorage),
    }
  )
)
