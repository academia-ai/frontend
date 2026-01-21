import React from 'react'
import { SheetClose } from "../../ui/sheet";

const Hello = ({ onClose }) => {
  return (
    <div>
      <h2>Hello</h2> 
            <SheetClose onClick={onClose} />
    </div>
  )
}

export default Hello
