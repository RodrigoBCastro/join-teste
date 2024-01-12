<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTbProdutoTable extends Migration {
    public function up() {
        Schema::create('tb_produto', function (Blueprint $table) {
            $table->id('id_produto');
            $table->unsignedBigInteger('id_categoria_produto');
            $table->dateTime('data_cadastro');
            $table->string('nome_produto', 150);
            $table->float('valor_produto', 10, 2);
            $table->timestamps();

            $table->foreign('id_categoria_produto')->references('id_categoria_planejamento')->on('tb_categoria_produto');
        });
    }

    public function down() {
        Schema::dropIfExists('tb_produto');
    }
}
