interface ShoppingCartProps {
  id: string;
  name: string;
  quantity: number;
  size: string;
  variant: string;
  type: string;
  price: number;
}

const items: ShoppingCartProps[] = [
  {
    id: "1",
    name: "Item 1",
    quantity: 2,
    size: "Large",
    variant: "Ice",
    type: "Dine In",
    price: 10000,
  },
  {
    id: "2",
    name: "Item 2",
    quantity: 2,
    size: "Small",
    variant: "Hot",
    type: "Dine In",
    price: 50000,
  },
];

const ShoppingCart = () => {
  return (
    <div className="fixed top-14 right-20 bg-white z-50 shadow-lg rounded-xl p-4 w-80 overflow-y-auto max-h-96 text-amber-500">
      <div className="w-full">
        {items.length > 0 ? (
          <ul className="flex-col w-full gap-6">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex w-full justify-between items-center"
              >
                <div className="flex-col w-full">
                  <h4 className="text-sm font-bold">{item.name}</h4>
                  <div className="flex w-full justify-between gap-2">
                    <div className="flex-col gap-1">
                      <div className="text-xs text-gray-500">
                        Qty: {item.quantity}
                      </div>
                      <div className="text-xs text-gray-500">
                        Size: {item.size}
                      </div>
                    </div>
                    <div className="flex-col gap-1 mr-4">
                      <div className="text-xs text-gray-500">
                        Variant: {item.variant}
                      </div>
                      <div className="text-xs text-gray-500">
                        Type: {item.type}
                      </div>
                    </div>
                    <div className="flex text-xs font-semibold justify-start w-20">
                      Rp. {item.price.toLocaleString()}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Your cart is empty.</p>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
