import React, { useEffect, useState } from "react"
import { fetchConsumerDetail, updateConsumer } from "../Api";
import PageHeading from "Components/PageHeading"
import Input from "Components/Input"
import { Form, FormGroup } from "Components/Form"
import Button from "Components/Button"
import Moment from "moment"

export default function ConsumerDetail () {
  const consumer_id = parseInt(location.pathname.split("/").pop())
  const [consumerDetail, setConsumerDetail] = useState(null)
  const [name, setName] = useState("")
  const [gender, setGender] = useState("")
  const [dob, setDOB] = useState("")
  const [isUpdating, setIsUpdating] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsUpdating(true)
    const updateConsumerReq = {
      consumer_id,
      name,
      gender,
      dob: new Date(dob).toISOString()
    }
    updateConsumer(updateConsumerReq)
      .then(updateConsumerRes => {
        alert("consumer updated")
      })
      .catch(err => {
        console.log(err)
        err.response.json().then(json => { alert(json.message) })
        setIsUpdating(false)
      })
  }

  useEffect(() => {
    const fetchConsumerDetailReq = {
      consumer_id
    }
    fetchConsumerDetail(fetchConsumerDetailReq)
      .then(fetchConsumerDetailRes => {
        setConsumerDetail(fetchConsumerDetailRes.consumer)
        setGender(fetchConsumerDetailRes.consumer.gender)
        setName(fetchConsumerDetailRes.consumer.name)
        setDOB(fetchConsumerDetailRes.consumer.dob.slice(0, 10))
      })
  }, [])
  return (
    <div>
      <PageHeading>Consumer Detail - {consumerDetail ? consumerDetail.name : ""}</PageHeading>
      {
        consumerDetail &&
        <Form width="500px">
          <FormGroup inline>
            <label>Name</label>
            <Input onChange={(e) => { setName(e.target.value) }} value={name} />
          </FormGroup>

          <FormGroup inline>
            <label>Gender</label>
            <div style={{ display: 'flex' }}>
              <div style={{ display: "flex", alignItems: "center", width: '140px' }}>
                <Input
                  onChange={() => { setGender("male") }}
                  checked={gender === "male"}
                  value={gender}
                  name="gender"
                  type="radio"
                />
                <label>Male</label>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Input
                  onChange={() => { setGender("female") }}
                  checked={gender === "female"}
                  value={gender}
                  name="gender"
                  type="radio"
                />
                <label>Female</label>
              </div>
            </div>
          </FormGroup>

          <FormGroup inline>
            <label>Email</label>
            <Input disabled defaultValue={consumerDetail.email} />
          </FormGroup>

          <FormGroup inline>
            <label>Phone</label>
            <Input disabled defaultValue={consumerDetail.mobile_number} />
          </FormGroup>

          <FormGroup inline>
            <label>DOB</label>
            <Input type="date" onChange={(e) => { setDOB(e.target.value) }} value={dob.slice(0, 10)} />
          </FormGroup>

          <FormGroup inline>
            <label>Credits</label>
            <Input disabled defaultValue={consumerDetail.credits} />
          </FormGroup>

          <FormGroup inline>
            <label>Basic KYC Updated Date</label>
            <Input disabled defaultValue={consumerDetail.basic_kyc_date ? Moment(consumerDetail.basic_kyc_date).format("DD-MM-YYYY") : ""} />
            {/* <Input disabled defaultValue={consumerDetail.is_kyc_updated ? "Updated" : "Not updated"} /> */}
          </FormGroup>

          <FormGroup inline>
            <label>Email Verified</label>
            <Input disabled defaultValue={consumerDetail.is_mail_verified ? "Yes" : "No"} />
          </FormGroup>

          <FormGroup inline>
            <label>KYC level</label>
            <Input disabled defaultValue={consumerDetail.level} />
          </FormGroup>

          <FormGroup inline>
            <label>Pin attempts</label>
            <Input disabled defaultValue={consumerDetail.pin_attempts} />
          </FormGroup>

          <Button appearance="primary" onClick={handleSubmit}>Save</Button>
        </Form>
      }
    </div>
  )
}