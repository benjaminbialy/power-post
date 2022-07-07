import fetch from "node-fetch";
require("dotenv").config();

async function handler(req, res) {
  // https://docs.microsoft.com/es-mx/linkedin/marketing/integrations/community-management/shares/posts-api?view=li-lms-2022-06&viewFallbackFrom=li-lms-unversioned&tabs=http

  const resData = await fetch("https://api.linkedin.com/v2/shares", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.LINKEDIN_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      distribution: {
        linkedInDistributionTarget: {},
      },
      owner: "urn:li:person:K6QBlzgAMK",
      subject: "Test Share Subject",
      text: {
        // max length is 3000 characters
        text: "Testing sharing!",
      },
    }),
  });

  const data = await resData.json();
  console.log(data);

  res.send(data);
}

export default handler;