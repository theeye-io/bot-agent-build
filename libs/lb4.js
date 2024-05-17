const path = require('path')
const dotenv = (process.env.DOTENV_PATH || path.resolve(__dirname, '../.env'))
require('dotenv').config({ path: dotenv })
const {MongodbDataSource} = require('../server/dist/datasources/mongodb.datasource.js')
const {JobRepository} = require('../server/dist/repositories/job.repository.js')
const {BatchRepository} = require('../server/dist/repositories/batch.repository.js')
const {retry} = require('../libs/helpers.js')
const retries = process.env.LB4_RETRIES ? Number(process.env.LB4_RETRIES) : 10

const db = new MongodbDataSource()

const repositories = {
    job: JobRepository,
    batch: BatchRepository,
}

class App {
    constructor(model) {
        this.repository = this.callRepository(model)
    }

    callRepository = (model) => {
        const repoDefinition = repositories[model]
        return new repoDefinition(db)
    }

    /**
     * filter as lb3 filters ex. {where:{att:'value'}}
     * @param {LoopbackFilter} filter 
     * @returns 
     */
    find = async (filter) => await retry(async () => {
            return await this.repository.find(filter)
        }, {retries})
    
    /**
     * 
     * @param {string} id 
     * @returns 
     */
    findById = async (id) => await retry(async () => {
            return await this.repository.findById(id)
        }, {retries})

        /**
     * 
     * @param {string} id 
     * @returns 
     */
    deleteById = async (id) => await retry(async () => {
        return await this.repository.deleteById(id)
    }, {retries})

    /**
     * 
     * @param {string} id 
     * @param {any} payload 
     * @returns 
     */
    updateById = async (id, payload) => await retry(async () => {
        return await this.repository.updateById(id, payload)
    }, {retries})
   
    /**
     * filter as lb3 filters ex. {where:{att:'value'}}
     * @param {any} payload 
     * @param {LoopbackFilter} filter 
     * @returns
     */
    findOrCreate = async (payload, filter) => await retry(async () => {
        const [found] = await this.repository.find(filter)
        if (found) return { data: found, created: false }
        else return { data: await this.repository.create(payload), created: true }
    }, {retries})
    
    /**
     * 
     * @param {any} payload 
     * @returns 
     */
    create = async (payload) => await retry(async () => {
        return await this.repository.create(payload)
    }, {retries})
        
    /**
     * payload must only include where object as root
     * @param {any} payload
     * @returns 
     */
    count = async (payload) => await retry(async () => {
        return await this.repository.count(payload)
    }, {retries})

    /**
     * payload must only include where object as root
     * @param {any} payload
     * @returns 
     */
    distinct = async (payload) => await retry(async () => {
        return await this.repository.distinct(payload)
    }, {retries})
}


module.exports = {
    App
}