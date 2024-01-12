<?php

namespace App\Http\Controllers;

use App\Models\CategoriaProduto;
use Illuminate\Http\Request;

class CategoriaProdutoController extends Controller {
    public function index() {
        $categorias = CategoriaProduto::all();
        return response()->json($categorias);
    }

    public function store(Request $request) {
        print "teste";
        $categoria = CategoriaProduto::create($request->all());
        return response()->json($categoria, 201);
    }

    public function show($id) {
        $categoria = CategoriaProduto::find($id);
        return response()->json($categoria);
    }

    public function update(Request $request, $id) {
        $categoria = CategoriaProduto::find($id);
        $categoria->update($request->all());
        return response()->json($categoria);
    }

    public function destroy($id) {
        CategoriaProduto::find($id)->delete();
        return response()->json(['message' => 'Categoria deletada']);
    }
}

