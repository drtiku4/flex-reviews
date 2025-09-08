import * as reviewsService from "../services/reviews.service.ts";
export async function approveReview(req, res, next) {
    try {
        const { id } = req.params;
        const { approved } = req.body;
        if (typeof approved !== "boolean")
            return res.status(400).json({ status: "error", message: "approved must be boolean" });
        const updated = await reviewsService.setApproved(String(id), approved);
        if (!updated)
            return res.status(404).json({ status: "error", message: "Review not found" });
        res.json({ status: "ok", review: updated });
    }
    catch (err) {
        next(err);
    }
}
export async function updateReview(req, res, next) {
    try {
        const { id } = req.params;
        const payload = req.body ?? {};
        if (payload.hasOwnProperty("approved")) {
            const approved = Boolean(payload.approved);
            const updated = await reviewsService.setApproved(String(id), approved);
            if (!updated)
                return res.status(404).json({ status: "error", message: "Review not found" });
            return res.json({ status: "ok", review: updated });
        }
        return res.status(400).json({ status: "error", message: "No supported fields in body" });
    }
    catch (err) {
        next(err);
    }
}
export async function getListingsMetrics(req, res, next) {
    try {
        const metrics = await reviewsService.getListingsMetrics();
        res.json({ status: "ok", metrics });
    }
    catch (err) {
        next(err);
    }
}
