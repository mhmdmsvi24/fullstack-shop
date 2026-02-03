export default function FilterTag({ name, amount }) {
  return (
    <div className="text-black font-bold rounded-lg px-2 py-1 flex gap-2 my-2">
      <div>{name}</div>
      <div>{amount}</div>
    </div>
  )
}
