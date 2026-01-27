type CheckboxProps = {
  isChecked: (value: boolean) => void
  value: boolean
}

export function Checkbox({ isChecked, value }: CheckboxProps) {
  return (
    <div className="flex items-center">
      <input
        checked={value}
        id="checked-checkbox"
        type="checkbox"
        className="w-5 h-5 border rounded cursor-pointer accent-indigo-600 focus:ring-brand-soft "
        onChange={(e) => isChecked(e.target.checked)}
      />
    </div>
  )
}
