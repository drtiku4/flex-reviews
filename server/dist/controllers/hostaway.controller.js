import * as hostawayService from "../services/hostaway.service.ts";
export async function getHostawayReviews(req, res, next) {
    try {
        await hostawayService.syncHostawayReviews();
        const filters = {
            listing: req.query.listing,
            approved: req.query.approved ? req.query.approved === "true" : undefined,
            date_from: req.query.date_from,
            date_to: req.query.date_to,
            rating_min: req.query.rating_min ? Number(req.query.rating_min) : undefined
        };
        const docs = await hostawayService.getReviews(filters);
        res.json({ status: "ok", count: docs.length, reviews: docs });
    }
    catch (err) {
        next(err);
    }
}
