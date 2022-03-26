import client from './Services/api'

export type InputData = {
    action: string,
    duration: number,
    prev: number,
    next: number
}

export type InputDataS = {
    action: string,
    duration: string,
    prev: string,
    next: string
}

export type Form = {
    actions: InputDataS[]
}

const data = {
    calculate: (input: InputData[]) => client.post('/', input)
}

export default data;