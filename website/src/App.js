import { useState, useEffect } from 'react';
import './App.css';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ALL_USERS, GET_ONE_USER } from './query/user';
import { CREATE_USER } from './mutations/user';

function App() {
  const { data, loading, error, refetch } = useQuery(GET_ALL_USERS/*, { pollInterval: 1000 }*/)
  const { data:oneUser, loading:loadingOneUser } = useQuery(GET_ONE_USER, {
    variables: {
      id: 1
    }
  })
  console.log(oneUser)
  const [users, setUsers] = useState([])
  const [username, setUsername] = useState('')
  const [_age, setAge] = useState(0)
  const [newUser] = useMutation(CREATE_USER)

  function handleChangeUsername(e) {
    setUsername(e.target.value)
  }
  function handleChangeAge(e) {
    setAge(e.target.value)
  }

  useEffect(() => {
    if (!loading) {
      setUsers(data.getAllUsers)
    }
  }, [data])

  function addUser(e) {
    e.preventDefault()

    const age = Number(_age)

    newUser({
      variables: {
        input: {
          username, age
        }
      }
    }).then(({data}) => {
      console.log(data)
      setUsername('')
      setAge(0)
    })
  }

  function getAll(e) {
    e.preventDefault()
    refetch()
  }

  return (
    <div>
      <form>
        <input type='text' value={username} onChange={ handleChangeUsername } />
        <input type='number' value={_age} onChange={ handleChangeAge } />
        <div className='btns'>
          <button onClick={(e) => addUser(e)}>Создать</button>
          <button onClick={(e) => getAll(e)}>Получить</button>
        </div>
      </form>
      {error}
      <hr/>
      <div className='container'>
        {
          loading ? <div className='loader'>Loading...</div> :
          (users.map(({id, username, age}) => 
            <div className='user' key={id}>{id}. {username} {age}</div>
          ))
        }
      </div>
    </div>
  )
}

export default App;
