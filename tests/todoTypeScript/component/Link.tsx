import * as React from "react";
import todoStore from '../store/TodoStore';
import {wrapComponent} from '../../../src/eflow';

const Link = ({filter, active, children, onClick}:
                {
                  filter?: string,
                  active?: boolean,
                  children?: string,
                  onClick?: {(): void}
                }
             ) => {
  if (active) {
    return <span>{children}</span>
  }

  return (
    // eslint-disable-next-line
    <a href="#"
       onClick={e => {
         e.preventDefault()
         onClick()
       }}
    >
      {children}
    </a>
  )
}

//export default Link;

export default wrapComponent(Link, [todoStore.filter], function (state: {filter: string}, oldProps: {filter: string}) {
  return {
    //此时返回值值在组件Link的props中对应名称即为active和onClick
    active: state.filter === oldProps.filter,
    onClick: function () {
      todoStore.filter(oldProps.filter);
    }
  }
});
