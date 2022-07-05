const handler = async (req, res) => {
  const { user, accessToken } = req.body;
  try {
    const response = await fetch("https://api.linkedin.com/v2/ugcPosts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Restli-Protocol-Version": "2.0.0",
      },
      body: {
        author: `urn:li:person:${user}`,
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
          "com.linkedin.ugc.MemberNetworkVisibility": "CONNECTIONS",
        },
      },
    });

    if (response.status >= 400) {
      return res.status(400).json({
        error: "There was an error",
        response: response,
      });
    }

    return res.status(200).json({ status: "ok" }, response);
  } catch (error) {
    return res.status(500).json({
      error: "There was an error",
    });
  }
};

export default handler;
