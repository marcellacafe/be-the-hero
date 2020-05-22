import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import './styles.css';
import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';
import { FiLogIn } from 'react-icons/fi'; // feathericons
import api from '../../services/api';

export default function Logon() {
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();

        try {
            const response = await api.post('sessions', { id });

            // Disponibiliza os dados de id e name para toda aplicação
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);
            history.push('/profile');
        } catch(err) {
            alert('Falha no login, tente novamente');
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be the Hero" />
                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>
                    <input
                        placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)}>
                    </input>
                    <button className="button" type="submit">Entrar</button>
                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041"></FiLogIn>
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={heroesImg} alt="Heroes"></img>
        </div>
    );
} 