export { }
declare global {
    interface LooseObject {
        [key: string]: any
    }

    namespace Express {
        interface Request {
            User?: LooseObject
        }
    }
    interface process {
        env: LooseObject
    }
}
