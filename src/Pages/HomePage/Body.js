import React, { useReducer, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'reactstrap';
import Card from '../../components/card/Card';
import Pagination from '../../components/Pagination/Pagination';
import 'bootstrap/dist/css/bootstrap.css';

const initialUsers = {
  loading: true,
  users: [],
  error: '',
  pageNo: 1,
  total_pages: 0
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        users: action.payload,
        error: '',
        pageNo: action.pageNo,
        total_pages: action.total_pages
      };
    case 'FETCH_ERROR':
      return {
        ...state,
        loading: false,
        users: [],
        error: 'Something Went Wrong!!!',
        pageNo: 1,
        total_pages: 0
      };
    default:
      return state;
  }
};

function Body({ match }) {
  const [state, dispatchState] = useReducer(reducer, initialUsers);

  useEffect(() => {
    const pageNo = parseInt(match.params.pageNo) || 1;

    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/users/?page=${pageNo}&limit=18`);
        
        dispatchState({
          type: 'FETCH_SUCCESS',
          payload: response.data.users,
          pageNo,
          total_pages: response.data.total_pages
        });
      } catch (error) {
        dispatchState({
          type: 'FETCH_ERROR',
          error: error.message || 'Something Went Wrong!!!'
        });
      }
    };

    fetchUsers();
  }, [match.params.pageNo]);

  return (
    <Container>
      {state.error && <h1 className="text-center">{state.error}</h1>}
      {state.loading ? (
        <h1 className="text-center">Loading... Please Wait...</h1>
      ) : (
        <Row>
        {state.users.map(user => (
          <Col key={user.id} md={4} sm={6} xs={12}>
            <Card 
              firstName={user.first_name}
              lastName={user.last_name} 
              id={user.id} 
            />
          </Col>
        ))}
      </Row>
    
      )}
      <Pagination page="/" pageNo={state.pageNo} total_pages={state.total_pages} />
    </Container>
  );
}

export default Body;
