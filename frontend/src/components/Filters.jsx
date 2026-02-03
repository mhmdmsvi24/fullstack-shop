import { Star } from "lucide-react";
import { useFetch } from "../hooks/useFetch"
import Dropdown from "./Dropdown";
import FilterTag from "./FilterTag";

export default function Filters() {
  const { data: categoriesData, error, isLoading } =
    useFetch('http://localhost:8080/api/v1/categories');

  const ratingsData = {
    1: <Star size={14} fill="yellow" stroke="black" strokeWidth={1}/>,
    2: Array(2).fill(<Star size={14} fill="yellow" stroke="black" strokeWidth={1}/>),
    3: Array(3).fill(<Star size={14} fill="yellow" stroke="black" strokeWidth={1}/>),
    4: Array(4).fill(<Star size={14} fill="yellow" stroke="black" strokeWidth={1}/>),
    5: Array(5).fill(<Star size={14} fill="yellow" stroke="black" strokeWidth={1}/>)
  }

  const discountData = {}

  if (error) {
    return (
      <div>Something went wrong</div>
    )
  }

  if (isLoading) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <div className="flex gap-4 items-center justify-around">
      {
        Object.entries(categoriesData).map(([key, value]) =>
          <FilterTag name={key} key={key} amount={value} />)
      }
      <Dropdown filterName={"Categories"} filterOptions={categoriesData} />
      <Dropdown filterName={"Rating"} filterOptions={ratingsData} />
    </div>
  )
}
