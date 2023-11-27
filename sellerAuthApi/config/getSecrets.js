const { SecretsManagerClient, GetSecretValueCommand } = require("@aws-sdk/client-secrets-manager");

const secretName = "shopnation-key"
const client = new SecretsManagerClient({ region: "us-east-1" }); 
async function getSecrets() {
        try {
            console.log("1");
            const response = await client.send(
                new GetSecretValueCommand({
                    SecretId: secretName,
                    VersionStage: "AWSCURRENT",
                })
            );
            console.log(response.SecretString);
            if (response && response.SecretString) {
                console.log("yes");
                return JSON.parse(response.SecretString);
            } 
            else {
                console.log('No secrets found.');
                return {};
            }
        } catch (error) {
        console.log(error);
        }
}
module.exports = getSecrets;