<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Seu Aplicativo Laravel com React</title>
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
            background-color: #007bff;
            color: white;
            margin: 5px;
        }

        .btn-custom:hover {
            background-color: #0056b3;
        }

        #app {
            margin-top: 20px;
        }
    </style>
</head>
<body>
<div class="header">
    <h1>Pagina de Produto</h1>
    <a href="{{ url('/') }}" class="btn btn-custom">Voltar para a Home</a>
</div>

<div id="app"></div>
<script src="{{ mix('js/app.js') }}"></script>
</body>
</html>
