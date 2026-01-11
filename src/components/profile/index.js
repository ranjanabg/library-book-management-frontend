import axios from 'axios'
import qs from 'qs'
import { useState, useEffect } from 'react'
import { Modal, Card, Button, Input } from 'antd'

const Profile = (props) => {

    const [data, setData] = useState(null)
    const [message, setMessage] = useState(null)
    const [modal, setModal] = useState(false)
    const [cancelModal, setCancelModal] = useState(false)
    const [duesModal, setDuesModal] = useState(false)
    const [cardNumber, setCardNumber] = useState(null)
    const [cardExpiry, setCardExpiry] = useState(null)
    const [due, setDue] = useState(null)
    const { userId } = props

    const hideModal = () => { setModal(false) }
    let modalCancel = hideModal
    let modalOk = () => {
        setModal(false)
        if (cancelModal) {
            cancelMembership()
        } else if (duesModal) {
            payDues()
        }
    }

    const fetchUserProfile = () => {
        axios.get('http://localhost:8080/api/profile/view/' + userId)
            .then(response => { setData(response.data) })
            .catch(error => { setMessage("Unable to fetch user details"); setModal(true); })
    }

    const showCancelModal = () => {
        setMessage("Are you sure you want to cancel your membership?")
        setModal(true)
        setDuesModal(false)
        setCancelModal(true)
    }

    const cancelMembership = () => {
        axios.put('http://localhost:8080/api/profile/cancel/' + userId)
            .then(response => {
                setMessage('Membership cancelled!');
                setModal(true)
                setCancelModal(false)
            })
    }

    const showDuesModal = () => {
        setMessage("Pay Dues")
        setDue(data.overdueFees.amountDue)
        setModal(true)
        setCancelModal(false)
        setDuesModal(true)
    }

    const payDues = () => {
        const values = {
            'cardNumber': cardNumber,
            'expiryDate': cardExpiry,
            'amountDue': due
        }

        var data = qs.stringify(values);
        var config = {
            method: 'post',
            url: 'http://localhost:8080/api/profile/payDues/' + userId,
            headers: {},
            data: data
        };


        axios(config)
            .then(response => {
                setMessage('Dues Cleared!');
                setModal(true)
                setDuesModal(false)
                setCancelModal(false)
            })
    }

    const onCardChange = (event) => { setCardNumber(event.target.value) }
    const onCardDateChange = (event) => { setCardExpiry(event.target.value) }

    useEffect(() => { fetchUserProfile() }, [userId])

    return (
        <div style={{ marginTop: 20 }}>
            {
                modal &&
                <Modal visible={modal} onCancel={modalCancel} onOk={modalOk}>
                    <h3>{message}</h3>
                    {
                        duesModal &&
                        <>
                            <p><b>Amount Due: </b> ${data.overdueFees.amountDue}</p>
                            <p><b>Card Number: </b> <Input type="number" onChange={onCardChange} /></p>
                            <p><b>Card Expiry: </b> <Input type="date" onChange={onCardDateChange} /></p>
                        </>
                    }
                </Modal>
            }

            {data && data.memberDetails &&
                <>
                    <hr />
                    <h3>Profile</h3>
                    <hr />
                    <p><b>User ID: </b> {data.memberDetails.id}</p>
                    <p><b>RFID Tag: </b> {data.memberDetails.rfid}</p>
                    <p><b>Name:</b> {data.memberDetails.firstName}  {data.memberDetails.lastName}</p>
                    <p><b>Email:</b> {data.memberDetails.emailId}</p>
                    <p><b>Mobile No:</b> {data.memberDetails.mobileNo}</p>
                    <p><b>Status: </b>{data.memberDetails.status}</p>
                    <p><b>Books Issued:</b> {data.memberDetails.booksIssued}</p>
                    <p><b>Books Limit:</b> {data.memberDetails.booksLimit}</p>
                    <Button onClick={showCancelModal} type="primary">Cancel Membership</Button>
                </>
            }
            {data && data.overdueFees &&
                <>
                    <hr />
                    <h3>Overdue Fees</h3>
                    <hr />
                    <p><b>Amount Due: </b> ${data.overdueFees.amountDue}</p>
                    <Button onClick={showDuesModal} type="primary">Pay Dues</Button>
                </>
            }

            {data && data.booksCheckedOut && data.booksCheckedOut.length > 0 &&

                <>
                    <hr />
                    <h3>Issued Books</h3>
                    <hr />
                </>
            }

            {
                data && data.booksCheckedOut && data.booksCheckedOut.map((value, index) => {
                    return <Card title={value.title} style={{ width: 300, marginTop: 10 }}>
                        <p><b>ISBN</b>: {value.isbn}</p>
                        <p><b>RFID Tag</b>: {value.rfid}</p>
                        <p><b>Title</b>: {value.title}</p>
                        <p><b>Description</b>: {value.description}</p>
                        <p><b>Author</b>: {value.authorName}</p>
                        <p><b>Issued Date</b>: {new Date(value.issuedDate).toLocaleDateString("en-US")}</p>
                        <p><b>Due Date</b>: {new Date(value.dueDate).toLocaleDateString("en-US")}</p>
                        <p><b>Rack ID</b>: {value.rackId}</p>
                    </Card>
                })
            }

        </div>
    )

}

export default Profile