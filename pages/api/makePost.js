import Cors from "cors";

// Initializing the cors middleware
const cors = Cors({
  methods: ["GET", "HEAD", "POST"],
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
  // Run the middleware
  await runMiddleware(req, res, cors);

  const accessToken = req.body.accessToken;
  const user = req.body.user;

  try {
    const response = await fetch("https://api.linkedin.com/v2/ugcPosts", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + req.body.accessToken,
        "X-Restli-Protocol-Version": "2.0.0",
      },
      body: {
        author: `urn:li:person:${req.body.user}`,
        lifecycleState: "PUBLISHED",
        specificContent: {
          "com.linkedin.ugc.ShareContent": {
            shareCommentary: {
              text: "Hello World! This is my first Share on LinkedIn!",
            },
            shareMediaCategory: "NONE",
          },
        },
        visibility: {
          "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC",
        },
      },
    });

    if (response.status >= 400) {
      return res.json(response);
    }

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }

  res.json(response);
}

export default handler;

// const handler = async (req, res) => {
//   const { user, accessToken } = req.body;
//   try {
//     const response = await fetch("https://api.linkedin.com/v2/ugcPosts", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//         "X-Restli-Protocol-Version": "2.0.0",
//       },
//       body: {
//         author: `urn:li:person:${user}`,
//         lifecycleState: "PUBLISHED",
//         specificContent: {
//           "com.linkedin.ugc.ShareContent": {
//             shareCommentary: {
//               text: "Hello World! This is my first Share on LinkedIn!",
//             },
//             shareMediaCategory: "NONE",
//           },
//         },
//         visibility: {
//           "com.linkedin.ugc.MemberNetworkVisibility": "CONNECTIONS",
//         },
//       },
//     });

//     if (response.status >= 400) {
//       return res.status(400).json({
//         error: "There was an error",
//         response: response,
//       });
//     }

//     return res.status(200).json({ status: "ok" }, response);
//   } catch (error) {
//     return res.status(500).json({
//       error,
//     });
//   }
// };

// export default handler;
