import { PageHeader, Form, Input, Button, Switch } from 'antd';
import 'antd/dist/antd.css'
import {LIBRARIAN_ROLE, USER_ROLE, BOOKS} from '../../constants'

export const Login = (props) => {
	const {role, setCurrentMenu, setLoggedIn, setRole, setUserId} = props

  const onFinish = (values) => {
    console.log(values)
    setUserId(values.username)
    setCurrentMenu(BOOKS)
    setLoggedIn(true);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onRoleChange = (checked) => {
    const role = checked ?LIBRARIAN_ROLE : USER_ROLE ;
    setRole(role);
  }

  const checked = role == "Librarian"

  return (
	<PageHeader
	ghost={false}
	title="Login"
	subTitle="Please login to continue"

  >
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item label="Role">
        <Switch onChange={onRoleChange} checkedChildren="Librarian" unCheckedChildren="Reader" />
        </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
	</PageHeader>
  );
};
