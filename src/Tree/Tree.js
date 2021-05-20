
function Tree({dataModel, onNodeClick}) {
    const px = 'px';
    const styles = {
        paddingLeft: (10 * dataModel.lvl).toString() + px
    };
    return dataModel.visible && (
        <div style={styles} onClick={(e) => onNodeClick(dataModel, e)}>
            <input type="checkbox" />
            <span>{dataModel.key}</span>
            {dataModel.nodes && dataModel.nodes.map((node) => {
                return (<Tree key={node.key} dataModel={node} onNodeClick={onNodeClick}/>);
            })}
        </div>);
}

export default Tree;