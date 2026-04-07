export const dummyMiddleware = (req, res, next) => {
    // Adding this data for Room Controller ... Later has to be deleted.
    req.customData =  {
      fullName : "Aditya",
      playerId : "11111",

    };
    next();
}