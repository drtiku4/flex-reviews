import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";
import { Review } from "../models/review.model.ts";
import { parseDateToISO, computeOverallRating, normalizeCategories } from "../utils/normalize.util.ts";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const MOCK_PATH = path.resolve(__dirname, "../mocks/hostaway_reviews.json");
async function readMockHostaway() {
    const raw = await fs.readFile(MOCK_PATH, "utf8");
    const parsed = JSON.parse(raw);
    return parsed;
}
export function normalizeHostawayItem(item) {
    const ratingOverall = computeOverallRating(item.reviewCategory, item.rating ?? null);
    const submittedISO = parseDateToISO(item.submittedAt ?? item.createdAt ?? null);
    return {
        reviewId: String(item.id ?? `${item.listingName}-${Math.random()}`),
        source: "hostaway",
        listingName: item.listingName ?? null,
        listingId: item.listingId ?? null,
        type: item.type ?? null,
        status: item.status ?? null,
        ratingOverall,
        categories: normalizeCategories(item.reviewCategory),
        channel: item.channel ?? "hostaway",
        submittedAt: submittedISO ? new Date(submittedISO) : null,
        guestName: item.guestName ?? null,
        publicReview: item.publicReview ?? item.publicReviewText ?? null,
        approved: false,
        raw: item
    };
}
export async function syncHostawayReviews() {
    const hostaway = await readMockHostaway();
    const arr = hostaway?.result ?? [];
    const normalized = arr.map(normalizeHostawayItem);
    const ops = normalized.map((r) => Review.findOneAndUpdate({ reviewId: r.reviewId }, r, { upsert: true, new: true, setDefaultsOnInsert: true }).exec());
    const docs = await Promise.all(ops);
    return docs;
}
export async function getReviews(filters) {
    const query = {};
    if (filters?.listing)
        query.listingName = { $regex: filters.listing, $options: "i" };
    if (typeof filters?.approved === "boolean")
        query.approved = filters.approved;
    if (filters?.date_from || filters?.date_to) {
        query.submittedAt = {};
        if (filters.date_from)
            query.submittedAt.$gte = new Date(filters.date_from);
        if (filters.date_to)
            query.submittedAt.$lte = new Date(filters.date_to);
    }
    if (typeof filters?.rating_min === "number")
        query.ratingOverall = { $gte: filters.rating_min };
    const docs = await Review.find(query).sort({ submittedAt: -1 }).lean().exec();
    return docs;
}
