/**
 * Creates tree based on dataModel and transcludes content by built in React feature as 'children' 
 * @returns 
 */
function Tree({dataModel, onNodeClick, onNodeCheckBoxClick}) {
    const px = 'px';
    const styles = {
        paddingLeft: (10 * dataModel.lvl).toString() + px
    };
    return dataModel.visible && (
        <div style={styles} onClick={(e) => onNodeClick(dataModel, e)}>
            <input type="checkbox" onClick={(e) => onNodeCheckBoxClick(dataModel, e)} checked={dataModel.selected}/>
            <span>{dataModel.key}</span>
            {dataModel.nodes && dataModel.nodes.map((node) => {
                return (<Tree key={node.key} dataModel={node} onNodeClick={onNodeClick} onNodeCheckBoxClick={onNodeCheckBoxClick}/>);
            })}
        </div>);
}

export default Tree;