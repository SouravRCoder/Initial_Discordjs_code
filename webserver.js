const { request } = require("undici");
const express = require("express");

require("dotenv").config();

const app = express();
const port = 3000 || process.env.PORT;

function webserver(){
  app.get("/", async ({ query }, response) => {
    const { code } = query;

    if (code) {
      try {
        const tokenResponseData = await request(
          "https://discord.com/api/oauth2/token",
          {
            method: "POST",
            body: new URLSearchParams({
              client_id: process.env.clientId,
              client_secret: process.env.clientSecret,
              code,
              grant_type: "authorization_code",
              redirect_uri: `http://localhost:${port}`,
              scope: "identify",
            }).toString(),
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        const oauthData = await tokenResponseData.body.json();
        //   console.log(oauthData);
        const userResult = await request("https://discord.com/api/users/@me", {
          headers: {
            authorization: `${oauthData.token_type} ${oauthData.access_token}`,
          },
        });

        console.log(await userResult.body.json());
      } catch (error) {
        // NOTE: An unauthorized token will not throw an error
        // tokenResponseData.statusCode will be 401
        console.error(error);
      }
    }

    // console.log(`The access code is: ${request.query.code}`);
    return response.sendFile("index.html", { root: "." });
  });

  app.listen(process.env.PORT, () =>
    console.log(`App listening at http://localhost:${port}`)
  );
};

module.exports = {webserver};
