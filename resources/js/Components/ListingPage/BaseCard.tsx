import ActionButton from "../action-button"

type BaseCardProps<T> = {
  item: T

  title: React.ReactNode
  subtitle?: React.ReactNode

  status?: {
    label: string
    active?: boolean
  }

  onClick?: (item: T) => void
  onEdit?: (item: T) => void
  onDelete?: (item: T) => void

  children?: React.ReactNode
}

export default function BaseCard<T>({
  item,
  title,
  subtitle,
  status,
  onClick,
  onEdit,
  onDelete,
  children,
}: BaseCardProps<T>) {
  return (
    <div
      className='cursor-pointer rounded-lg border border-gray-200 bg-white p-4 hover:shadow-md'
      onClick={() => onClick?.(item)}
    >
      <div className='flex justify-between'>
        <div>
          <h3 className='font-semibold'>{title}</h3>

          {subtitle && (
            <div className='text-sm text-gray-500'>
              {subtitle}
            </div>
          )}
        </div>

        <div className='flex items-center gap-2'>
          {status && (
            <div
              className={`rounded-full px-3 py-1 text-xs ${
                status.active
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {status.label}
            </div>
          )}

          <ActionButton
            onEdit={() => onEdit?.(item)}
            onDelete={() => onDelete?.(item)}
          />
        </div>
      </div>

      <div className='mt-4'>
        {children}
      </div>
    </div>
  )
}