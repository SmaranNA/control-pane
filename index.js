//Import all modules exported functions here to be called in the sequence

//API Path and handling function
app.post('/client', registerNewClient);


/**
 * An API Endpoint to create new deployment for a new customer
 * @param {*} req post request body with customer details
 * @param {*} res response status of creation
 * 
 * Steps involved:
 *  - create database in mongoDB
 *  - deploy application docker container
 *  - create subdomain for application deployed and make mapping entries for previous step created containers
 *  - create an airflow dag to pull data from customer ERP system
 *  - notify create initiator about creation status
 *  - in case of any error in between any step, the previous steps need to be reverted and provide error message to initiator
 */
async function registerNewClient(req,res) {
    try {
        const mongoDb = await mongo.createNewDB();
        const webAppContainer = await webApp.createNewContainer();
        const subDomain = await domain.createNewSubDomain();
        const airflowDag;
        if(req.body.airflowRequired) {
            airflowDag = await airflow.createDag();
        }
        let body = {
            mongo: mongoDb,
            webApp: webAppContainer,
            subDomain: subDomain,
            airflowDag: airflowDag? airflowDag : null
        };
        res.status(200).json(body);

    }
    catch(e) {
        res.status(400).json(e.message);
    };
}