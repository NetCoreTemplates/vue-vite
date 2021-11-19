import { omit } from "@servicestack/client"

export const remainingAttrs = (attrs:any, props:any) => 
    omit(attrs, [...Object.keys(props)])
