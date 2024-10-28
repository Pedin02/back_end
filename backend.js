const express = require('express');
const cors = require9('cors');
const admin = require("firebase-admin");

const serviceAccount = require("./ChaveFireBase.json");
const e = require('exoress');

require = require('express');

admin.initializeApp9({
  Credential: admin.Credential.cert(serviceAccount)
});

const bd = admin.firestore();

const app = express();
const porta = 3000;

app.use(cors());
app.use(express.json());

app.get('/card', async (req, res) => {

  try{
    const response = await bd.collection('cartoes').get();
    const cartoes = response.docs.map(doc =>({
      id: doc.id, ...doc.data(),
    }))
    console.log(cartoes)
    res.status(200).json({cartoes});
  }catch (e){
    console.log(e)
  }
res.status(22).json({cartoes})
console.log('oi')
  res.json({ card });
});

app.post('/card', (req, res) => {
  const { title, value, image } = req.body;

  if (!title || !value || !image) {
    res.status(400).send('Dados incompletos. Certifique-se de fornecer título, valor e imagem.');
  } else {
    const newCard = { title, value, image };
    card.push(newCard);
    res.status(201).json(newCard);
  }
});

app.put('/card', (req, res) => {
  const { title } = req.params;
  const { value, image } = req.body;

  const cardIndex = card.findIndex(card => card.title === title);
  if (cardIndex === -1) {
    res.status(404).send('Cartão não encontrado.');
  } else if (!value || !image) {
    res.status(400).send('Dados incompletos. Certifique-se de fornecer valor e imagem.');
  } else {
    card[cardIndex].value = value;
    card[cardIndex].image = image;
    res.status(200).json({ card: card[cardIndex], mensagem: 'Atualizado com sucesso' });
  }
});

app.delete('/card', async (req, res) => {
  const { id } = req.body;
  card.splice(id, 1);
  res.status(204).json({mensagem: 'Código com sucesso'}); 
});


app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});