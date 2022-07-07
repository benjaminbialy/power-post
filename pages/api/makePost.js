import fetch from "node-fetch";
require("dotenv").config();

async function handler(req, res) {
  //https://docs.microsoft.com/es-mx/linkedin/marketing/integrations/community-management/shares/share-api?view=li-lms-unversioned&tabs=http#post-shares
  const resData = await fetch("https://api.linkedin.com/v2/shares", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.LINKEDIN_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: {
        contentEntities: [
          {
            entityLocation: "https://www.example.com/content.html",
            thumbnails: [
              {
                resolvedUrl: "https://www.example.com/image.jpg",
              },
            ],
          },
        ],
        title: "Testing the LinkedIn Shares API",
      },
      distribution: {
        linkedInDistributionTarget: {},
      },
      owner: "urn:li:person:K6QBlzgAMK",
      subject: "Test Share Subject",
      text: {
        text: "Testing sharing!",
      },
    }),
  });

  const data = await resData.json();
  console.log(data);

  res.send(data);
}

export default handler;
