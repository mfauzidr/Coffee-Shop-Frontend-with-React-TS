interface ShoppingCartProps {
  items?: {
    id: string;
    name: string;
    quantity: number;
    size: string;
    variant: string;
    type: string;
    price: number;
  }[];
}

const ShoppingCart = ({ items = [] }: ShoppingCartProps) => {
  const hasItems = items.length > 0;

  return (
    <div className="shopping-cart-content p-4">
      {hasItems ? (
        <ul className="space-y-4">
          {items.map((item) => (
            <li key={item.id} className="flex justify-between items-center">
              <div>
                <h4 className="text-lg font-bold">{item.name}</h4>
                <div>
                  <p className="text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                  <p className="text-sm text-gray-500">Size: {item.size}</p>
                  <p className="text-sm text-gray-500">
                    Variant: {item.variant}
                  </p>
                  <p className="text-sm text-gray-500">Type: {item.type}</p>
                </div>
              </div>
              <span className="text-sm font-semibold">
                ${item.price.toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Your cart is empty.</p>
      )}
    </div>
  );
};

export default ShoppingCart;
