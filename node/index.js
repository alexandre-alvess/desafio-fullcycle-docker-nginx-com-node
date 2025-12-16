const express = require('express')
const mysql = require('mysql2/promise')
const app = express()
const port = 3000
const config = {
    host: 'db_mysql',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

const listNames = [
  "Alice Souza",
  "Bruno Oliveira",
  "Carla Mendes",
  "Daniel Pereira",
  "Elisa Rodrigues",
  "Felipe Martins",
  "Gabriela Lima",
  "Henrique Alves",
  "Isabela Ferreira",
  "João Costa",
  "Karina Barbosa",
  "Lucas Moreira",
  "Mariana Ribeiro",
  "Nathan Carvalho",
  "Olivia Santos",
  "Pedro Gomes",
  "Quésia Nunes",
  "Rafael Dias",
  "Sabrina Teixeira",
  "Thiago Cardoso",
  "Úrsula Fonseca",
  "Vinicius Rocha",
  "Wagner Cunha",
  "Xênia Pires",
  "Yara Monteiro",
  "Zeca Araújo",
  "Amanda Figueiredo",
  "Bruno Castro",
  "Camila Freitas",
  "Diego Ramos",
  "Elaine Moraes",
  "Fabio Lima",
  "Giovana Carvalho",
  "Hugo Barros",
  "Ingrid Pinto",
  "Júlio Azevedo",
  "Letícia Bastos",
  "Marcelo Vieira",
  "Natália Cunha",
  "Otávio Santos",
  "Paula Cardoso",
  "Ricardo Souza",
  "Simone Oliveira",
  "Tiago Martins",
  "Valéria Rodrigues",
  "Wallace Nascimento",
  "Yasmin Lopes",
  "Zilda Reis",
  "Caio Teixeira",
  "Débora Almeida"
]; 

function randomName() {
  const index = Math.floor(Math.random() * listNames.length);
  return listNames[index];
}

app.get('/', async (req,res) => {

    try {
        const connection = await mysql.createConnection(config);

        const sqlInsert = 'INSERT INTO people(name) values(?)';
        await connection.execute(sqlInsert, [randomName()]);

        const [rows] = await connection.execute('SELECT * FROM people');

        connection.end();
        
        let names = '<ul>';

        rows.forEach(row => {
            names += `<li>${row.name}</li>`;
        });

        names += '</ul>';

        const title = '<h1>Full Cycle Rocks!</h1>';
        const subtitle = '<p>Lista de nomes cadastrada no banco de dados:</p>';
        const html = title + subtitle + names;
        res.send(html);

    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao acessar o banco de dados');
    }        
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})