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
			axios.get('http://localhost:8080/api/book/read/'+currentBookId).then(response => {
			if (response && response.data) {
				setData([response.data])
			} else {
				setData(null)
			}
			
		})
		} else {
			axios.get('http://localhost:8080/api/book/read').then(response => {
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
	<Search style={{marginTop: 20}} placeholder="Search using book ID" onSearch={handleSearch} />

	{ !data && currentBookId && <p>Book not found!</p>}
	{
		data && data.map((value, index) => {
			return <Card title={value.title} style={{ width: 300, marginTop: 10 }}>
			<p><b>ID</b>: {value.id}</p>
			<p><b>RFID Tag</b>: {value.rfid}</p>
			<p><b>ISBN</b>: {value.isbn}</p>
			<p><b>Title</b>: {value.title}</p>
			<p><b>Description</b>: {value.description}</p>
			<p><b>Publisher Name</b>: {value.publisherName}</p>
			<p><b>Author</b>: {value.authorName}</p>
			<p><b>Rack ID</b>: {value.rackId}</p>
			</Card>
		})
	}
	
	
	</>	
	)
}

export default ViewBook;
