import React, { useState, useEffect } from 'react';
import { getProdutos, getVendedores, addVendedor, associarProdutoVendedor, deleteVendedor, updateVendedor } from '../api';

function VendedoresManager() {
    const [vendedores, setVendedores] = useState([]);
    const [produtos, setProdutos] = useState([]);
    const [novoVendedor, setNovoVendedor] = useState({ nome: '', email: '' });
    const [vendedorId, setVendedorId] = useState('');
    const [produtoId, setProdutoId] = useState('');
    const [vendedorEditar, setVendedorEditar] = useState({ nome: '', email: '' });

    // Carrega a lista de produtos e vendedores
    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseProdutos = await getProdutos();
                const responseVendedores = await getVendedores();
                setProdutos(responseProdutos.data);
                setVendedores(responseVendedores.data);
            } catch (error) {
                console.error('Erro ao carregar dados:', error);
            }
        };
        fetchData();
    }, []);

    // Adiciona um novo vendedor
    const handleAddVendedor = async () => {
        try {
            const response = await addVendedor(novoVendedor);
            setVendedores([...vendedores, response.data]);
            setNovoVendedor({ nome: '', email: '' });
            alert(`Vendedor ${response.data.nome} criado com sucesso!`);
        } catch (error) {
            console.error('Erro ao criar vendedor:', error);
        }
    };

    // Remove um vendedor
    const handleDeleteVendedor = async () => {
        if (!vendedorId) {
            alert('Selecione um vendedor para remover.');
            return;
        }
        try {
            await deleteVendedor(vendedorId);
            setVendedores(vendedores.filter((vendedor) => vendedor.id !== vendedorId));
            alert('Vendedor removido com sucesso!');
        } catch (error) {
            console.error('Erro ao remover vendedor:', error);
        }
    };

    // Edita um vendedor
    const handleUpdateVendedor = async () => {
        if (!vendedorId) {
            alert('Selecione um vendedor para editar.');
            return;
        }
        try {
            await updateVendedor(vendedorId, vendedorEditar);
            setVendedores(vendedores.map((v) => (v.id === vendedorId ? { ...v, ...vendedorEditar } : v)));
            setVendedorEditar({ nome: '', email: '' });
            alert('Vendedor atualizado com sucesso!');
        } catch (error) {
            console.error('Erro ao editar vendedor:', error);
        }
    };

    const handleAssociarProdutoVendedor = async (vendedorId, produtoId) => {
        try {
            const response = await associarProdutoVendedor(vendedorId, produtoId);
            if (response.data) {
                alert(`Produto ${produtoId} associado ao vendedor ${vendedorId} com sucesso!`);
            } else {

            }
        } catch (error) {
            console.error('Erro ao associar produto ao vendedor:', error);
        }
    };

    return (
        <div>
            <h2 id="gervendedorestitle">Adicionar Vendedor</h2>
            <input
                type="text"
                placeholder="Nome"
                value={novoVendedor.nome}
                onChange={(e) => setNovoVendedor({ ...novoVendedor, nome: e.target.value })}
                class="firstinput"
            />
            <input
                type="email"
                placeholder="Email"
                value={novoVendedor.email}
                onChange={(e) => setNovoVendedor({ ...novoVendedor, email: e.target.value })}
                class="secondinput"
            />
            <button onClick={handleAddVendedor} class="buttons">Adicionar Vendedor</button>

            <h2>Remover Vendedor</h2>
            <select onChange={(e) => setVendedorId(e.target.value)} value={vendedorId} class="selectvendedor selectlarger">
                <option value="">Selecione um vendedor para remover</option>
                {vendedores.map((vendedor) => (
                    <option key={vendedor.id} value={vendedor.id}>
                        {vendedor.nome}
                    </option>
                ))}
            </select>
            <button onClick={handleDeleteVendedor} class="buttons">Remover Vendedor</button>

            <h2>Editar Vendedor</h2>
            <select onChange={(e) => setVendedorId(e.target.value)} value={vendedorId} class="selectvendedor selectlarger">
                <option value="">Selecione um vendedor para editar</option>
                {vendedores.map((vendedor) => (
                    <option key={vendedor.id} value={vendedor.id}>
                        {vendedor.nome}
                    </option>
                ))}
            </select>
            <input
                type="text"
                placeholder="Novo Nome"
                value={vendedorEditar.nome}
                onChange={(e) => setVendedorEditar({ ...vendedorEditar, nome: e.target.value })}
                class="firstinput"
            />
            <input
                type="email"
                placeholder="Novo Email"
                value={vendedorEditar.email}
                onChange={(e) => setVendedorEditar({ ...vendedorEditar, email: e.target.value })}
                class="secondinput"
            />
            <button onClick={handleUpdateVendedor} class="buttons">Editar Vendedor</button>

            <h2>Associar Produto a Vendedor</h2>
            <select onChange={(e) => setVendedorId(e.target.value)} value={vendedorId} class="selectvendedor selecthalf">
                <option value="">Selecione um vendedor</option>
                {vendedores.map((vendedor) => (
                    <option key={vendedor.id} value={vendedor.id}>
                        {vendedor.nome}
                    </option>
                ))}
            </select>

            <select onChange={(e) => setProdutoId(e.target.value)} value={produtoId} class="selectproduto selectlarger">
                <option value="">Selecione um produto</option>
                {produtos.map((produto) => (
                    <option key={produto.id} value={produto.id}>
                        {produto.nome}
                    </option>
                ))}
            </select>

            <button onClick={() => handleAssociarProdutoVendedor(vendedorId, produtoId)} class="buttons">Associar Produto a Vendedor</button>
        </div>
    );
}

export default VendedoresManager;