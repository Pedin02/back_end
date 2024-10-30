const cors = require('cors');
const express = require('express');
const admin = require("firebase-admin");

const serviceAccount =
{
  type: "service_account",
  project_id: "bolas-c19a0",
  private_key_id: "9ecf68c5fe0a9f19e5bb9e812e278c8dee5e04f0",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCdXmjaxPvJ4e4G\nnme/gMk94FanAkau9gn2RFg0pEu+NewJp4fW6ZT5fl8FrxRDqVH79vdTHvfsnrBG\nWAU1t/kNcBIvA0000MdUTp8h42p79t/WTW4O9nx6ptHIpVAlk59PA+qOFmGQ8OME\nYRrHU4HH3Gbsh23pOXmJ4HPckvurELlw+8HuZCFgLBWNZkV+gaiGhlU33AwhQyh6\nooH2HLtX1Yh5j7vheqJX089jj8AmcvKEsO3xn4k6xUVfRSpGy0QwQHl7ZzPQq6Xm\nPbbhO4KZckhba+/bg1a0klNPDmlSxEf6vKKx2H2hB+glLWl3JhA31iXKOCyVKvjD\nN5nZaqhxAgMBAAECggEACWdxx+gHXWs6TowzCjlDnWZde0W6LFyw3/X52Ox8B8IA\naNvJdPT4tXehLU1m/judNfvOUBnsyie6BDwglJMZx50rwwI1IAu9a6r2nL9ytrV8\nLxnpsqx1aB11siI54cL6fU3wO304J6GTiWiVoXV6rxM7VdVqgqpP+mauuc7RSgnB\n6Uxs/0kJNuf5fS2ZBaehkfNYZyZdWqZaHTZlf43soVfMolIkU7DGSxiJVUoLcQBm\nS/pKpT6K+MmlsrQJaUeIEbLL1do7RL0G4l0GOei5t7XeIJWVaixL7kIIQ/0PdynD\n41W/9z20al9RvEZsAs9a3NyUSxfRWT6fj+5eT8kYwQKBgQDU6JTBvkAtoM098c+E\nd0PYh6pXhceezktqVee84OeWLjUfztjopUyOp/nVgX4Hkx+amS4b0xtfSaeM7YsJ\nySOUYKCn+QEa1is+5LpS70h5Jiv8j0MsMUmnruK2eWk71Bj7tQsXIwrKtx4QwUgs\nQNt93AlnXXxIw65kvsbv3FSD0QKBgQC9OCapI399Z7fHwStDDv5kZ64fFPhX+yBJ\nE25mVlNwTONnJbt7I9tjpZmca5eVtzr5kkN235BqAx3ms2vkWWm6qccVzK79Xwx5\nk8K1Wvjau9WGXGSj4UhorRFTcWBIy5UUAFz/k27yrpPzaPN6fpIrZF/wcYPI4hmJ\nNCue/SIioQKBgQCFJM2iO2+3GRBA5K95j3wGNRD5mtezIB9ZaE97dspcyJjAQ4Ky\nOm0d6T37nvdJlV/2NkT3cZV0iYMWRpbkj7yIVcUiRj3Copx4wGEk7C7OVGi9kHnZ\ncRk2m897fYGpwIG/JwDAf1GIY+uRXs3bntOkaa4XzgajGnw81HFkHs1bgQKBgFWG\nacMNbnSKSsEZCKrYvhc33bXizpVFxsQA6meLIU+jES3wGhuAi4swsIvI/c0H8roX\naDL0vduM6Rj7hArEd0uNrZSm3XlcWtEg/mLmaZDEUbDXVg3Up9vYTfp/Rlvg2NMf\njuleBEngqrLcfyCg0QSX691MEZrcx1oCoKzOEX3BAoGADzZPREEHtnIwKpZOfGWA\nFdmtaJYhmh8zKTFyKy9J6RlQqUAUrg4SvACLD00mQv1e9IW/ttyn4z+KQpLoBmx3\nTMt5cLu1CE9iVi1MYm4sCoYEbKPHjPCCu++AqUWTGujpLKqxeFkrdYmRebUHrHzI\ngGo1IqHxfpZBbY1EiGYOUYc=\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-kdwmn@bolas-c19a0.iam.gserviceaccount.com",
  client_id: "117208483089066330802",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-kdwmn%40bolas-c19a0.iam.gserviceaccount.com",
  universe_domain: "googleapis.com"
};


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const app = express();

app.use(cors());
app.use(express.json());


app.get('/card', async (req, res) => {
  try {
    const response = await db.collection('card').get();
    const card = response.docs.map(doc => ({
      id: doc.id, ...doc.data(),
    }));
    console.log(card);
    res.status(200).json({ card });
    console.log('Cartões devolvidos com sucesso!');
  } catch (e) {
    console.log(e);
    res.status(500).json({ menssagem: 'Erro ' + e });
    console.log('Erro ao buscar dados' + e);
  }
});

app.post('/card', async (req, res) => {
  const { title, value, image } = req.body;
  if (!title) {
    res.status(400).json({ mensagem: 'Linguagem do cartão inválida!' });
    console.log('Novo cartão não cadastrado, linguagem inválida!');
  } else if (!value) {
    res.status(400).json({ mensagem: 'Nome do cartão inválido!' });
    console.log('Novo cartão não cadastrado, value inválido!');
  } else if (!image) {
    res.status(400).json({ mensagem: 'Imagem do cartão inválida!' });
    console.log('Novo cartão não cadastrado, imagem inválida!');
  } else {
    try {
      const novoCartaoRef = await db.collection('card').add({
        linguagem: title, //propriedade diferente do value da variavel
        value: value,
        image, //propriedade com mesmo value da variavel
        criadoEm: admin.firestore.FieldValue.serverTimestamp()
      });
      res.status(201).json({
        mensagem: 'Cartão cadastrado com sucesso!',
        id: novoCartaoRef.id
      });
      console.log('Novo cartão cadastrado com ID:', novoCartaoRef.id);
    } catch (error) {
      console.error('Erro ao cadastrar cartão:', error);
      res.status(500).json({ mensagem: 'Erro ao cadastrar cartão' });
    }
  }
});


app.delete('/card', async (req, res) => {
  const id = req.body.cartao;
  if (!id) {
    res.status(400).json({ mensagem: 'ID do cartão não fornecido' });
    console.log('ID do cartão não fornecido');
  } else {
    try {
      const cartaoRef = db.collection('card').doc(id);
      const doc = await cartaoRef.get();
      if (!doc.exists) {
        res.status(404).json({
          mensagem: 'Cartão com ID '
            + cartao + ' não encontrado'
        });
        console.log('Cartão não encontrado');
      } else {
        await cartaoRef.delete();
        res.status(200).json({
          mensagem: 'Cartão com ID '
            + cartao + ' deletado'
        });
        console.log('Cartão com ID ' + cartao + ' deletado');
      }
    } catch (e) {
      console.error('Erro ao deletar cartão:', e);
      res.status(500).json({ mensagem: 'Erro ao deletar cartão' });
    }
  }
});


app.put('/card', async (req, res) => {
  const { linguagem, value, image, id } = req.body;
  if (!id) {
    res.status(400).json({ mensagem: 'ID do cartão não fornecido' });
    console.log('Cartão não atualizado, ID inválido.');
  } else {
    try {
      const cartaoRef = db.collection('card').doc(id);
      const doc = await cartaoRef.get();
      if (!doc.exists) {
        res.status(404).json({
          mensagem: 'Cartão com ID '
            + id + ' não encontrado'
        });
        console.log('Cartão não encontrado');
      } else {
        const dadosAtualizados = {};
        if (linguagem) dadosAtualizados.linguagem = linguagem;
        if (value) dadosAtualizados.value = value;
        if (image) dadosAtualizados.image = image;
        await cartaoRef.update(dadosAtualizados);
        res.status(200).json({
          mensagem: 'Cartão com ID '
            + id + ' atualizado'
        });
        console.log('Cartão com ID ' + id + ' atualizado');
      }
    } catch (error) {
      console.error('Erro ao atualizar cartão:', error);
      res.status(500).json({ mensagem: 'Erro ao atualizar cartão' });
    }
  }
});

module.exports = app;

app.listen(3000, () => {
  console.log('rodando');
});