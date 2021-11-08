import {FormEvent} from "react";

export const parseNumberListInput = (input: string): number[] => {
    const split: string[] = input.split(",")//split on comma
    const numberlist: number[] = split.filter(x => Number(x)).map(x=>Number(x))
    if (numberlist.length > 0) {
        return numberlist
    }else {
        return []
    }
}

function parseStringListInput(input: string): string[] {
    const split: string[] = input.split(",")
    const stringList: string[] = split.map(x=>x.replace(/ /g,'').trim()).filter(x=>x.length>0)
    if (stringList.length>0) {
        return stringList
    }else {
        return []
    }
}

export const editStringList = (htmlelement: React.FormEvent<HTMLLIElement>, defaultValue: string[]): string[] => {
    const rawValue: string = htmlelement.currentTarget.textContent ? htmlelement.currentTarget.textContent : ""
    console.log(rawValue)
    const textvalue: string[] = parseStringListInput(rawValue)
    console.log(textvalue)
    if (!textvalue) {
        return defaultValue
    }else {
        return textvalue
    }
}
export const displayStringList = (input: string[]): string => {
    if (input.length > 0) {
        const display: string = input.join(",")
        return display
    }else {
        return ""
    }
}

export const editNumberList = (htmlelement: FormEvent<HTMLElement>, defaultValue: number[]): number[] => {
    const rawValue: string = htmlelement.currentTarget.textContent ? htmlelement.currentTarget.textContent : ""
    //console.log(rawValue)
    const textvalue = parseNumberListInput(rawValue)
    //console.log(textvalue)
    if (!textvalue) {
        //console.log("not a string: " + htmlelement.currentTarget.textContent)
        return defaultValue
    }else {
        //const finalresult: string = textvalue ? textvalue : defaultValue
        return textvalue
    }
}
export const displayNumberList = (input: number[]): string => {
    if (input.length > 0) {
        const display: string = input.map(x => x.toString()).join(",")
        return display
    }else {
        return ""
    }
}

export const editNumberValue = (htmlelement: FormEvent<HTMLElement>, defaultValue: number): number => {
    const textvalue: string | null = htmlelement.currentTarget.textContent
    if (!(textvalue == null) && !Number.isInteger(parseInt(textvalue))) {
        //console.log("not a number: " + htmlelement.currentTarget.textContent)
        return defaultValue
    }else {
        const finalresult: number = Number(textvalue)
        return finalresult
    }
}

export const editStringvalue = (htmlelement: FormEvent<HTMLElement>, defaultValue: string): string => {
    const textvalue = htmlelement.currentTarget.textContent
    if (!textvalue) {
        //console.log("not a string: " + htmlelement.currentTarget.textContent)
        return defaultValue
    }else {
        const finalresult: string = textvalue ? textvalue : defaultValue
        return finalresult
    }
}


//TODO: create a editDate function that verifies that the text entered has the right format
