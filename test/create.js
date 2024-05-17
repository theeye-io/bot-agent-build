const {App} = require('../libs/lb4')

const main = async () => {
    const job = new App('job')
    const batch = new App('batch')

    await job.create({})
    await batch.create({})

    await job.find({where:{}})
    await batch.find({where:{}})
}

main().then(console.log).catch(console.error)