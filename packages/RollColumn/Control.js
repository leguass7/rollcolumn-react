class RollControl {
  constructor() {
    this.list = [];
    return this;
  }

  setControlColumns(rollcolumn, newlist) {
    const n = this.list.filter((l) => {
      return l.name !== rollcolumn.name;
    });
    n.push({ ...rollcolumn, columns: newlist });
    this.list = n;
    return this;
  }

  /**
   * @method getControlColumns
   * @param {String} name
   * @returns {Array} columns
   */
  getControlColumns(name) {
    const n = this.list.filter((l) => {
      return l.name === name;
    });
    return n.length > 0 ? n[0] : false;
  }

  emitEventColumn(name, order) {
    const n = this.getControlColumns(name);
    if (!n) return false;

    let result = false;
    n.columns.map((col) => {
      if (col.order === order) {
        if (col && col.onCheck) col.onCheck(col.ref);
        result = col;
      }
      return col;
    });
    if (result && n.handleColumnChange) n.handleColumnChange(result.ref);
    return result;
  }
}

export default new RollControl();
