import { Form, Input, Button, Checkbox } from 'antd';
import {VIEW} from './constants'
import axios from 'axios';


const AddBook = (props) => {

	const { setCurrentBookId, setCurrentMenu } = props

	const onFinish = (values) => {
		console.log(values)
		axios.post('http://localhost:8080/api/member/add', null, {headers: values})
		.then(response => {
			setCurrentMenu(VIEW)
		})
		
	};

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	return (
		<Form
			style={{marginTop: 20}}
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
				label="RFID"
				name="rfid"
				rules={[
					{
						required: true,
						message: 'Please input the RFID!',
					},
				]}
			>
				<Input />
			</Form.Item>
			<Form.Item
				label="First Name"
				name="firstName"
				rules={[
					{
						required: true,
						message: 'Please input the firstName!',
					},
				]}
			>
				<Input />
			</Form.Item>
			<Form.Item
				label="Last Name"
				name="lastName"
				rules={[
					{
						required: true,
						message: 'Please input the lastName!',
					},
				]}
			>
				<Input />
			</Form.Item>
			<Form.Item
				label="Email Id"
				name="emailId"
				rules={[
					{
						required: true,
						message: 'Please input the emailId!',
					},
				]}
			>
				<Input />
			</Form.Item>
			<Form.Item
				label="Password"
				name="password"
				rules={[
					{
						required: true,
						message: 'Please input the password!',
					},
				]}
			>
				<Input.Password />
			</Form.Item>

			<Form.Item
				label="Mobile No"
				name="mobileNo"
				rules={[
					{
						required: true,
						message: 'Please input the mobileNo!',
					},
				]}
			>
				<Input />
			</Form.Item>


			<Form.Item
				label="Date Of Birth"
				name="dateOfBirth"
				rules={[
					{
						required: true,
						message: 'Please input the Date Of Birth!',
					},
				]}
			>
				<Input type="date" />
			</Form.Item>

			<Form.Item
				label="Unique Pin"
				name="uniquePin"
				rules={[
					{
						required: true,
						message: 'Please input the Unique Pin!',
					},
				]}
			>
				<Input.Password />
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
	);
};

export default AddBook;
