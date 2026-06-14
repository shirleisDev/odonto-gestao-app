<?php

namespace App\Document;

use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;

#[ODM\Document(collection: "leads")]
class Lead {

    #[ODM\Id]
    private ?string $id = null;

    #[ODM\Field(type: "string")]
    private string $nome;

    #[ODM\Field(type: "string")]
    private string $whatsapp;

    #[ODM\Field(type: "date")]
    private ?\DateTime $dataConsulta = null;


    public function setNome(string $nome): void                    { $this->nome = $nome; }
    public function setWhatsapp(string $w): void                   { $this->whatsapp = $w; }
    public function setDataConsulta(\DateTime $d): void            { $this->dataConsulta = $d; }
    public function getDataConsulta(): ?\DateTime                  { return $this->dataConsulta; }
}
