import { AddressInput, EmailInput, FullNameInput } from "./InputForm"
import RadioGroup from "./RadioGroup"

const PaymentInfo = () => {

    const options = [
        { label: 'Dine In', value: 'dine-in', required: true },
        { label: 'Door Delivery', value: 'delivery' },
        { label: 'Pick Up', value: 'pick-up' },
    ]
    return (
        <>
            <div className="flex flex-col w-full lg:w-2/3 gap-4 mb-6 lg:mb-16">
                <div className="text-lg md:text-xl font-medium">Payment Info & Delivery</div>
                <form className="flex flex-col gap-3" action="">
                    <EmailInput name="email" placeholder="Enter Your Email" />
                    <FullNameInput name="fullname" placeholder="Enter Your Full Name" />
                    <AddressInput name="address" />
                    <RadioGroup groupName="size" label="Delivery" options={options} />
                </form>
            </div>

        </>
    )
}

export default PaymentInfo