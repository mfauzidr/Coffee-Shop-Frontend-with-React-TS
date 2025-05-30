import { AddressInput, EmailInput, FullNameInput } from "./InputForm";
import RadioGroup, { Option } from "./RadioGroup";
import { useState, useEffect } from "react";

interface PaymentInfoProps {
  email?: string;
  fullname?: string;
  address?: string;
  deliveryMethod?: string;
  onChange?: (values: { address: string; deliveryMethod: string }) => void;
}

const PaymentInfo = ({
  email,
  fullname,
  address,
  deliveryMethod,
  onChange,
}: PaymentInfoProps) => {
  const [form, setForm] = useState({
    email: email || "",
    fullname: fullname || "",
    address: address || "",
    deliveryMethod: deliveryMethod || "",
  });

  useEffect(() => {
    setForm({
      email: email || "",
      fullname: fullname || "",
      address: address || "",
      deliveryMethod: deliveryMethod || "",
    });
  }, [email, fullname, address, deliveryMethod]);

  useEffect(() => {
    if (onChange) {
      onChange({
        address: form.address,
        deliveryMethod: form.deliveryMethod,
      });
    }
  }, [form.address, form.deliveryMethod, onChange]);

  const options = [
    { id: 1, label: "Dine In", value: "dine-in", required: true },
    { id: 2, label: "Door Delivery", value: "delivery" },
    { id: 3, label: "Pick Up", value: "pick-up" },
  ];

  const handleRadioChange = (selectedOption: Option) => {
    const updatedMethod = selectedOption.value;
    const updatedAddress = updatedMethod === "delivery" ? form.address : "";

    setForm((prev) => ({
      ...prev,
      deliveryMethod: updatedMethod,
      address: updatedAddress,
    }));
  };

  return (
    <div className="flex flex-col w-full lg:w-2/3 gap-4 mb-6 lg:mb-16">
      <div className="text-lg md:text-xl font-medium">
        Payment Info & Delivery
      </div>
      <form className="flex flex-col gap-3 w-full">
        <EmailInput
          name="email"
          placeholder="Enter Your Email"
          value={form.email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setForm({ ...form, email: e.target.value })
          }
        />
        <FullNameInput
          name="fullname"
          placeholder="Enter Your Full Name"
          value={form.fullname}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setForm({ ...form, fullname: e.target.value })
          }
        />

        {form.deliveryMethod === "delivery" && (
          <AddressInput
            name="address"
            value={form.address}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setForm({ ...form, address: e.target.value })
            }
          />
        )}

        <RadioGroup
          groupName="delivery"
          label="Delivery"
          options={options}
          onChange={handleRadioChange}
        />
      </form>
    </div>
  );
};

export default PaymentInfo;
