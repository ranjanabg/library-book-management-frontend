import { Form, Input, Button, Modal } from 'antd';
import qs from 'qs'
import { useState } from 'react';
import axios from 'axios';


const VerifyBook = (props) => {

	const { setCurrentBookId, setCurrentMenu } = props
	const [message, setMessage] = useState(null)
    const [modal, setModal] = useState(false)

    const hideModal = () => {
        setModal(false)
    }

	const onFinish = (values) => {
		console.log(values)
		var data = qs.stringify(values);
		var config = {
			method: 'get',
			url: `http://localhost:8080/api/racks/verify/${values.rackId}/${values.bookRfID}`,
			headers: { },
			data : data
		  };

		
		axios(config)
		.then(response => {
			if (response.data.error) {
                setMessage(response.data.error)
            } else {
                setMessage("This rack is the correct location for the book")
            }
            setModal(true)
		})
		
	};

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	return (
		<>
		{message && <p>{message}</p>}
		{
            modal && 
            <Modal visible={modal} onOk={hideModal}>
                <p>{message}</p>
            </Modal>
        }
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
				label="Book ID"
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
				label="Rack ID"
				name="rackId"
				rules={[
					{
						required: true,
						message: 'Please enter the Rack ID!',
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
					Verify Book
				</Button>
			</Form.Item>
		</Form>
		</>
	);
};

export default VerifyBook;
