const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');

const Helpers = require('./utils/helpers.js')

const app = express();
http.Server(app);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// test endpoint
app.get('/test', (req, res) => {
  console.log("test");
  res.status(200).send();
});

// create endpoint
app.post('/create/:type/:data', (req, res) => {
  // check if the req has a type and data
  if (req.params.type != null && req.params.data != null) {
    if (req.params.type == 0 || req.params.type == 1 || req.params.type == 2) {
      // save the new data to the database
      const uuid = Helpers.generateUUID(); // first we generate a uuid for this placeholder data

      pg.table('placeholderData').insert({
        uuid,
        data: req.params.data,
        typeID: req.params.type
      });

      // send a statuscode when everything went right
      res.status(200).send();
    }
  }
  // send an error in case the parameters are not correct / empty
  res.status(400).send();
});

// overloading the create endpoint: in case there are not enough parameters given
app.post('/create/:type', (req, res) => {
  res.status(400).send();
});

app.post('/create', (req, res) => {
  res.status(400).send();
});

// READ ENDPOINT
app.get('/getData/:type', (req, res) => {
  if (req.params.type == 0 || req.params.type == 1 || req.params.type == 2) {
    pg
      .select(['uuid', 'data', 'typeID'])
      .from('placeholderData')
      .where({
        typeID: req.params.type
      })
      .orderByRaw('random()')
      .limit(1).then(data => {
        res.json({
          res: data
        })
      });

  } else {
    res.status(400).send();
  }
});

// overloading getData endpoint in case there are no parameters given
app.get('/getData', (req, res) => {
  res.status(400).send();
});

// DELETE endpoint
app.get('/delete/:uuid', async (req, res) => {
  await pg
  .select(['uuid', 'typeID', 'created_at', 'data'])
  .from('placeholderData')
  .where({uuid: req.params.uuid})
  .del();
  res.status(200).send();
});

// overloading delete endpoint in case there are no parameters given
app.get('/delete', (req, res) => {
  res.status(400).send();
});

// connection to the database
const pg = require('knex')({
  client: 'pg',
  version: '9.6',
  searchPath: ['knex', 'public'],
  connection: process.env.PG_CONNECTION_STRING ? process.env.PG_CONNECTION_STRING : 'postgres://example:example@localhost:5432/test'
});


// initializing database tables (in case they don't exist yet)
async function initialiseTables() {
  await pg.schema.hasTable('placeholderData').then(async (exists) => {
    if (!exists) {
      await pg.schema
        .createTable('placeholderData', (table) => {
          table.increments();
          table.uuid('uuid');
          table.string('data');
          table.integer('typeID');
          table.timestamps(true, true);
        })
        .then(async () => {
          console.log('created table placeholderData');
          // make a few titles, texts and names

          let listOfNames = ["John Doe", "Jane Doe", "Mark Verstappen", "Lily Verhaegen"];
          let listOfTitles = ["Lorem Ipsum Dolor Sit Amet", "In Het Hulst Van De Nacht", "Mijn Meest Dierbare Herinneringen"];
          let listOfTexts = ["I'm selfish, impatient and a little insecure. I make mistakes, I am out of control and at times hard to handle. But if you can't handle me at my worst, then you sure as hell don't deserve me at my best.", "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.", "Be who you are and say what you feel, because those who mind don't matter, and those who matter don't mind."];
          for (let i = 0; i < listOfNames.length; i++) {
            const uuid = Helpers.generateUUID();
            await pg.table('placeholderData').insert({
              uuid,
              data: listOfNames[i],
              typeID: 1
            })
          }

          for (let i = 0; i < listOfTitles.length; i++) {
            const uuid = Helpers.generateUUID();
            await pg.table('placeholderData').insert({
              uuid,
              data: listOfTitles[i],
              typeID: 0
            })
          }

          for (let i = 0; i < listOfTexts.length; i++) {
            const uuid = Helpers.generateUUID();
            await pg.table('placeholderData').insert({
              uuid,
              data: listOfTexts[i],
              typeID: 2
            })
          }
        });

    }
  });

  let listOfTypes = ["title", "name", "text"];

  await pg.schema.hasTable('type').then(async (exists) => {
    if (!exists) {
      await pg.schema
        .createTable('type', (table) => {
          table.increments();
          table.uuid('uuid');
          table.string('type');
          table.integer('typeID');
        }).then(async () => {
          console.log('created types');
          for (let i = 0; i < listOfTypes.length; i++) {
            const uuid = Helpers.generateUUID();
            await pg.table('type').insert({
              uuid,
              type: listOfTypes[i],
              typeID: i
            })
          }
        });


    }
  });
}
initialiseTables()


module.exports = app;