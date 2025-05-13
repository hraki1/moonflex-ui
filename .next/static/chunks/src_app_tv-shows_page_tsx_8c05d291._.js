(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/app/tv-shows/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>TVShowsPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
const TMDB_API_KEY = "fbd1edacbe4e94f662341a99cd3be594";
const API_LANGUAGE = "ar";
const API_URL = `https://api.themoviedb.org/3/tv/popular?api_key=${TMDB_API_KEY}&language=${API_LANGUAGE}&page=1`;
const splitArray = (array, chunkSize)=>{
    const result = [];
    for(let i = 0; i < array.length; i += chunkSize){
        result.push(array.slice(i, i + chunkSize));
    }
    return result;
};
function TVShowsPage() {
    _s();
    const [shows, setShows] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    console.log(shows);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TVShowsPage.useEffect": ()=>{
            const fetchTVShows = {
                "TVShowsPage.useEffect.fetchTVShows": async ()=>{
                    setIsLoading(true);
                    setError(null);
                    try {
                        const response = await fetch(API_URL);
                        if (!response.ok) throw new Error("حدث خطأ أثناء جلب المسلسلات.");
                        const data = await response.json();
                        setShows(data.results || []);
                    } catch (err) {
                        console.error(err);
                        setError("فشل تحميل المسلسلات. حاول لاحقًا.");
                    } finally{
                        setIsLoading(false);
                    }
                }
            }["TVShowsPage.useEffect.fetchTVShows"];
            fetchTVShows();
        }
    }["TVShowsPage.useEffect"], []);
    // Memoize categorized movie lists
    const movieLists = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TVShowsPage.useMemo[movieLists]": ()=>{
            if (!shows.length) return [];
            return splitArray(shows, 5).slice(0, 4); // Get first 4 chunks of 5 movies each
        }
    }["TVShowsPage.useMemo[movieLists]"], [
        shows
    ]);
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "h-screen flex justify-center items-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-white text-2xl",
                children: "جاري التحميل..."
            }, void 0, false, {
                fileName: "[project]/src/app/tv-shows/page.tsx",
                lineNumber: 54,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/tv-shows/page.tsx",
            lineNumber: 53,
            columnNumber: 7
        }, this);
    }
    if (error) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "h-screen flex justify-center items-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-red-500 text-xl",
                children: error
            }, void 0, false, {
                fileName: "[project]/src/app/tv-shows/page.tsx",
                lineNumber: 62,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/app/tv-shows/page.tsx",
            lineNumber: 61,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-6 mt-36 text-white space-y-4",
        children: movieLists.map((films, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: index > 0 ? "mt-24" : "",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FilmList, {
                    films: films
                }, void 0, false, {
                    fileName: "[project]/src/app/tv-shows/page.tsx",
                    lineNumber: 71,
                    columnNumber: 11
                }, this)
            }, index, false, {
                fileName: "[project]/src/app/tv-shows/page.tsx",
                lineNumber: 70,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/app/tv-shows/page.tsx",
        lineNumber: 68,
        columnNumber: 5
    }, this);
}
_s(TVShowsPage, "Gq0PQOnlDPM4TwiD3BegxapnjCI=");
_c = TVShowsPage;
var _c;
__turbopack_context__.k.register(_c, "TVShowsPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_app_tv-shows_page_tsx_8c05d291._.js.map