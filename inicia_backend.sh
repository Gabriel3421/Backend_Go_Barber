echo 'Iniciando Back-end'
echo 'Iniciando Servidores Docker dos Bancos de dados'
sudo docker start mongobarber
sudo docker start redisbarber
sudo docker start database
echo 'Iniciando Parte Visual do Banco de Dados'
echo 'Iniciando Mongo Community'
# echo 'link de conecção: mongodb://localhost:27017/gobarber'
# mongodb-compass-community &
echo 'Postbird deve ser iniciado manualmente'
# echo 'Iniciando Servidor do Back-end'
# cd /home/gabriel/Documentos/bootcamp2019/modulo2e3
# echo 'Rodando na Porta 3333'
# yarn dev
