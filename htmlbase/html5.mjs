import phloemjs from "../phloe.mjs"


export default new phloemjs.HTMLAr(
    `<!DOCTYPE html><html lang="{{lang}}"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>{{title}}</title>{{_head_}}{{head}}</head><body {{bodyAttributes}}>{{body}}</body></html>`,
    { lang: "en", title: "", head: [], bodyAttributes: "", body: [] }
)