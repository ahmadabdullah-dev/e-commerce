import { useCallback, useEffect, useState } from "react";

export type BasketItem = {
  id: string;
  quantity: number;
};

const BASKET_KEY = "basket";
const BASKET_EVENT = "basket-changed";

function readBasket(): BasketItem[] {
  try {
    const raw = localStorage.getItem(BASKET_KEY);
    return raw ? (JSON.parse(raw) as BasketItem[]) : [];
  } catch {
    return [];
  }
}

function writeBasket(items: BasketItem[]) {
  localStorage.setItem(BASKET_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(BASKET_EVENT));
}

export function useBasket() {
  const [basket, setBasket] = useState<BasketItem[]>(readBasket);

  useEffect(() => {
    const sync = () => setBasket(readBasket());
    window.addEventListener(BASKET_EVENT, sync); // same tab
    window.addEventListener("storage", sync); // other tabs
    return () => {
      window.removeEventListener(BASKET_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const addToBasket = useCallback((id: string, quantity = 1) => {
    const current = readBasket();
    const existing = current.find((x) => x.id === id);
    if (existing) {
      writeBasket(
        current.map((x) =>
          x.id === id ? { ...x, quantity: x.quantity + quantity } : x,
        ),
      );
    } else {
      writeBasket([...current, { id, quantity }]);
    }
  }, []);

  const setQuantity = useCallback((id: string, quantity: number) => {
    const current = readBasket();
    if (quantity <= 0) {
      writeBasket(current.filter((x) => x.id !== id));
      return;
    }
    writeBasket(current.map((x) => (x.id === id ? { ...x, quantity } : x)));
  }, []);

  const removeFromBasket = useCallback((id: string) => {
    writeBasket(readBasket().filter((x) => x.id !== id));
  }, []);

  const getQuantity = useCallback(
    (id: string) => basket.find((x) => x.id === id)?.quantity ?? 0,
    [basket],
  );

  const clearBasket = useCallback(() => writeBasket([]), []);

  const totalItems = basket.reduce((sum, x) => sum + x.quantity, 0);

  return {
    basket,
    totalItems,
    addToBasket,
    setQuantity,
    removeFromBasket,
    getQuantity,
    clearBasket,
  };
}
