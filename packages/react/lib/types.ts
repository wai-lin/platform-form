export type Method = 'get' | 'post' | 'put' | 'delete' | 'patch' | 'graphql'

export type EncType =
  | 'multipart/form-data'
  | 'application/json'
  | 'application/x-www-form-urlencoded'

export interface Config {
  baseUrl?: string
  method?: Method
  encType?: EncType
}

export type TransitionState = 'idle' | 'submitting' | 'error' | 'catch-error'

export interface Transition {
  state: TransitionState
  formData: FormData
}

export type ResponseParam<DataType> = Response & { data: DataType }

export type LifeCycleFuncs<DataType, ErrorType> = {
  /**
   * Called right before making fetch request, after generating request init.
   * RequestInit object is passed as argument so that it can be modified before
   * making the request. All the options except `signal` is mutable for the RequestInit.
   */
  beforeRequest?: (init: Omit<RequestInit, 'signal'>) => void
  /**
   * Called after fetch request whether it's `failed` or `success`.
   * Cannot access to any object.
   */
  afterRequest?: () => void
  /**
   * Called when `response.ok` is `true`.
   * Response object is passed as argument.
   */
  onSuccess?: (res: ResponseParam<DataType>) => void
  /**
   * Called when `response.ok` is `false`.
   * Response object is passed as argument.
   */
  onError?: (res: ResponseParam<ErrorType>) => void
  /**
   * Called on catch handler.
   * Error object is passed as argument.
   */
  onCatchError?: (e: any) => void
  /**
   * Called after fetch request is aborted.
   * Cannot access to any object.
   */
  afterAbort?: () => void
}

export type ChildrenProps<DataType, ErrorType> = {
  data: DataType | null
  error: ErrorType | null
  status: number
  transition: Transition
  abort: () => void
}

export type FormProps<DataType, ErrorType> = {
  action: string
  method: Method
  encType?: EncType
  query?: string
  body?: any
  hook?: LifeCycleFuncs<DataType, ErrorType>
  includeSubmitValue?: boolean
  children: (props: ChildrenProps<DataType, ErrorType>) => React.ReactNode
}

export type UseFormReturnType<DataType, ErrorType> = ChildrenProps<
  DataType,
  ErrorType
> & {
  ref: React.MutableRefObject<HTMLFormElement | null>
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}