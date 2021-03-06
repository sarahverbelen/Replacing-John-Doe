# Replacing-John-Doe
## What does it do?
It does what the names says it will do: it replaces John Doe's. Replacing John Doe (RJD) is an API that generates more believable placeholder data so that you do not have to go back to Lorem Ipsum's and John Doe's.  
## Why is it useful?
When you are developing, it can be very helpful to have, for example, a database with data that you can work on. You probably don't want to work on the real data when you're just developing - or you might not have real data yet. This API strives to give you an easy way to quickly have a lot of data to test with, without adding extra work. 
## Getting Started
### Running Locally
You can run the api locally using Docker. If you do not have Docker installed, please refer to [the Docker documentation](https://docs.docker.com/). 
1. Create a container using the docker-compose file; run `docker-compose up` in your terminal.
2. Navigate to the api in your browser using the url: `localhost:3000`. 

### Endpoints
1. **/createPlaceholderData** POST: /create/:type/:data -> type is either 0 (title), 1 (name) or 2 (text); data is a string. Saves data to the database. Returns the uuid of the newly created data.
2. **/getPlaceholderData** GET: /getData/:type -> type is either 0 (title), 1 (name) or 2 (text). Returns a random piece of data from the given type.
3. **/deletePlaceholderData** GET: /delete/:uuid -> deletes the data with the given uuid
4. **/updatePlaceholderData** GET: /update/:uuid/:type/:data -> edits the data with given uuid to have the given type and data
5. **/getAllPlaceholderData** GET: /getAllPlaceholderData -> returns a json with all of the placeholder data currently in the database
### Tests
1. **Endpoints**: testing the various endpoints.
2. **Helpers**: tests the helper functions (e.g. checkDataLength function)
3. **Integration**: runs through the endpoints to see how they work together

**Running the tests**
1. Navigate to the api folder
2. enter `npm test` in the terminal
## Where can I find help?
If you have a question, please email me at *sarah.verbelen@student.ehb.be*.
## Project Status
This project is currently **in development**.
## Authors
* Sarah Verbelen

## Github Flow vs GIT Flow
This project uses Github flow instead of GIT Flow. The reason for this is that I want to keep this project simple and sweet and the rigid branch structure of a traditional GIT Flow would needlessly complicate things. Additionally, as I am only a single developer working on this project, there is no need for the overview that the GIT Flow provides.