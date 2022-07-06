import Cors from "cors";
import fetch from "node-fetch";
require("dotenv").config();

// Initializing the cors middleware
const cors = Cors({
  methods: ["POST"],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

async function handler(req, res) {
  // // Run the middleware
  await runMiddleware(req, res, cors);
  try {
    //https://docs.microsoft.com/es-mx/linkedin/marketing/integrations/community-management/shares/share-api?view=li-lms-unversioned&tabs=http#post-shares
    const resData = await fetch("https://api.linkedin.com/v2/shares", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.LINKEDIN_ACCESS_TOKEN}`,
        "cache-control": "no-cache",
        "X-Restli-Protocol-Version": "2.0.0",
        "Content-Type": "application/json",
      },
      body: {
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
          title: "Test Share with Content",
        },
        distribution: {
          linkedInDistributionTarget: {},
        },
        owner: "urn:li:person:K6QBlzgAMK",
        subject: "Test Share Subject",
        text: {
          text: "Test Share!",
        },
      },
    });
    if (!resData.ok) {
    }

    res.status(resData.status);
    res.json(resData);
  } catch (error) {
    res.json(error);
  }
}
// .then((response) => response.text())
// .then((result) => res.send(result));

//   const data = await resData.json();

//   res.status(200).json({ data: data });

//   if (resData.status >= 400) {
//     return res.json(data);
//   }
// }

export default handler;
