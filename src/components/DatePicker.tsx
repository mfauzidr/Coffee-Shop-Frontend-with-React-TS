import React from 'react'

const DatePicker = () => {
  const [date, setDate] = React.useState('')

  const handleDate = (event) => {
    setDate(event.target.value)
  }

  return (
    <div className="flex items-center bg-gray-200 p-2 font-bold">
      <input
        type="month"
        id="monthYear"
        name="monthYear"
        className="outline-none bg-gray-200"
        value={date}
        onChange={handleDate}
      />
    </div>
  )
}

export default DatePicker
