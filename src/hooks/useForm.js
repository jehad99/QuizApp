import { useState } from "react";

export default function useForm(getFreshModelObject) {
  const [values, setValues] = useState(getFreshModelObject())
  const [error, setError] = useState({})
  
  const handleInputChange = e => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value
    })
  }
  return {
    values,
    setValues,
    error,
    setError,
    handleInputChange 
  }
}