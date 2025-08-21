interface OrderStatusProps {
  status: string;
  onStatusChange: (status: string) => void;
}

const OrderStatus = ({ status, onStatusChange }: OrderStatusProps) => {
  const statuses = [
    { id: "", label: "All Orders" },
    { id: "On-Process", label: "On Process" },
    { id: "Sending-Goods", label: "Sending Goods" },
    { id: "Success", label: "Finish Order" },
    { id: "Cancelled", label: "Cancelled" },
  ];

  return (
    <div className="w-52">
      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        className="w-56 md:w-full p-2 md:p-4 bg-gray-100 rounded text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-amber-300"
      >
        {statuses.map((s) => (
          <option className="text-xs md:text-sm" key={s.id} value={s.id}>
            {s.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default OrderStatus;
