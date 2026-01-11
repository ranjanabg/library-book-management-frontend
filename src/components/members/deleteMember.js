import { Form, Input, Button, Checkbox } from 'antd';
import {VIEW} from './constants'
import axios from 'axios';


const DeleteBook = (props) => {

	const { setCurrentBookId, setCurrentMenu } = props

	const onFinish = (values) => {
		console.log(values)
		axios.delete('http://localhost:8080/api/member/delete/' + values.id, null)
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
				label="Member ID"
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
	);
};

export default DeleteBook;
