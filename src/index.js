const path = require('path')
const AdmZip = require('adm-zip')

const user = {
    "name": "Иванов"
}

async function createArchive() {
    const zipFolder = path.resolve(__dirname, 'resources');
    const archive = path.resolve(zipFolder, 'test2.zip');
    const contentFile = path.resolve(zipFolder, 'content.xml')
    const zip = new AdmZip(archive)
    zip.addLocalFile(contentFile);
    zip.writeZip(archive);
}

async function createXML(user){
    console.log(user.name);
}

async function main() {
    await createXML(user);
}


main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error)
    process.exit(1)
})