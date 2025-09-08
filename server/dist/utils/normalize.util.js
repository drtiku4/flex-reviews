export function parseDateToISO(s) {
    if (!s)
        return null;
    const parsed = new Date(s);
    if (!isNaN(parsed.getTime()))
        return parsed.toISOString();
    const tried = new Date(s.replace(" ", "T"));
    if (!isNaN(tried.getTime()))
        return tried.toISOString();
    return null;
}
export function computeOverallRating(reviewCategory, rating) {
    if (Array.isArray(reviewCategory) && reviewCategory.length > 0) {
        const vals = reviewCategory.map((r) => (typeof r.rating === "number" ? r.rating : null)).filter((v) => v !== null);
        if (vals.length === 0)
            return rating ?? null;
        const sum = vals.reduce((a, b) => a + b, 0);
        return Math.round((sum / vals.length) * 100) / 100;
    }
    if (typeof rating === "number")
        return rating;
    return null;
}
export function normalizeCategories(reviewCategory) {
    if (!Array.isArray(reviewCategory))
        return [];
    return reviewCategory.map((rc) => ({
        category: rc.category ?? "unknown",
        rating: typeof rc.rating === "number" ? rc.rating : null
    }));
}
