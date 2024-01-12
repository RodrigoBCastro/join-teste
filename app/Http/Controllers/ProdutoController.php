<?php

namespace App\Http\Controllers;

use App\Models\Produto;
use Illuminate\Http\Request;

class ProdutoController extends Controller {
    public function index() {
        $produtos = Produto::with('categoria')->get();
        return response()->json($produtos);
    }

    public function store(Request $request) {
        $produto = Produto::create($request->all());
        return response()->json($produto, 201);
    }

    public function show($id) {
        $produto = Produto::with('categoria')->find($id);
        return response()->json($produto);
    }

    public function update(Request $request, $id) {
        $produto = Produto::find($id);
        $produto->update($request->all());
        return response()->json($produto);
    }

    public function destroy($id) {
        Produto::find($id)->delete();
        return response()->json(['message' => 'Produto deletado']);
    }
}
