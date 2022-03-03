import React, { FC } from "react"
import { List } from "@mui/material"

import StatusListItem from "./StatusListItem"
interface StatusListProps {
  statusList: Array<any>
  onUpdate?: any
  onDelete?: any
}
const StatusList: FC<StatusListProps> = (props) => {
  return (
    <List>
      {props.statusList.map((status) => (
        <StatusListItem
          status={status}
          onUpdate={props.onUpdate}
          onDelete={props.onDelete}
        />
      ))}
    </List>
  )
}

export default StatusList
