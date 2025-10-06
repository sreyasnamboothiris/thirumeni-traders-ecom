export interface LaravelFlash {
  error: string | null
  message: string | null
}

export interface Paginator<T> {
  current_page: number
  from: number
  to: number
  path: string
  prev_page_url: string | null
  next_page_url: string | null
  data: T[]
  links: { active: boolean; label: string; url: string | null }[]
  total: number
  last_page: number
}

export interface FormFieldProp {
  label?: string
  type?: 'text' | 'email' | 'password' | 'number'
  value?: string | number
  error?: string
  styles?: string
  placeholder?: string
  setValue: (value: string) => unknown
  disabled?: boolean
  readonly?: boolean
  isDate?: boolean
  isTime?: boolean
  preventFormSubmit?: boolean
  style?: string
  required?: boolean
}

export interface CheckboxProp {
  label?: string
  value?: boolean
  error?: string
  styles?: string
  toggleValue: () => unknown
  disabled?: boolean
}

export interface CreateResponse<T> {
  data: {
    created: boolean
    message: string
    record?: T
  }
}

export interface UpdateResponse<T> {
  data: {
    updated: boolean
    message: string
    record?: T
  }
}

export interface DeleteResponse<T> {
  data: {
    deleted: boolean
    message: string
    record?: T
  }
}

export type Errors<T> = Record<keyof T, string | undefined>

export const colors = [
  'rgba(164, 144, 201, 0.5)',
  'rgba(208, 146, 204, 0.5)',
  'rgba(243, 156, 181, 0.5)',
  'rgba(245, 178, 152, 0.5)',
  'rgba(234, 212, 148, 0.5)',
  'rgba(216, 244, 170, 0.5)',
  'rgba(182, 247, 175, 0.5)',
  'rgba(165, 233, 202, 0.5)',
  'rgba(151, 204, 229, 0.5)',
  'rgba(182, 217, 233, 0.5)',
  'rgba(224, 182, 221, 0.5)',
  'rgba(247, 189, 206, 0.5)',
  'rgba(249, 204, 187, 0.5)',
  'rgba(239, 228, 197, 0.5)',
  'rgba(205, 233, 246, 0.5)',
]

export const solidColors = [
  '#9DCA3D',
  '#64C19F',
  '#228A62',
  '#344D7A',
  '#5085E6',
  '#F4D761',
  '#6B735C',
  '#CCBFBA',
  '#E27396',
]

// export const solidColors = [
//   '#A5BE00',
//   '#64B5F6',
//   '#427AA1',
//   '#FEC601',
//   '#613DC1',
//   '#FF6392',
//   '#20BF55',
//   '#FFE45E',
// ]

// export const solidColors = [
//     '#A490C9',
//     '#D092CC',
//     '#F39CB5',
//     '#F5B298',
//     '#EAD494',
//     '#D8F4AA',
//     '#B6F7AF',
//     '#A5E9CA',
//     '#97CCE5',
//     '#B6D9E9',
//     '#E0B6DD',
//     '#F7BDCE',
//     '#F9CCBB',
//     '#EFE4C5',
//     '#CDE9F6',
//   ]
export type Language = 'en' | 'mal'
