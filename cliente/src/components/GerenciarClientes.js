import React, { useState, useEffect } from 'react';
import api, { getClientes, addCliente } from '../api';

function ClientesManager() {
    const [clientes, setClientes] = useState([]);
    const [novoCliente, setNovoCliente] = useState({ nome: '', email: '' });
    const [clienteId, setClienteId] = useState('');
    const [clienteEditar, setClienteEditar] = useState({ nome: '', email: '' });

    useEffect(() => {
        async function fetchData() {
            const clientesResponse = await getClientes();
            setClientes(clientesResponse.data);
        }
        fetchData();
    }, []);

    const handleAddCliente = async () => {
        try {
            const response = await addCliente(novoCliente);
            alert(`Cliente ${response.data.nome} criado com sucesso!`);
            setClientes([...clientes, response.data]);
            setNovoCliente({ nome: '', email: '' });
        } catch (error) {
            console.error('Erro ao criar cliente:', error);
        }
    };

    const handleDeleteCliente = async () => {
        if (clienteId) {
            try {
                await api.delete(`/clientes/${clienteId}`);
                alert("Cliente removido com sucesso.");
                setClientes(clientes.filter(cliente => cliente.id !== Number(clienteId)));
                setClienteId('');
            } catch (error) {
                console.error("Erro ao remover cliente:", error);
            }
        }
    };

    const handleEditCliente = async () => {
        if (clienteId && (clienteEditar.nome || clienteEditar.email)) {
            try {
                await api.put(`/clientes/${clienteId}`, clienteEditar);
                alert("Cliente editado com sucesso.");
                setClientes(clientes.map(cliente => 
                    cliente.id === Number(clienteId) ? { ...cliente, ...clienteEditar } : cliente
                ));
                setClienteEditar({ nome: '', email: '' });
                setClienteId('');
            } catch (error) {
                console.error("Erro ao editar cliente:", error);
            }
        }
    };

    return (
        <div>
            <h2 id="gerclientestitle">Adicionar Cliente</h2>
            <input
                type="text"
                placeholder="Nome"
                value={novoCliente.nome}
                className="firstinput"
                onChange={(e) => setNovoCliente({ ...novoCliente, nome: e.target.value })}
            />
            <input
                type="email"
                placeholder="Email"
                className="secondinput"
                value={novoCliente.email}
                onChange={(e) => setNovoCliente({ ...novoCliente, email: e.target.value })}
            />
            <button onClick={handleAddCliente} className="buttons">Adicionar Cliente</button>

            <h2>Remover Cliente</h2>
            <select onChange={(e) => setClienteId(e.target.value)}className="firstinput selectlarger" value={clienteId || ''}>
                <option value="">Selecione um cliente para remover</option>
                {clientes.map(cliente => (
                    <option key={cliente.id} value={cliente.id}>ID {cliente.id} - {cliente.nome}</option>
                ))}
            </select>
            <button onClick={handleDeleteCliente} className="buttons">Remover Cliente</button>

            <h2>Editar Cliente</h2>
            <select onChange={(e) => setClienteId(e.target.value)} className="firstinput selectlarger" value={clienteId || ''}>
                <option value="">Selecione um cliente para editar</option>
                {clientes.map(cliente => (
                    <option key={cliente.id} value={cliente.id}>ID {cliente.id} - {cliente.nome}</option>
                ))}
            </select>
            <input
                type="text"
                placeholder="Novo Nome"
                className="firstinput"
                value={clienteEditar.nome}
                onChange={(e) => setClienteEditar({ ...clienteEditar, nome: e.target.value })}
            />
            <input
                type="email"
                className="secondinput"
                placeholder="Novo Email"
                value={clienteEditar.email}
                onChange={(e) => setClienteEditar({ ...clienteEditar, email: e.target.value })}
            />
            <button onClick={handleEditCliente} className="buttons">Editar Cliente</button>
        </div>
    );
}

export default ClientesManager;
