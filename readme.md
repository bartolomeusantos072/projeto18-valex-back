# projeto18-valex

crie uma headers com o nome de x-api-key e insira o seguinte valor: 
zadKLNx.DzvOVjQH01TumGl2urPjPQSxUbf67vs0 para realizar os testes.

** POST create-card **
Para um cartão ser criado precisamos do identificador do empregado e do tipo do cartão.

http://localhost:PORT/create-card

exemplo: 
{
  "employeeId":1,
  "cardType":"education"
}

* Insira um valor numerico para employeeId, 
* O cardType deve ser uma string das seguintes opções: 'groceries', 'restaurants', 'transport', 'education', 'health'


** POST activation-card **
 Para um cartão ser ativado precisamos do identificador, do CVC do mesmo e da senha que será cadastrada.
 

http://localhost:PORT/activation-card

exemplo: 
{
   "cardId": 1,
    "securityCode": "132",
    "password": "1234" 
}

cardId deve ser um  numero inteiro
securityCode tipo 
password é do tipo string


** POST transactions-card **

Nessa rota, empregados podem visualizar o saldo de um cartão e as transações do mesmo. Para isso, precisamos do identificador do cartão.

http://localhost:5000/transactions-card

exemplo:

{
   "cardId": 7
}


Nessa rota, empregados podem bloquear cartões. Para um cartão ser bloqueado precisamos do identificador e da senha do mesmo.

http://localhost:5000/lock-card

exemplo:
{
   "cardId": 7,
	 "password":"1234"
}



Nessa rota, empregados podem desbloquear cartões. Para um cartão ser desbloqueado precisamos do identificador e da senha do mesmo.

http://localhost:5000/unlock-card

exemplo:
{
   "cardId": 7,
	 "password":"1234"
}


Nessa rota, empresas com uma chave de API válida podem recarregar cartões de seus empregados. Para um cartão ser recarregado precisamos do identificador do mesmo.

http://localhost:5000/recharge
{
   "cardId": 7,
    "amount": 3
}

Nessa rota, empregados podem comprar em Points of Sale (maquininhas). Para uma compra em um POS ser efetuada precisamos do identificador do cartão utilizado e da senha do mesmo, do identificador do estabelecimento e do montante da compra.

http://localhost:5000/payment

{
   "cardId": 7,
    "password":"1234" ,
    "businessId": 1,
    "amount": 3
}