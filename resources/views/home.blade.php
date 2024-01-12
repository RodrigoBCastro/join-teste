<!DOCTYPE html>
<html lang="en">
<head>
    <title>Home</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" crossorigin="anonymous">
    <style>
        body {
            display: flex;
            flex-direction: column;
            align-items: center;
            height: 100vh;
            margin: 0;
            padding-top: 20px;
        }

        .header {
            width: 100%;
            text-align: center;
            border-bottom: 2px solid #007bff;
            padding-bottom: 10px;
        }

        .btn-custom {
            background-color: #007bff; /* Cor padrão dos botões */
            color: white;
            margin: 5px;
        }

        .btn-custom:hover {
            background-color: #0056b3; /* Cor dos botões no hover */
        }
    </style>
</head>
<body>
<h1>Home</h1>
<div class="header">
    <a href="{{ route('produto') }}" class="btn btn-custom">Ver Produto</a>
    <a href="{{ route('categoria') }}" class="btn btn-custom">Ver Categoria</a>
</div>
</body>
</html>
