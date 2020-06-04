import mongoDB from 'mongodb';

const url = 'mongodb://localhost';
const MongoClient = mongoDB.MongoClient;

function dataBaseQuery(collection: string, query: any) {
    let result: any;
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
        if (err) throw err;
        const dbo = db.db("table-top-track");
        dbo.collection(collection).aggregate([
            {
                $lookup: query
            }
        ]).toArray((error: any, res: any) => {
            if (error) {
                throw error;
            }
            console.log("res", res);
            result = JSON.stringify(res);
            db.close();
        });
    });

    return result;
}

export {
    dataBaseQuery
}
