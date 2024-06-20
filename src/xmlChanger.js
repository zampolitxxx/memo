import xml2js from 'xml2js'
import fs from 'fs'

// Find, replace required lines in the content.xml and rewrite it
export async function xmlChange(memoDir, memoContent) {

    const pathToXmlFile = memoDir + "/content.xml";

    await fs.readFile(pathToXmlFile, function (err, data) {
        if (err) {
            return console.log(err);
        }
        const parser = new xml2js.Parser();
        parser.parseStringPromise(data)
            .then(function (result) {
                result["office:document-content"]["office:body"][0]["office:text"][0]["text:p"][0]["_"] = memoContent.position;
                result["office:document-content"]["office:body"][0]["office:text"][0]["text:p"][1]["_"] = ""
                result["office:document-content"]["office:body"][0]["office:text"][0]["text:p"][3]["_"] = memoContent.surname;
                result["office:document-content"]["office:body"][0]["office:text"][0]["text:p"][10]["_"] = "Уважаемый (ая) " + memoContent.name;
                result["office:document-content"]["office:body"][0]["office:text"][0]["text:p"][14]["_"] = "Приложение: на  " + memoContent.numberOfListsAttachment + " л. в 1 экз.";

                const builder = new xml2js.Builder();
                const xml = builder.buildObject(result);

                fs.writeFile(pathToXmlFile, xml, (res) => {
                    if(err) throw err;
                    console.log('Data has been replaced!');
                })
            })
            .catch(function (err) {
                console.error(err);
            })
    })
}



