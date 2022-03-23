import client from './Services/api'

export type InputData = {
    action: string,
    duration: number,
    prev: number,
    next: number
}

const data = {
    calculate: (input: InputData[]) => client.post('/', input)
}

export default data;