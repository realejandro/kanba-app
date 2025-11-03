import React from 'react'

export const CalendarEventsList = () => {

  const eventList: any = ["ale", "humber", "patry"];  

  const eventsListComp = () => {
    return (
        eventList.map( ( eventElement:any ) => (
            <li key={eventElement} className="list-row">
                <div className="list-col-grow">
                    <div>title{eventElement}</div>
                    <div className="text-xs uppercase font-semibold opacity-60">Note</div>
                </div>
                <div>
                    <div>start:</div>
                    <div>end</div>
                </div>
            </li>
        ))
    )
  }

  return (
    <div className=''>
        <ul className="list bg-base-100 rounded-box shadow-md">
            <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Most played songs this week</li>
            { eventsListComp() }   
        </ul>
    </div>
  )
}
