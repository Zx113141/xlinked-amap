import IndexDBCache from "./database";

export { }

declare global {
    interface Window {
        Loca: any
        AMap: any,
        map: any,
        mouseTool: any,
        editors: any[],
        db: IndexDBCache
    }
}