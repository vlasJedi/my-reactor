import logo from './logo.svg';
import './App.css';

// Looks like the React.createElement()
function App(props) {
  let dataModel = props.data;
  if (!dataModel) return;
  const lvl = dataModel.lvl || 0;
  if (lvl === 0) {
    dataModel = buildViewModel(dataModel, 0, props.nodesKey);
  }
  const px = 'px';
  const styles = {
    paddingLeft: (20 * lvl).toString() + px
  };
  if (!dataModel.nodes) {
    return (
      <div style={styles}>
        <span>{dataModel.key}</span>
      </div>);
  }
  return (
    <div style={styles}>
      <span>{dataModel.key}</span>
      {dataModel.nodes.map((node) => {
        return (<App data={node}/>);
      })}
    </div>);
}

function buildViewModel(data, lvl, nodesKey) {
  if (!data) return;
  const dataModel = Object.assign({visible: true, lvl: lvl, key: data.key, nodes: data[nodesKey]}, data);
  if (!dataModel.nodes) return dataModel;
  dataModel.nodes = dataModel.nodes.map((node) => buildViewModel(node, lvl + 1, nodesKey));
  return dataModel;
}



export default App;
