export function getOffsetUsingPageNo(pageNo, itemsCountPerPage = 10) {
  return itemsCountPerPage * (pageNo - 1)
}