import React, { Component } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';

class ProductList extends Component {
    state = {
        id_categoria_produto: '',
        nome_produto: '',
        valor_produto: '',
        data_cadastro: '',
        categorias: [],
        products: [],
        categoriaMap: {},
        editingProduct: null,
        showEditForm: false,
    };

    componentDidMount() {
        axios.get('http://localhost:8000/api/products').then((response) => {
            this.setState({ products: response.data });
        });

        axios.get('http://localhost:8000/api/categories').then((response) => {
            const categoriaMap = response.data.reduce((map, categoria) => {
                map[categoria.id_categoria_planejamento] = categoria.nome_categoria;
                return map;
            }, {});
            this.setState({ categorias: response.data, categoriaMap });
        });

        const currentDate = new Date().toISOString().split('T')[0];
        this.setState({ data_cadastro: currentDate });
    }

    handleDelete = async (productId) => {
        try {
            await axios.delete(`http://localhost:8000/api/products/${productId}`);

            this.setState((prevState) => ({
                products: prevState.products.filter((product) => product.id_produto !== productId),
            }));
            console.log('Produto excluído com sucesso');
        } catch (error) {
            console.error('Erro ao excluir produto:', error);
        }
    };

    handleEditClick = (product) => {
        this.setState({ editingProduct: product, showEditForm: true });
    };

    handleNewChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };
    handleEditChange = (e) => {
        const { name, value } = e.target;
        this.setState((prevState) => ({
            editingProduct: { ...prevState.editingProduct, [name]: value },
        }));
    };

    handleNewSubmit = async (e) => {
        e.preventDefault();

        const { id_categoria_produto, nome_produto, valor_produto, data_cadastro } = this.state;

        try {
            const response = await axios.post('http://localhost:8000/api/products', {
                id_categoria_produto,
                nome_produto,
                valor_produto,
                data_cadastro,
            });

            console.log('Dados enviados com sucesso:', response.data);

            const newList = await axios.get('http://localhost:8000/api/products');
            this.setState({
                products: newList.data,
                id_categoria_produto: '',
                nome_produto: '',
                valor_produto: '',
                data_cadastro: '',
            });
        } catch (error) {
            console.error('Erro ao cadastrar produto:', error);
            // Lide com erros, exiba mensagens de erro ou realize ações apropriadas
        }
    };
    handleEditSubmit = async () => {
        try {
            const { editingProduct } = this.state;
            await axios.put(`http://localhost:8000/api/products/${editingProduct.id_produto}`, editingProduct);
            console.log('Produto editado com sucesso');

            this.setState((prevState) => ({
                products: prevState.products.map((prod) =>
                    prod.id_produto === editingProduct.id_produto ? editingProduct : prod
                ),
                showEditForm: false,
            }));
        } catch (error) {
            console.error('Erro ao editar produto:', error);
        }
    };

    renderNewForm() {
        return (
            <div>
                <h1>Cadastro de Produto</h1>
                <form onSubmit={this.handleNewSubmit}>
                    <div>
                        <label htmlFor="id_categoria_produto">Categoria do Produto:</label>
                        <select
                            id="id_categoria_produto"
                            name="id_categoria_produto"
                            onChange={this.handleNewChange}
                            value={this.state.id_categoria_produto}
                            required
                        >
                            <option value="">Selecione uma categoria</option>
                            {this.state.categorias.map((categoria) => (
                                <option key={categoria.id_categoria_planejamento} value={categoria.id_categoria_planejamento}>
                                    {categoria.nome_categoria}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="nome_produto">Nome do Produto:</label>
                        <input
                            type="text"
                            id="nome_produto"
                            name="nome_produto"
                            value={this.state.nome_produto}
                            onChange={this.handleNewChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="valor_produto">Valor do Produto:</label>
                        <input
                            type="number"
                            id="valor_produto"
                            name="valor_produto"
                            value={this.state.valor_produto}
                            onChange={this.handleNewChange}
                            required
                        />
                    </div>
                    <div>
                        <input type="hidden" name="data_cadastro" value={this.state.data_cadastro} />
                    </div>
                    <div>
                        <button type="submit">Cadastrar Produto</button>
                    </div>
                </form>
            </div>
        );
    }

    renderEditForm() {
        const { editingProduct } = this.state;
        if (!editingProduct) return null;

        return (
            <div>
                <h2>Editar Produto</h2>
                <TextField
                    label="ID"
                    value={editingProduct.id_produto}
                    name="id_produto"
                    onChange={this.handleEditChange}
                    disabled
                />
                <TextField
                    label="Nome"
                    value={editingProduct.nome_produto}
                    name="nome_produto"
                    onChange={this.handleEditChange}
                />
                <TextField
                    label="Valor"
                    value={editingProduct.valor_produto}
                    name="valor_produto"
                    onChange={this.handleEditChange}
                />
                <Button variant="contained" color="primary" onClick={this.handleEditSubmit}>
                    Salvar
                </Button>
            </div>
        );
    }

    render() {
        const { products, categoriaMap } = this.state;

        return (
            <div>
                {this.renderNewForm()}

                <h1>Lista de Produtos</h1>
                <TableContainer component={Paper}>
                    <Table aria-label="Produtos">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Nome</TableCell>
                                <TableCell>Valor</TableCell>
                                <TableCell>Categoria</TableCell>
                                <TableCell>Ação</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map((product) => (
                                <TableRow key={product.id_produto}>
                                    <TableCell>{product.id_produto}</TableCell>
                                    <TableCell>{product.nome_produto}</TableCell>
                                    <TableCell>{product.valor_produto}</TableCell>
                                    <TableCell>{categoriaMap[product.id_categoria_produto]}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => this.handleEditClick(product)}
                                            style={{ marginRight: '10px' }}
                                        >
                                            Editar
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="error"
                                            onClick={() => this.handleDelete(product.id_produto)}
                                        >
                                            Excluir
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {this.state.showEditForm && this.renderEditForm()}
            </div>
        );
    }
}

export default ProductList;
