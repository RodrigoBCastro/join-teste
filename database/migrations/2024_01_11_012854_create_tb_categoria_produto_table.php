<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTbCategoriaProdutoTable extends Migration {
    public function up() {
        Schema::create('tb_categoria_produto', function (Blueprint $table) {
            $table->id('id_categoria_planejamento');
            $table->string('nome_categoria', 150);
            $table->timestamps();
        });
    }

    public function down() {
        Schema::dropIfExists('tb_categoria_produto');
    }
}
