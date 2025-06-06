export interface Option {
  id: number;
  value: string;
  label: string;
  additionalPrice?: number;
  required?: boolean;
}

interface RadioGroupProps {
  groupName: string;
  label: string;
  options?: Option[];
  onChange?: (selectedOption: Option) => void;
}

const RadioGroup = ({
  groupName,
  label,
  options,
  onChange,
}: RadioGroupProps) => {
  return (
    <fieldset className="flex flex-col gap-4">
      <label className="font-bold" htmlFor={groupName}>
        {label}
      </label>
      <ul
        className="flex text-xs md:text-base w-auto gap-x-3 md:gap-x-7"
        id={groupName}
      >
        {options?.map((option, index) => (
          <li key={option.value} className="flex flex-1">
            <input
              type="radio"
              className="hidden peer"
              name={groupName}
              id={`${groupName}-${index}`}
              value={index}
              required={option.required}
              onChange={() => {
                onChange?.(option);
              }}
            />
            <label
              htmlFor={`${groupName}-${index}`}
              className="flex flex-col w-full h-12 justify-center items-center border border-gray-300 bg-white active:border-amber-500 peer-checked:bg-amber-300 cursor-pointer hover:bg-amber-300 peer-checked:border-amber-500 rounded-md"
            >
              {option.label}
              {option.additionalPrice !== 0 && (
                <div className="text-gray-500 text-[10px] h-[10px] p-0 -mt-1 md:-mt-2.5">
                  + {option.additionalPrice}
                </div>
              )}
            </label>
          </li>
        ))}
      </ul>
    </fieldset>
  );
};

export default RadioGroup;
