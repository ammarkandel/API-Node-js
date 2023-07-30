const FormRow = ({type, name, value, handleChange, lableText}) => {
  return (
    <div>
      <label htmlFor={name}>{lableText || name}</label>

      <input type={type} value={value} name={name} onChange={handleChange} />
    </div>
  )
}

export default FormRow
