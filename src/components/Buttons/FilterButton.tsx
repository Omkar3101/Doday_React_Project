import type React from 'react'

interface FilterProps{
  img?: string,
  filterName?: string,
  onClick?: ()=> void,
  isActive: boolean,
}

const FilterButton: React.FC<FilterProps> = (props) => {
  const filterClass = props.isActive ? "filter-button active-filter" : "filter-button";
  return (
    <>
    <div className={filterClass} onClick={props.onClick}> 
      <img src={props.img} alt="checked-button" />
      <p>{props.filterName}</p>
    </div>
    </>
  )
}

export default FilterButton
