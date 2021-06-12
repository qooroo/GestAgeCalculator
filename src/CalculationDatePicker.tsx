import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export const CalculationDatePicker: React.FC<{ label: String, valueHook: () => Date, onChange: any }> = (x) => {

  const value = x.valueHook()

  return (
    <div>
      <p className="label">{x.label}</p>
      <DatePicker className="datepick" dateFormat="dd/MM/yyyy" selected={value} onChange={x.onChange} />
    </div>
  );
}