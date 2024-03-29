
export default (req, res) => {
  const cookies = Object.keys(req.cookies);
  res.setHeader(
    "Set-Cookie",
    "cookieName=deleted; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT"
  );
  cookies?.forEach((cookie) => {
    res.setHeader(
      "Set-Cookie",
      `${cookie}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`
    );
  });
  res.json({});
};