class MapperHelper {
  static AssignAttr(src, dst) {
    for (const [key, value] of Object.entries(src)) {
      dst[key] = value;
    }
    return dst;
  }
}

module.exports = MapperHelper;
