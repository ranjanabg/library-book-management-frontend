import { Card, Col, Row , Input } from 'antd';
import axios from 'axios'
import { useState, useLayoutEffect, useEffect } from 'react';

const { Search } = Input;

const ViewBook = (props) => {

	const {currentBookId, setCurrentBookId} = props
	const [data, setData] = useState(null)

	async function handleSearch(e) {
		if (!e || e.length == 0) {
			setCurrentBookId(null)
		}
		setCurrentBookId(e)
		setTimeout(() => {}, 1000)
		fetchBooks()
	}

	const fetchBooks = () => {
		if (currentBookId) {
			axios.get('http://localhost:8080/api/member/read/'+currentBookId).then(response => {
			if (response && response.data) {
				setData([response.data])
			} else {
				setData(null)
			}
			
		})
		} else {
			axios.get('http://localhost:8080/api/member/read').then(response => {
				if (response && response.data) {
					setData(response.data)
				} else {
					setData(null)
				}
			})
		}	
	}
	useEffect(() => {fetchBooks()}, [])
	
	return (
	<>
	<Search style={{marginTop: 20}} placeholder="Search using Member ID" onSearch={handleSearch} />

	{ !data && currentBookId && <p>Member not found!</p>}
	{
		data && data.map((value, index) => {
			return <Card title={value.title} style={{ width: 300, marginTop: 10 }}>
			<p><b>ID</b>: {value.id}</p>
			<p><b>RFID Tag</b>: {value.rfid}</p>
			<p><b>First Name</b>: {value.firstName}</p>
			<p><b>Last Name</b>: {value.lastName}</p>
			<p><b>Email ID</b>: {value.emailId }</p>
			<p><b>Mobile No</b>: {value.mobileNo }</p>
			<p><b>Books Issued</b>: {value.booksIssued }</p>
			<p><b>Books Limit</b>: {value.booksLimit }</p>
			<p><b>Status</b>: {value.status }</p>
			
			</Card>
		})
	}
	
	
	</>	
	)
}

export default ViewBook;
