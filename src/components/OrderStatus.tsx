interface OrderStatusProps {
  status: string;
  onStatusChange: (status: string) => void;
}

const OrderStatus = ({ status, onStatusChange }: OrderStatusProps) => {
  const statuses = [
    { id: "onProcess", label: "On Process" },
    { id: "sendingGoods", label: "Sending Goods" },
    { id: "finishOrder", label: "Finish Order" },
  ];

  return (
    <ul className="flex bg-gray-100 p-2 items-center">
      {statuses.map((s) => (
        <li key={s.id} className="flex">
          <input
            type="radio"
            id={s.id}
            name="orderStatus"
            className="hidden peer"
            checked={status === s.id}
            onChange={() => onStatusChange(s.id)}
          />
          <label
            htmlFor={s.id}
            className="px-3 lg:px-5 py-0 lg:py-2 bg-gray-100 cursor-pointer hover:bg-white peer-checked:bg-white text-sm"
          >
            {s.label}
          </label>
        </li>
      ))}
    </ul>
  );
};

export default OrderStatus;
