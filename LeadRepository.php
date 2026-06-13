<<?php

class LeadRepository {
    private PDO $conexao;

    public function __construct() {
        // Configurações padrão de conexão com o phpMyAdmin local
        $host = "127.0.0.1"; 
        $banco = "clinica_odonto";
        $usuario = "root"; 
        $senha = "";       

        try {
            $this->conexao = new PDO("mysql:host=$host;dbname=$banco;charset=utf8", $usuario, $senha);
            $this->conexao->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            throw new Exception("Erro de conexão no phpMyAdmin: " . $e->getMessage());
        }
    }

    public function salvar(string $nome, string $whatsapp, string $dataEscolhida, string $tipoServico = "", string $procedimento = "", string $campanha = ""): bool {
        // Sanitização dos dados enviados pelo Expo Go
        $nomeSanitizado = strtoupper(strip_tags(trim($nome)));
        $whatsappSanitizado = preg_replace('/\D/', '', $whatsapp);
        
        try {
            // Insere os dados exatamente nas colunas que você criou no banco
            $sql = "INSERT INTO agendamentos (nome, whatsapp, data_consulta) VALUES (:nome, :whatsapp, :data_consulta)";
            $stmt = $this->conexao->prepare($sql);
            
            $stmt->bindParam(':nome', $nomeSanitizado);
            $stmt->bindParam(':whatsapp', $whatsappSanitizado);
            $stmt->bindParam(':data_consulta', $dataEscolhida);
            
            return $stmt->execute();
        } catch (PDOException $e) {
            throw new Exception("Erro ao gravar dados no MySQL: " . $e->getMessage());
        }
    }
}
