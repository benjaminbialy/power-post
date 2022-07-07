import fetch from "node-fetch";

async function handler(req, res) {
  // https://docs.microsoft.com/en-us/linkedin/marketing/integrations/community-management/shares/share-api?view=li-lms-unversioned&tabs=http#schema-1
  // https://docs.microsoft.com/en-us/linkedin/marketing/integrations/community-management/shares/share-api?view=li-lms-unversioned&tabs=http#making-the-most-of-linkedin-shares
  // https://docs.microsoft.com/en-us/linkedin/marketing/integrations/community-management/shares/share-api?view=li-lms-unversioned&tabs=http#schema-2
  const { accessToken, userID, content } = JSON.parse(req.body);

  const resData = await fetch("https://api.linkedin.com/v2/shares", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      distribution: {
        linkedInDistributionTarget: {},
      },
      owner: `urn:li:person:${userID}`,
      // https://docs.microsoft.com/en-us/linkedin/marketing/integrations/community-management/shares/share-api?view=li-lms-unversioned&tabs=http#schema-1
      text: {
        // max length is 3000 characters
        text: content,
      },
    }),
  });

  const data = await resData.json();
  console.log(data);

  res.send(data);
}

export default handler;
