import { ChangeEvent, FormEvent, useState } from 'react'
import { Client } from '../../../interfaces/ClientData' 
import { useMutation } from '@apollo/client/react';
import { CREATE_CLIENT } from '../../../utils/schema/mutations';
import { GET_CLIENTS } from '../../../utils/schema/queries';
import { useNavigate } from 'react-router-dom';

export const ClientForm = () => {

    const [clientData, setClientData] = useState<Client>({ name: "", email: "", phoneNumber: "", description: "", current: false, clientType: "" });

    const [createClient] = useMutation(CREATE_CLIENT, {
      refetchQueries: [{
        query: GET_CLIENTS
      }]
    })
    const navigate = useNavigate();

    const renderInputField = (arrValues: string[]) => {  
        return arrValues.map( (itemInput) => (
          <fieldset key={itemInput} className="fieldset">
              <legend className="fieldset-legend">{ itemInput.toUpperCase() }</legend>
              <input 
                type="text" 
                className="input" 
                name={itemInput} 
                value={(clientData as any)[itemInput] || ""}
                placeholder={itemInput}
                onChange={handleInputChange} 
              />
            </fieldset>
        ))
    }

    const renderOptions = (fieldName: string) => {
      switch (fieldName) {
        case "clientType":
          return (
            <>
              <option disabled value="">Select Type</option>
              <option value="Company">Company</option>
              <option value="Person">Person</option>
            </>
          );
        case "current":
          return (
            <>
              <option disabled value="">Select Option</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </>
          );
        default:
          return null;
      }
    };

    const renderSelectField = (arrValues: string[]) => {
      return arrValues.map( (itemInput) => (
        <fieldset key={itemInput}>
          <legend className="fieldset-legend">{ itemInput.toUpperCase() }</legend>
          <select 
            defaultValue="Pick a color" 
            className="select"
            name={itemInput}
            value={
            itemInput === "current"
              ? clientData.current
                ? "true"
                : "false"
              : (clientData as any)[itemInput] || ""
          }
            onChange={handleInputChange}
            >
            { renderOptions(itemInput) }
          </select>
        </ fieldset>
      ))
    }


    const handleSubmit = async(e: FormEvent) => {
        e.preventDefault();
        try {
          await createClient({
            variables: { ...clientData }
          })
          navigate('/analytics')
        } catch (error) {
          console.log(error)
        }
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setClientData(prev => ({
        ...prev,
        [name]: name === "current" ? value === "true" : value, // convert current to boolean
      }));
    };
  
    
  return (
    <form onSubmit={handleSubmit}>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <div>
            { renderInputField([ 'name', 'email', 'phoneNumber']) }
          </div>
          <div>
            { renderInputField(['description']) }
            { renderSelectField(['clientType', 'current']) }
          </div>
          <button type='submit' className="btn btn-neutral mt-4">createClient</button>
      </fieldset>
    </form>
  )
}

