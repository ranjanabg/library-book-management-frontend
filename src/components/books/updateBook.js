import { Form, Input, Button, Modal } from 'antd';
import { useState } from 'react';
import { VIEW } from './constants'
import axios from 'axios';


const UpdateBook = (props) => {

	const { setCurrentBookId, setCurrentMenu } = props
	const [modal, setModal] = useState(null)
	const [message, setMessage] = useState(null)
	const handleClose = () => { setModal(false) }

	const onFinish = (values) => {
		Object.keys(values).forEach((k) => values[k] == null && delete values[k]);
		console.log(values)
		axios.put('http://localhost:8080/api/book/update/' + values.id, null, { headers: values })
			.then(response => {
				setCurrentBookId(values.id)
				setCurrentMenu(VIEW)
			}).catch(error => {
				setMessage('Unable to update the book at this time. Please try again later.');
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
					label="ISBN"
					name="isbn"
					rules={[
						{
							message: 'Please input the ISBN!',
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label="RFID"
					name="rfid"
					rules={[
						{
							message: 'Please input the RFID!',
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label="Title"
					name="title"
					rules={[
						{
							message: 'Please input the title!',
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label="Description"
					name="description"
					rules={[
						{
							message: 'Please input the title!',
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label="Author Name"
					name="authorName"
					rules={[
						{
							message: 'Please input the title!',
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label="Publisher Name"
					name="publisherName"
					rules={[
						{
							message: 'Please input the title!',
						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="Owner"
					name="owner"
					rules={[
						{
							message: 'Please input the title!',
						},
					]}
				>
					<Input />
				</Form.Item>


				<Form.Item
					label="Price"
					name="price"
					rules={[
						{
							message: 'Please input the price!',
						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="Pages"
					name="pages"
					rules={[
						{
							message: 'Please input the pages!',
						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="Read Count"
					name="readCount"
					rules={[
						{
							message: 'Please input the read count!',
						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="Readers Rating"
					name="readersRating"
					rules={[
						{
							message: 'Please input the rating!',
						},
					]}
				>
					<Input />
				</Form.Item>


				<Form.Item
					label="Critics Rating"
					name="criticsRating"
					rules={[
						{
							message: 'Please input the ratings!',
						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="Rack ID"
					name="rackId"
					rules={[
						{
							message: 'Please input the rack ID!',
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

export default UpdateBook;
