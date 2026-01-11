import { Form, Input, Button, Modal } from 'antd';
import { useState } from 'react';
import axios from 'axios';


const DeleteBook = (props) => {

	const { setCurrentBookId, setCurrentMenu } = props
	const [modal, setModal] = useState(null)
	const [message, setMessage] = useState(null)
	const handleClose = () => { setModal(false) }

	const onFinish = (values) => {
		console.log(values)
		axios.delete('http://localhost:8080/api/book/delete/' + values.id, null)
			.then(response => {
				setMessage('Deleted book successfully!');
				setModal(true)
			}).catch(error => {
				setMessage('Unable to delete the book at this time. Please try again later.');
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
					label="Book ID"
					name="id"
					rules={[
						{
							required: true,
							message: 'Please input the ID!',
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

export default DeleteBook;
