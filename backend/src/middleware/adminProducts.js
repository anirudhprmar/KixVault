
export default function adminPaginatedResults(model) {
   return async(req,res,next) =>{
     const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit 
    const endIndex =  page * limit

    const results = {}

    if (endIndex < await model.countDocuments().exec()) {
        results.next = {
            page:page+1,
            limit:limit
        }
    }
    if (startIndex > 0) {
        results.previous = {
            page:page-1,
            limit:limit
        }
    }

    const userAdmin = req.user._id
    // console.log(userAdmin);
    

    try {
        results.results = await model.find({userId:userAdmin}).limit(limit).skip(startIndex).exec()
        res.paginatedResults = results
        // console.log(res.paginatedResults);
        
        next()
    } catch (error) {
        console.log('error in admin products middleware',error.message);
        
        res.status(500).json({
            msg:'internal server error'
        }) 
    }
   }
}