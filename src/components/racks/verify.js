import { Form, Input, Button, Modal } from 'antd';
import qs from 'qs'
import { useState } from 'react';
import axios from 'axios';


const Verify = (props) => {

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
			url: `http://localhost:8080/api/racks/verify/`,
			headers: { },
			data : data
		  };

		
		axios(config)
		.then(response => {
			if (response.data.error) {
                setMessage(response.data.error)
            } else {
                setMessage("Verification started. The results will be emailed to you shortly.")
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
				wrapperCol={{
					offset: 8,
					span: 16,
				}}
			>
				<Button type="primary" htmlType="submit">
					Verify all racks
				</Button>
			</Form.Item>
		</Form>
		</>
	);
};

export default Verify;
