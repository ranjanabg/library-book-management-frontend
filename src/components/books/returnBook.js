import { Form, Input, Button, Modal } from 'antd';
import qs from 'qs'
import { useState } from 'react';
import axios from 'axios';


const ReturnBook = (props) => {

	const { setCurrentBookId, setCurrentMenu } = props
	const [modal, setModal] = useState(null)
	const [message, setMessage] = useState(null)
	const handleClose = () => { setModal(false) }

	const onFinish = (values) => {
		console.log(values)
		var data = qs.stringify(values);
		var config = {
			method: 'post',
			url: 'http://localhost:8080/api/book/transaction/return/' + values.bookRfID,
			headers: {},
			data: data
		};


		axios(config)
			.then(response => {
				console.log(response)
				setMessage("Book returned successfully!");
				setModal(true)
			}).catch(error => {
				console.log(error)
				setMessage('Could not complete the return request :' + error && error.response && error.response.data ? error.response.data.error : 'Unknown error occured!')
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

export default ReturnBook;
