import xml2js from 'xml2js'
import fs from 'fs'

const parser = new xml2js.Parser();
let starting;
var xml = "<starting>Hello xml2js!</starting>"
let file = '/home/zampolit/WebstormProjects/unzip/resources/memo1/content.xml'


async function xmlChange(pathToXmlFile, data) {
    try {
        let a = fs.readFile
    } catch (err) {
        console.log("Произошла ошибка", err)
    }



    fs.readFile(file, function (err, data) {
        if (err) throw new Error(err);
        const parser = new xml2js.Parser();

        parser.parseStringPromise(data)
            .then(function (res) {
                res["office:document-content"]["office:body"][0]["office:text"][0]["text:p"][0]["text:user-field-get"][0]["_"] = "New"

            })
            .then(function (re) {
                const builder = new xml2js.Builder();
                const xml = builder.buildObject(re);
                return xml;
            })
            .catch(function (err) {
                console.error(err);
            })
    });
}



let res = xmlChange("/home/zampolit/WebstormProjects/unzip/resources/memo1/content.xml", {})
console.log(res)



