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

class CategoryList extends Component {
    state = {
        nome_categoria: '',
        categories: [],
        editingCategory: null,
        showEditForm: false,
    };

    componentDidMount() {
        axios.get('http://localhost:8000/api/categories').then((response) => {
            this.setState({ categories: response.data });
        });
    }

    handleDelete = async (categoryId) => {
        try {
            await axios.delete(`http://localhost:8000/api/categories/${categoryId}`);

            this.setState((prevState) => ({
                categories: prevState.categories.filter((category) => category.id_categoria_planejamento !== categoryId),
            }));
            console.log('Categoria excluída com sucesso');
        } catch (error) {
            console.error('Erro ao excluir categoria:', error);
        }
    };

    handleEditClick = (category) => {
        this.setState({ editingCategory: category, showEditForm: true });
    };

    handleNewChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };
    handleEditChange = (e) => {
        const { name, value } = e.target;
        this.setState((prevState) => ({
            editingCategory: { ...prevState.editingCategory, [name]: value },
        }));
    };

    handleNewSubmit = async (e) => {
        e.preventDefault();

        const { nome_categoria } = this.state;

        try {
            const response = await axios.post('http://localhost:8000/api/categories', {
                nome_categoria,
            });

            console.log('Dados enviados com sucesso:', response.data);

            const newList = await axios.get('http://localhost:8000/api/categories');
            this.setState({
                categories: newList.data,
                nome_categoria: '',
            });
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
        }
    };

    handleEditSubmit = async () => {
        try {
            const { editingCategory } = this.state;
            await axios.put(`http://localhost:8000/api/categories/${editingCategory.id_categoria_planejamento}`, editingCategory);
            console.log('Categoria editada com sucesso');

            this.setState((prevState) => ({
                categories: prevState.categories.map((cat) =>
                    cat.id_categoria_planejamento === editingCategory.id_categoria_planejamento ? editingCategory : cat
                ),
                showEditForm: false,
            }));
        } catch (error) {
            console.error('Erro ao editar categoria:', error);
        }
    };

    renderNewForm() {
        return (
            <div>
                <h1>Cadastro de Categoria</h1>
                <form onSubmit={this.handleNewSubmit}>
                    <div>
                        <label htmlFor="nome_categoria">Nome da Categoria:</label>
                        <input
                            type="text"
                            id="nome_categoria"
                            name="nome_categoria"
                            value={this.state.nome_categoria}
                            onChange={this.handleNewChange}
                            required
                        />
                    </div>
                    <div>
                        <button type="submit">Cadastrar Categoria</button>
                    </div>
                </form>
            </div>
        );
    }

    renderEditForm() {
        const { editingCategory } = this.state;
        if (!editingCategory) return null;

        return (
            <div>
                <h2>Editar Categoria</h2>
                <TextField
                    label="ID"
                    value={editingCategory.id_categoria_planejamento}
                    name="id_categoria_planejamento"
                    onChange={this.handleEditChange}
                    disabled
                />
                <TextField
                    label="Nome"
                    value={editingCategory.nome_categoria}
                    name="nome_categoria"
                    onChange={this.handleEditChange}
                />
                <Button variant="contained" color="primary" onClick={this.handleEditSubmit}>
                    Salvar
                </Button>
            </div>
        );
    }

    render() {
        const { categories } = this.state;

        return (
            <div>
                {this.renderNewForm()}

                <h1>Lista de Categorias</h1>
                <TableContainer component={Paper}>
                    <Table aria-label="Categorias">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Nome</TableCell>
                                <TableCell>Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {categories.map((category) => (
                                <TableRow key={category.id_categoria_planejamento}>
                                    <TableCell>{category.id_categoria_planejamento}</TableCell>
                                    <TableCell>{category.nome_categoria}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => this.handleEditClick(category)}
                                            style={{ marginRight: '10px' }}
                                        >
                                            Editar
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="error"
                                            onClick={() => this.handleDelete(category.id_categoria_planejamento)}
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

export default CategoryList;
