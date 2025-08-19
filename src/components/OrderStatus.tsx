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
        className="w-full px-4 py-4 bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
      >
        {statuses.map((s) => (
          <option key={s.id} value={s.id}>
            {s.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default OrderStatus;
