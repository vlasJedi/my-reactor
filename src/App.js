import logo from './logo.svg';
import './App.css';
import { useState } from "react";
import Tree from 'Tree/Tree';

// Looks like the React.createElement()
function App(props) {
  let dataModel = props.data;
  let updateDataModel = null;
  const nodesKey = props.nodesKey;
  [dataModel, updateDataModel] = useState(buildViewModel(dataModel, 0, nodesKey));
  return (<Tree dataModel={dataModel} onNodeClick={onNodeClick} />);

  function buildViewModel(data, lvl, nodesKey) {
    if (!data) return;
    const dataModel = Object.assign({ visible: lvl === 0, lvl: lvl, key: data.key, nodes: data[nodesKey] }, data);
    if (!dataModel.nodes) return dataModel;
    dataModel.nodes = dataModel[nodesKey].map((node) => buildViewModel(node, lvl + 1, nodesKey));
    return dataModel;
  }

  function onNodeClick(node) {
    if (node.nodes) node.nodes.forEach((node) => node.visible = !node.visible); 
    // !!!! React ignores changes if ref to object does not change
    updateDataModel(Object.assign({}, dataModel));
  }

}



export default App;
