export default function DropdownOption({ optionName, optionValue }) {
  return (
    <div
      href="#"
      className="px-6 py-2 text-sm text-gray-700 hover:bg-gray-100 flex justify-between items-center gap-3"
      role="menuitem"
    >
      <div className="font-bold">{optionName}</div>
      <div className="flex gap-1">{optionValue}</div>
    </div>
  )
}
