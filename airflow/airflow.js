function createDag() {
    try {
        //Create airflow dag here
    } catch(e) {
        //Handle error here
        //invoke clean up of domain
        //invoke clean up of webapp
        //invoke clean up of mongodb here
        throw(e);
        //to let the invoker know of the error and handle exit gracefully
    }

}