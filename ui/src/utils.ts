import { omit } from "@servicestack/client"

export const remainingAttrs = (attrs:any, props:any) => 
    omit(attrs, [...Object.keys(props)])

export const withoutSuffix = (s:string, suffix:string) =>
    s.endsWith(suffix) ? s.substring(0, suffix.length) : s
