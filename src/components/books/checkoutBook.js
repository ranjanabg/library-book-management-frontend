import { Form, Input, Button, Modal } from 'antd';
import qs from 'qs'
import { useState } from 'react';
import axios from 'axios';
import { LIBRARIAN_ROLE } from '../../constants';


const CheckoutBook = (props) => {

	const { setCurrentBookId, setCurrentMenu, role } = props

	const [modal, setModal] = useState(null)
	const [message, setMessage] = useState(null)
	const handleClose = () => { setModal(false) }

	const onFinish = (values) => {
		console.log(values)
		var data = qs.stringify(values);
		var config = {
			method: 'post',
			url: 'http://localhost:8080/api/book/transaction/checkout/' + values.bookRfID,
			headers: { 'userRole': role == LIBRARIAN_ROLE ? 'LIBRARIAN' : 'READER' },
			data: data
		};
		axios(config)
			.then(response => {
				console.log(response)
				setMessage("Book checked out successfully!");
				setModal(true)
			}).catch(error => {

				console.log(error)
				setMessage('Could not complete checkout:' + error && error.response && error.response.data ? error.response.data.error : 'Unknown error occured!')
				setModal(true)
			})

	};

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	return (
		<>
			{modal && message &&
				<Modal visible={modal} onOk={handleClose} onCancel={handleClose}>
					<h3>{message}</h3>
				</Modal>
			}

			<Form
				style={{ marginTop: 20 }}
				name="basic"
				labelCol={{
					span: 8,
				}}
				wrapperCol={{
					span: 16,
				}}
				initialValues={{
					remember: true,
				}}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="on"
			>
				<Form.Item
					label="Book RFID"
					name="bookRfID"
					rules={[
						{
							required: true,
							message: 'Please scan the book RFID!',
						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="Member RFID"
					name="memberRfID"
					rules={[
						{
							required: true,
							message: 'Please scan your ID!',
						},
					]}
				>
					<Input />
				</Form.Item>

				{
					role != LIBRARIAN_ROLE &&
					<Form.Item
						label="PIN"
						name="pin"
						rules={[
							{
								required: role != LIBRARIAN_ROLE,
								message: 'Please input your PIN!',
							},
						]}
					>
						<Input.Password />
					</Form.Item>
				}


				<Form.Item
					wrapperCol={{
						offset: 8,
						span: 16,
					}}
				>
					<Button type="primary" htmlType="submit">
						Submit
				</Button>
				</Form.Item>
			</Form>
		</>
	);
};

export default CheckoutBook;
