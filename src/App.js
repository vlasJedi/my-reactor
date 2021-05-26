import './App.css';
import { useState } from "react";
import Tree from 'Tree/Tree';

function App({data, nodesKey}) {
  // initial data to build viewmodel
  let dataModel = data;
  // setter for view model to update state, does not merge model, but replaces entire data object
  let updateDataModel = null;
  [dataModel, updateDataModel] = useState(buildViewModel(dataModel, 0, nodesKey));
  // render tree by recursion
  return (<Tree dataModel={dataModel} onNodeClick={onNodeClick} onNodeCheckBoxClick={onNodeCheckBoxClick}/>);

  /**
   * Creates view model via tree structure by nodes
   * @param {Object} data - initial data, will be not modified 
   * @param {Number} lvl - set to 0, internal 
   * @param {String} nodesKey - key name to process children nodes 
   * @param {Object|undefined} parent - ref to parent node, maybe need replace with calculated path in tree 
   * @returns {Object}
   */
  function buildViewModel(data, lvl, nodesKey, parent) {
    /** TODO need to create internal func for recursion to hide internal parameter */
    if (!data) return;
    /** TODO need to bind to external key which provides value to display instead of hardcode */
    const dataModel = Object.assign({ parent: parent, selected: false, visible: lvl === 0, lvl: lvl, key: data.key, nodes: data[nodesKey]}, data);
    if (!dataModel.nodes) return dataModel;
    dataModel.nodes = dataModel.nodes.map((node) => buildViewModel(node, lvl + 1, nodesKey, dataModel));
    return dataModel;
  }

  /**
   * Updates nodes visibility depending on current state in view model
   * @param {Object} node - source node caught click 
   * @param {Object} e - dom click event 
   */
  function onNodeClick(node, e) {
    e.preventDefault();
    e.stopPropagation();
    if (node.nodes) {
      if (node.nodes[0].visible) {
        updatePropInSubtree(node, "visible", false, -1);
      } else {
        updatePropInSubtree(node, "visible", true, 0);
      }
    }
    // !!!! React ignores changes if ref to object does not change
    updateDataModel(Object.assign({}, dataModel));
  }

  function onNodeCheckBoxClick(node, e) {
    e.stopPropagation();
    node.selected = !node.selected;
    updatePropInSubtree(node, "selected", node.selected, -1);
    if (node.parent) updateParents(node.parent, "selected", (node) => node.nodes.every((node) => node.selected));
    updateDataModel(Object.assign({}, dataModel));
  }

  /**
   * Traverses nodes in subtree "node" and updates value under name with checking depth in the subtree
   * @param {Object} node - subtree to traverse
   * @param {String} propName - key
   * @param {*} propValue - new value
   * @param {Number} depthSize - how deep should be traversing, if -1 then traversing to leaf
   * @param {Number} curDepth - internal, start from 0
   */
  function updatePropInSubtree(node, propName, propValue, depthSize, curDepth) {
    /** TODO need to create internal func for recursion to hide internal parameter */
    curDepth = curDepth || 0;
    if (node.nodes) node.nodes.forEach((node) => {
      node[propName] = propValue;
      if ((depthSize > curDepth || depthSize === -1) && node.nodes) updatePropInSubtree(node, propName, propValue, depthSize, curDepth + 1);
    }); 
  }

  function updateParents(parentToStart, propName, propValueCall) {
    parentToStart[propName] = propValueCall(parentToStart);
    if (parentToStart.parent) updateParents(parentToStart.parent, propName, propValueCall);
  }
}

export default App;
