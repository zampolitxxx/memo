import path from 'path';
import { fileURLToPath } from 'url';
import admZip from 'adm-zip';
import AdmZip from "adm-zip";

import {xmlChange} from './xmlChanger.js';
import {createODT, createArchive, extractContentXmlFromZip, addContentXmlToZip} from "./odtCreator.js";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const memoContent = {
    "employeeLogin": "PetrovPP",
    "position": "Руководитель очень важного блока",     //должность руководителя блока
    "surname": "Иванов И.И.",    //Фамилия И.О. руководителя блока
    "name": "Петр Петрович",   //Имя Отчество работника, нарушевшего трудовую дисциплину
    "numberOfListsAttachment": 2,
}
// ###### Секция объявления констант ########
const memo1FileName = "memoWarning"
const memo2dtFileName = "memoDiscussion"
const memo3OdtFileName = "memoMeeting"


async function main() {
    const numberOfViolations = 2;   //Количество нарушений за период
    const violator = memoContent.employeeLogin;
    switch (numberOfViolations) {
        case 2:
            const memoDir = path.resolve(__dirname, '../resources', 'memo1');
            createArchive(memoDir, memo1FileName, violator);
            extractContentXmlFromZip(memoDir, violator);
            await xmlChange(memoDir, memoContent)
            addContentXmlToZip(memoDir, violator)
            // createODT(memoDir, memo1ZipFileName)

            break;
        case 3:
            console.log("три нарушения");
            break;
        case 4:
        case 5:
            console.log("четыре и более нарушения");
            break;
    }

}


main()
// .then(() => process.exit(0))
// .catch((error) => {
//     console.error(error)
//     process.exit(1)
// })