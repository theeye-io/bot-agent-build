const path = require('path')
const dotenv = (process.env.DOTENV_PATH || path.resolve(__dirname, '../.env'))
require('dotenv').config({ path: dotenv })
const debug = require('debug')('core:helpers');

const log = (lifecycle, level, message = null) => {
    return { lifecycle, level, message, datetime: new Date() }
}

const getLastErrorLog = (logs) => {
    const errorLogs = logs.filter((log) => log.lifecycle === 'error')
    return errorLogs.length > 0 ? errorLogs[errorLogs.length -1] : {}
}

const sleep = ms => {
    debug(`Waiting for ${ms} milliseconds...`);
    return new Promise(resolve => setTimeout(resolve, ms));
}

const retry = async (func, { retries, fullError = false }) => {
    let retryCount = 1

    while (retryCount <= retries) {
        try {
            return await func()
        } catch (err) {
            debug(`execution ${retryCount} failed`)

            if(fullError) debug(err)
            else debug(err.message)
        
            retryCount++

            if (retryCount > retries) throw new Error('retry count reached')
            debug(`retrying ${retryCount}/${retries}`)
        }
    }
}

module.exports = {
    log, getLastErrorLog, sleep, retry
}