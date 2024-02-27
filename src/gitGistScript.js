import { Octokit } from "octokit";
import fs from "fs";
import path from "path";
import previousGistIds from "./gistIds.json" with { type: "json" };

const directoryPath = path.join(new URL('../lib/components/', import.meta.url).href.replace("file:", ""));
const gistIdsJsonPath = path.join(new URL('gistIds.json', import.meta.url).href.replace("file:", ""));

// console.log(gistIdsJsonPath);
const gitToken = "YOUR_TOKEN";

const octokit = new Octokit({
    auth: gitToken
})



const allFiles = {};

const readFile = (filePath) => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return data;
    } catch (err) {
        console.error('Error reading file:', err);
    }
}

const writeFile = (filePath, data) => {
    try {
        fs.writeFileSync(filePath, data, 'utf8');
        console.log('Data has been written to the file.');
    } catch (err) {
        console.error('Error writing to file:', err);
    }
}

function readDirectoryRecursively(directoryPath, basePath = 'lib') {
    const files = fs.readdirSync(directoryPath);
    files.forEach(file => {
        const filePath = path.join(directoryPath, file);
        let relativePath = path.relative(basePath, filePath).replace(/\\/g, '/');

        if (fs.statSync(filePath).isDirectory()) {
            // If it's a directory, recursively call readDirectoryRecursively
            readDirectoryRecursively(filePath, basePath);
        } else {
            const extension = path.extname(filePath);
            const fileName = path.basename(filePath);
            if (extension === '.css' || extension === '.tsx') {
                // readFile(filePath);
                relativePath = relativePath.replaceAll("..", "");
                const parts = relativePath.split(path.sep);
                const formattedPath = parts.reduce((acc, cur) => {
                    if (cur !== '') {
                        return acc + (acc === '' ? '' : '$') + cur;
                    }
                    return acc;
                }, '');
                // console.log(formattedPath);
                allFiles[formattedPath] = {
                    gistId: 0,
                    filePath: filePath,
                    fileName: fileName
                };
            }
        }
    });
}

readDirectoryRecursively(directoryPath);

const newGistIds = {};

const createGist = async (fileName, content, fileId) => {
    console.log("creating:", fileName);
    const files = {
        [fileName]: {
            content: content
        }
    };
    const response = await octokit.request('POST /gists', {
        description: 'React component',
        'public': true,
        files: files,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    });
    console.log("created:", fileName);
    console.log(response);
    const result = {
        response: response,
        fileId: fileId
    };
    return result
}

const updateFist = async (fileName, content, gistId, fileId) => {
    console.log("updating:", fileName, gistId);
    const files = {
        [fileName]: {
            content: content
        }
    };
    const response = await octokit.request('PATCH /gists/{gist_id}', {
        gist_id: gistId,
        description: 'React component',
        files: files,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    });
    console.log("updated:", fileName, gistId);
    console.log(response);
    const result = {
        response: response,
        fileId: fileId
    };
    return result
}

const promises = [];

Object.keys(allFiles).forEach(fileId => {
    const oldGistId = previousGistIds[fileId];
    console.log(fileId);
    if (oldGistId) {
        promises.push(updateFist(allFiles[fileId]["fileName"], readFile(allFiles[fileId]["filePath"]), oldGistId, fileId));
    } else {
        promises.push(createGist(allFiles[fileId]["fileName"], readFile(allFiles[fileId]["filePath"]), fileId));
    }
});

Promise.all(promises)
    .then((results) => {
        results.forEach(responseWithId => {
            const response = responseWithId["response"];
            const fileId = responseWithId["fileId"];
            if (response && response.data && response.data["id"]) {
                console.log(response.data["id"]);
                newGistIds[fileId] = response.data["id"];
            }
        });
        console.log(newGistIds);
        writeFile(gistIdsJsonPath, JSON.stringify(newGistIds));
    })
    .catch(error => {
        console.error('Error:', error);
    });



