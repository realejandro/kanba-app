import React, { useState } from 'react'
import { CalendarCreateEvenetForm } from './CalendarCreateEventForm'


export const CalendarModal = () => {

  const [isClosed, setIsClosed] = useState(false)

  return (
    <div>
        <label htmlFor="my_modal_7" className="btn">Create Client</label>
        {/* Put this part before </body> tag */}
        <input type="checkbox" id="my_modal_7" className={(!isClosed)? "modal-toggle" :"" } />
        <div className="modal" role="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => (!isClosed) ? setIsClosed(true) : setIsClosed(false)}>✕</button>
            <CalendarCreateEvenetForm />
        <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
        </div>
    </div>
  )
}
