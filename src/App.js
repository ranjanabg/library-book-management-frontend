import { Layout, Menu, Button } from 'antd';
import { Login } from './components/login'
import Books from './components/books'
import Rack from './components/racks'
import Profile from './components/profile'
import Members from './components/members'
import 'antd/dist/antd.css'
import { useState } from 'react';
import {USER_ROLE, LIBRARIAN_ROLE, LOGIN, BOOKS, RACK, PROFILE, MEMBERS, LOGOUT } from './constants'

const { Header, Content, Footer } = Layout;

function App() {

  const [loggedIn, setLoggedIn] =  useState(false);
  const [userId, setUserId] = useState(null)
  const [role, setRole] =  useState(USER_ROLE);
  const [currentMenu, setCurrentMenu] = useState(LOGIN)

  const handleMenuClick = e => {
    setCurrentMenu(e.key);
  }

  const handleLogout = () => {
    setUserId(null)
    setLoggedIn(false)
    setRole(USER_ROLE)
    setCurrentMenu(LOGIN)
  }

  return (
    <Layout className="layout">
    <Header>
      <div className="logo" />
      <Menu onClick={handleMenuClick} theme="dark" mode="horizontal" selectedKeys={[currentMenu]}>
      <Menu.Item key='Home'>📚📚</Menu.Item>
        {!loggedIn && <Menu.Item key={LOGIN}>Login</Menu.Item> }
        {loggedIn && <Menu.Item key={BOOKS}>Books</Menu.Item> }
        {loggedIn &&  <Menu.Item key={RACK}>Rack</Menu.Item>}
        {role === USER_ROLE && loggedIn &&  <Menu.Item key={PROFILE}>Profile</Menu.Item>}
        {role === LIBRARIAN_ROLE && loggedIn &&  <Menu.Item key={MEMBERS}>Members</Menu.Item>}
        {loggedIn &&  <Menu.Item key={LOGOUT} onClick={handleLogout}>Log out</Menu.Item>}
      </Menu>
    </Header>
    <Content style={{ padding: '0 50px' }}>
      <div className="site-layout-content">
        { currentMenu === LOGIN && <Login setCurrentMenu={setCurrentMenu} role={role} setLoggedIn={setLoggedIn} setRole={setRole} setUserId={setUserId}/> }
        { currentMenu === BOOKS && <Books role={role} /> }
        
        { currentMenu === RACK && <Rack role={role} /> }
        
        { currentMenu === PROFILE && <Profile userId={userId}/> }

        {  currentMenu === MEMBERS && <Members /> }

        
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>📚📚  TCS559 Library Management System 📚📚</Footer>
  </Layout>
  );
}

export default App;
