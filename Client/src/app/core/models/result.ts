
export interface Result<TData> {
    isSuccess: boolean,
    data: TData | null,
    message: string | null,
    description: string | null,
    errors: string[] | null
}