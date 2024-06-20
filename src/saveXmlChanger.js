import xml2js from 'xml2js'
import fs from 'fs'

let file = '/home/zampolit/WebstormProjects/unzip/resources/memo1/content.xml'

export async function xmlChange(pathToXmlFile, data) {


    fs.readFile(file, function (err, data) {
        if (err) throw new Error(err);
        const parser = new xml2js.Parser();

        parser.parseStringPromise(data)
            .then(function (res) {
                console.log(res)
                // res["office:document-content"]["office:body"][0]["office:text"][0]["text:p"][0]["text:user-field-get"][0]["_"] = "Начальник департамента"
                // res["office:document-content"]["office:body"][0]["office:text"][0]["text:user-field-decls"][0]["text:user-field-decl"][2]["$"]["office:string-value"] = "Начальник департамента"
                // res["office:document-content"]["office:body"][0]["office:text"][0]["text:p"][13]["_"] = "Приложение: на 1 л. в 1 экз."
                return res

            })
            .then(function (res) {
                const builder = new xml2js.Builder();
                const xml = builder.buildObject(res);
                fs.writeFile(file, xml, (res) => {
                    if(err) throw err;
                    console.log('Data has been replaced!');
                })
            })
            .catch(function (err) {
                console.error(err);
            })
    });
}

xmlChange(file, {})




