import aj from "../config/arcjet.js";

const arcjetMiddleware = async (req, res, next) => {
  try {
    const descision = await aj.protect(req, { requested: 1 });
    if (descision.decision) {
      if (descision.reason.isRateLimit())
        return res
          .status(429)
          .json({ success: false, message: "Rate Limit Exceeded" });
      if (descision.reason.isBot())
        return res
          .status(401)
          .json({ success: false, message: "Bot Detected" });

      return res.status(401).json({ success: false, message: "Access Denied" });
    }

    next();
  } catch (error) {
    console.log(`Arcjet Middleware Error: ${error.message}`);
    next(error);
  }
};

export default arcjetMiddleware;
