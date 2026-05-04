export const dummyMiddleware = (req, res, next) => {
    req.user =  {
      userId : "hello123"

    };
    next();
};