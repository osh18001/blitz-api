const axios = require('axios');
const {addOrUpdateCollection} = require('./dynamo/dynamoCollections');
const {addOrUpdateCollectionAggregateData} = require('./dynamo/dynamoCollectionAggregateData');

const seedData = async () => {
    const url = 'https://api-mainnet.magiceden.io/all_collections';
    try {
        const { data : collections } = await axios.get(url);

        const collectionPromises = collections.collections.map((collection, i) => {
            addOrUpdateCollection({ ... collection, test: 'success'});
        });
        await Promise.all(collectionPromises);
    } catch (error) {
        console.error(error);
        console.log("Not today pal");
    }
};

const seedAggregateData = async () => {
    const url = 'https://api-mainnet.magiceden.io/rpc/getAggregatedCollectionMetrics/';
    try {
        const { data : collections } = await axios.get(url);

        const collectionPromises = collections.results.map((collection, i) => {
            addOrUpdateCollectionAggregateData({ ... collection, id: i + ''});
        });
        await Promise.all(collectionPromises);
    } catch (error) {
        console.error(error);
        console.log("Not today pal");
    }
};

seedData();
seedAggregateData();
