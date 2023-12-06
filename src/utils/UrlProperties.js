// Property file path
const propertiesFilePath = 'resources/application.properties';

// Read and parse the property file content
const fileContent = readPropertiesFile(propertiesFilePath);
const properties = parseProperties(fileContent);

// Function to read properties file
function readPropertiesFile(filePath) {
    const file = open(filePath);
    const content = read(file);
    file.close();
    return content;
}

// Function to parse properties file
function parseProperties(content) {
    const properties = {};
    const lines = content.split('\n');
    for (const line of lines) {
        const [key, value] = line.split('=');
        if (key && value) {
            properties[key.trim()] = value.trim();
        }
    }
    return properties;
}

// Function to get URLs
export function getUrl() {
    return properties;
}

// Function to get specific URL by property key
export function getUrlByKey(property) {
    const env = __ENV.env || 'default';  // Use 'default' if 'env' environment variable is not defined.
    
    // Build the property key 
    const key = `${env}.url.${property}`;
    
    // Getting the property value
    return properties[key];
}



// Command line to run the simulation using enviroment variable
//k6 run --env env=hlg meu_teste.js  // where hlg comes from application.properties file