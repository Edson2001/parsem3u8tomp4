# parsem3u8tomp4


Este projeto é um servidor Node.js que transcodifica streams de vídeo M3U8 em MP4 em tempo real utilizando FFmpeg. O servidor está configurado para ser executado em um contêiner Docker para facilitar a implantação e execução.

## Pré-requisitos

- Docker
- Docker Compose (opcional, mas recomendado para gerenciamento de contêineres)

## Como usar

### Clonar o Repositório

Primeiro, clone o repositório para sua máquina local:

```bash
git clone https://github.com/seu-usuario/parsem3u8.git
cd parsem3u8
```
## Construir e Executar o Contêiner Docker
```bash
docker build -t parsem3u8 .
```
```bash
docker run -p 3000:3000 parsem3u8
```

## Testar o Endpoint
```bash
http://localhost:3000/transcode?url=https://cdn-3.nxplay.com.br/AXN_TK/tracks-v2a1/mono.m3u8
```
## Contribuições
Sinta-se à vontade para contribuir com o projeto enviando pull requests ou reportando problemas.

## Licença
Este projeto está licenciado sob a licença MIT. Consulte o arquivo LICENSE para obter mais detalhes.

