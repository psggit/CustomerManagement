import React, {useState} from "react"
import TextInput from "Components/textInput"
import { Form, FormGroup} from "Components/Form"
import Button from "Components/Button"
import {updateExpiry} from "./../Api"

function GiftCardValidityExtension () {

  let giftcardNumber = ""
  const [updatingExpiry, setUpdatingExpiry] = useState(false)

  function handleSubmit (e) {
    e.preventDefault()
    setUpdatingExpiry(true)
    updateExpiry({
      card_number: giftcardNumber.value
    })
    .then((data) => {
      alert(data.message)
    })  
    .catch((error) => {
      setUpdatingExpiry(false)
      error.response.json().then(json => { alert(json.message) })
    })
  }
  
  return (
    <div style={{width: "300px"}}>
      <h2 style={{textDecoration: "underline", marginBottom: "30px"}}>Update giftcard expiry</h2>
      <Form onSubmit={e=>handleSubmit(e)}>
        <FormGroup>
          <label>Giftcard Number*</label>
          <TextInput 
            name="giftcardNumber"
            pattern="[0-9]*"
            ref={(input) => {giftcardNumber = input}}
            isRequired={true}
            width={"300px"}
            errorMessage="Giftcard number is invalid"
            emptyMessage="Giftcard number is required"
          /> 
        </FormGroup>
        <Button appearance="primary" disabled={updatingExpiry}>Extend</Button>
      </Form>
    </div>
  )
}

export default GiftCardValidityExtension