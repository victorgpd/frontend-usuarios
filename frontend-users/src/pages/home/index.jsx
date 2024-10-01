import { useState, useEffect, useRef } from "react"
import Lixeira from "../../assets/lixeira.svg"
import api from "../../services/api"
import './style.css'

function Home() {
  {/* Função para pegar todos usuários */}
  const [users, setUsers] = useState([])
  
  async function getUsers() {
    const usersFromApi = await api.get("/usuarios")
    setUsers(usersFromApi.data)
  }
  
  useEffect(() => {
    getUsers()
  }, [])
  
  {/* Função para cadastrar usuários */}
  const inputName = useRef()
  const inputAge = useRef()
  const inputEmail = useRef()
  
  async function createtUser() {
    await api.post("/usuarios", {
      email: inputEmail.current.value,
      name: inputName.current.value,
      age: parseInt(inputAge.current.value)
    })

    getUsers()
  }

  {/* Função para deletar Usuário */}
  async function deletetUser(id) {
    await api.delete(`/usuarios/${id}`)

    getUsers()
  }
  
  return (
    <div className='container'>
      <form>
        <h1>Cadastro de Usuários</h1>
        <input type="text" name="nome" id="" placeholder='Nome' ref={inputName}/>
        <input type="number" name="idade" id="" placeholder='Idade' ref={inputAge}/>
        <input type="email" name="email" id="" placeholder='Email' ref={inputEmail}/>
        <button type="button" onClick={createtUser}>Cadastrar</button>
      </form>

      {users.map((user) => (
        <div key={user.id} className='card'>
          <div>
            <p>Nome: <span>{user.name}</span></p>
            <p>Idade: <span>{user.age}</span></p>
            <p>Email: <span>{user.email}</span></p>
          </div>
          <button onClick={() => deletetUser(user.id)}>
            <img src={Lixeira} alt="Excluir dados" />
          </button>
        </div>
      ))}

    </div>
  )
}

export default Home
