
function Tree({dataModel, onNodeClick}) {
    const px = 'px';
    const styles = {
        paddingLeft: (20 * dataModel.lvl).toString() + px
    };
    if (!dataModel.nodes) {
        return dataModel.visible && (
            <div style={styles} onClick={() => onNodeClick(dataModel)}>
                <span>{dataModel.key}</span>
            </div>);
    }
    return dataModel.visible && (
        <div style={styles} onClick={() => onNodeClick(dataModel)}>
            <span>{dataModel.key}</span>
            {dataModel.nodes.map((node) => {
                return (<Tree dataModel={node} onNodeClick={onNodeClick}/>);
            })}
        </div>);
}

export default Tree;