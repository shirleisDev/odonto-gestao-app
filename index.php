<?php
// Cabeçalhos de Segurança e CORS liberados para a rede local
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Se for uma requisição de teste (OPTIONS) do Expo, responde 200 e sai
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}


// Tenta incluir os arquivos tratando caminhos relativos de forma limpa
if (file_exists(__DIR__ . '/classes/Procedimento.php')) {
    require_once __DIR__ . '/classes/Procedimento.php';
    require_once __DIR__ . '/classes/LeadRepository.php';
} else {
    // Caso os arquivos estejam direto na raiz do projeto e não na pasta classes
    require_once __DIR__ . '/Procedimento.php';
    require_once __DIR__ . '/LeadRepository.php';
}


define("NOME_CLINICA", "Dra. Josiane - Odontologia");

try {
    // Captura e decodifica o payload JSON vindo do React Native / Expo
    $jsonBruto = file_get_contents("php://input");
    $requisicao = json_decode($jsonBruto, true);

    // Validação se os campos obrigatórios foram preenchidos
    if (empty($requisicao['nome_paciente']) || empty($requisicao['whatsapp']) || empty($requisicao['data_escolhida'])) {
        http_response_code(400);
        echo json_encode(["erro" => "Bad Request: Todos os campos são obrigatórios."]);
        exit();
    }

    // Instanciação das classes (POO)
    $procedimento = new Procedimento();
    $repositorio = new LeadRepository();

    // Salva os dados diretamente na nova tabela do phpMyAdmin
    $repositorio->salvar(
        $requisicao['nome_paciente'], 
        $requisicao['whatsapp'], 
        $requisicao['data_escolhida']
    );

    // Resposta estruturada devolvida com sucesso ao React Native
    http_response_code(200);
    echo json_encode([
        "status" => "Agendamento realizado com sucesso!",
        "procedimento" => $procedimento->getNome(),
        "valor" => $procedimento->getValor(),
        "parcelas" => $procedimento->getParcelas(),
        "valor_parcela" => $procedimento->getValorParcela(),
        "clinica" => NOME_CLINICA,
        "timestamp" => time()
    ]);

}

 catch (Exception $e) {
    // CAPRICHO TÉCNICO: Impede que o PHP jogue HTML na tela e quebre o Expo
    http_response_code(200); // Força um status OK para o Expo conseguir ler
    echo json_encode([
        "erro" => "Erro interno no servidor PHP",
        "mensagem" => $e->getMessage()
    ]);
    exit();
}
