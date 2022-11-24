import { useState } from 'react';
import './App.css';
import x from "./x.png"
 
function App1() {
  const [lst, setLst] = useState([]);
  const [cnt, setCnt] = useState(0);
  const [state, setState] = useState("All");
 
  let filterFunction = e => true;
  switch(state){
    case "All":
        filterFunction = e => true;
        break;
    case "Active":
        filterFunction = e => !e.checked;
        break;
    case "Completed":
        filterFunction = e => e.checked;
        break;
  }
 
  function addInput(event){
    if(event.key === "Enter"){
      setLst(lst.concat([{
        value: event.target.value,
        id: cnt,
        checked: false,
        delete: false,
      }]));
      setCnt(cnt + 1);
      event.target.value = '';
    }
  }
 
  function toggle(id, checked){
    setLst(lst.map(e => e.id === id ? { value: e.value, id: e.id, checked: checked, delete: e.delete } : e))
  }
 
  function clear(){
    setLst(lst.filter(e => !e.checked));
  }
 
  return (
    <div id = "root" className = "todo-app__root">
        <header className = "todo-app__header">
            <p className = "todo-app__title">todos</p>
        </header>
        <section className = "todo-app__main">
            <input className = "todo-app__input" placeholder = "What needs to be done?" onKeyDown = {(event) => {addInput(event);}} />
            <ul id = "todo-list" className = "todo-app__list" style = {lst.length === 0? {display: "none"}: {display: "inherit"}}>
                {lst.filter(filterFunction).map((e) => 
                    <li className = "todo-app__item" key = {e.id}>
                        <div className = "todo-app__checkbox"><input id = {e.id} type = {'checkbox'} onChange = {() => toggle(e.id, !e.checked)} checked = {e.checked} /><label htmlFor = {e.id}></label></div>
                        <h1 className = "todo-app__item-detail" style = {e.checked? {textDecoration: "line-through", opacity: "50%"}: {textDecoration: "none", opacity: "100%"}}>{e.value}</h1>
                        <img src = {x} className = "todo-app__item-x" alt = "delete" onClick = {() => {e.delete = true; setLst(lst.filter(e => !e.delete))}} />
                    </li>
                )}
            </ul>
        </section>
        <footer id = "todo-footer" className = "todo-app__footer" style = {lst.length === 0? {display: "none"}: {display: "inherit"}}>
            <div className = "todo-app__total">{lst.filter(e => !e.checked).length} left</div>
            <ul className = "todo-app__view-buttons">
                <button onClick={() => setState("All")}>All</button>
                <button onClick={() => setState("Active")}>Active</button>
                <button onClick={() => setState("Completed")}>Completed</button>
            </ul>
            <div className = "todo-app__clean">
                <button onClick={clear} style = {lst.filter(e => e.checked).length === 0? {visibility: "hidden"}: {visibility: "inherit"}}>Clear completed</button>
            </div>
        </footer>
    </div>
  );
}
 
export default App1;