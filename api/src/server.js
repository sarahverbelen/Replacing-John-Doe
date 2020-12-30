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

app.get('/test', (req, res) => {
    console.log("test");
    res.status(200).send();
});

// connection to the database
const pg = require('knex')({
    client: 'pg',
    version: '9.6',      
    searchPath: ['knex', 'public'],
    connection: process.env.PG_CONNECTION_STRING ? process.env.PG_CONNECTION_STRING : 'postgres://example:example@localhost:5433/test'
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
            table.integer('type');
            table.integer('order');
            table.timestamps(true, true);
          })
          .then(async () => {
            console.log('created table placeholderData');
          });
  
      }
    });

    
    await pg.schema.hasTable('type').then(async (exists) => {
      if (!exists) {
        await pg.schema
          .createTable('type', (table) => {
            table.increments();
            table.uuid('uuid');
            table.string('type');
            table.integer('typeID');
          })
          
          
      }
    });
  }
  initialiseTables()


module.exports = app;
