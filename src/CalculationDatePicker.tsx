import DatePicker from 'react-datepicker'

export const CalculationDatePicker: React.FC<{ label: String, selected: any, onChange: any }> = (x) => {
    return (
      <div>
        <p className="label">{x.label}</p>
        <DatePicker className="datepick" dateFormat="dd/MM/yyyy" selected={x.selected} onChange={x.onChange} />
      </div>
    );
  }