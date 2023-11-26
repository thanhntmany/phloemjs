import phloemjs from "./app/store/www/phloe.mjs"


const { StringAr } = phloemjs,
    _headBase = `<script type="importmap">{"imports": {"www/": "/"}}</script><script type="module" src="/phloe.mjs"></script>`,
    _head_ = "{{_head_}}",
    HeadTagRe = /<[hH][eE][aA][dD]+(\s+[^\uFDD0-\uFDEF\s\"\'\>\/\=\uFFFE\uFFFF]+(\s*\=\s*([^\s\"\'\=\<\>\`]+|\'[^\']*\'|\"[^\"]*\"))?)*\s*(\/)?>/g

export { StringAr }
export class HTMLAr extends phloemjs.StringAr {
    constructor() {
        var o = arguments[0]
        if ((typeof o === 'string' || o instanceof String) && !o.includes(_head_)) {
            const re = (new RegExp(HeadTagRe))
            re.exec(o)
            const li = re.lastIndex
            arguments[0] = o.substring(0, li) + _head_ + o.substring(li)
        }
        super(...arguments)
    }
    toString() {
        this.$._head_ = [_headBase, this.HTMLgetRequireList()]
        return super.toString()
    }
}
