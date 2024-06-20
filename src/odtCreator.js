import path from "path"
import AdmZip from "adm-zip"
import fs from 'fs'

const CONTENT_FILE_NAME = 'content.xml';
const ODT_EXTENSION = '.odt';
const ZIP_EXTENSION = '.zip';

export function createODT(memoDir, memo1ZipFileName) {

}

// Create .zip file from .odt file. We name it according to the username of the violator
export function createArchive(memoDir, fileName, employeeLogin) {
    const odtFile = memoDir + "/" + fileName + ODT_EXTENSION;
    const zipFile = memoDir + "/" + employeeLogin + ZIP_EXTENSION;

    fs.copyFile(odtFile, zipFile, err => {
        if (err) throw err; // не удалось скопировать файл
        console.log('Файл успешно скопирован');
    })
}

export function extractContentXmlFromZip(memoDir, violator) {
    const archive = memoDir + "/" + violator + ZIP_EXTENSION;     //Меняем расширение .odt на .zip
    const zip = new AdmZip(archive);
    zip.extractEntryTo(CONTENT_FILE_NAME, memoDir,  false, true);
}

export function addContentXmlToZip(memoDir, violator) {
    const archive = memoDir + "/" + violator + ZIP_EXTENSION;
    const fileName = memoDir + "/" + CONTENT_FILE_NAME;
    const zip = new AdmZip(archive);
    zip.addLocalFile(fileName);
    zip.writeZip(archive);
}